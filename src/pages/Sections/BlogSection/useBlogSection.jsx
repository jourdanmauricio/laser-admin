import useEditor from '@/config/useEditor';
import { useEffect, useRef, useState } from 'react';
import { useModal } from '@/hooks/useModal';
import { useDispatch, useSelector } from 'react-redux';
import { changeSettings, updateSettings } from '@/store/settings';
import { useNotification } from '@/commons/Notifications/NotificationProvider';
import {
  getAllPosts,
  onCreatePost,
  onUpdatePost,
  changePost,
} from '@/store/posts';
import {
  getAllSections,
  changeSection,
  changeSubsection,
  updateSections,
  updateSubsections,
} from '@/store/sections';

const INITIAL_ERROR_POSTS = {
  title: null,
  slug: null,
  resume: null,
};

const useBlogSection = () => {
  const { actionPosts, message, status } = useSelector((state) => state.posts);
  const blogSection = useSelector((state) =>
    state.sections.sections.find((section) => section.name === 'blog')
  );
  const blogBgColor = useSelector((state) =>
    state.settings.settings.find((setting) => setting.feature === 'blogBgColor')
  );
  const waveBlogShow = useSelector((state) =>
    state.settings.settings.find(
      (setting) => setting.feature === 'waveBlogShow'
    )
  );
  const waveBlog = useSelector((state) =>
    state.settings.settings.find((setting) => setting.feature === 'waveBlog')
  );

  const [errorField, setErrorField] = useState(INITIAL_ERROR_POSTS);
  const [editData, setEditData] = useState();

  const post = useSelector((state) =>
    state.posts.posts.find((post) => post.id === editData?.id)
  );

  const dispatchNotif = useNotification();
  const dispatch = useDispatch();
  const [isOpenModal, openModal, closeModal] = useModal(false);
  const quillRef = useRef();
  const quillRef2 = useRef();
  const quillRef3 = useRef();

  const imageHandler = async () => {
    openModal();
  };
  const { modules } = useEditor({ imageHandler });

  useEffect(() => {
    if (message) {
      dispatchNotif({
        type: `${status === 'success' ? 'SUCCESS' : 'ERROR'}`,
        message: message,
      });
    }
  }, [message]);

  const onChangeSubsection = (name, value, sectionId, id) => {
    dispatch(changeSubsection({ name, value, sectionId, id }));
  };

  const onChangeSection = (name, value) => {
    dispatch(changeSection({ name, value, id: blogSection.id }));
  };

  const handleSelect = (image) => {
    closeModal();
    const quillObj = quillRef2.current.getEditor();
    quillObj.focus();
    const position = quillObj.getSelection();
    quillObj.editor.insertEmbed(position.index, 'image', image, 'user');
    const changes = quillRef2.current.unprivilegedEditor.getHTML();
    dispatch(
      changeSubsection({
        name: 'content',
        value: changes,
        sectionId: blogSection.id,
        id: quillRef2.current.props.id,
      })
    );
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (editData) {
      let formError = false;
      let fieldsErrors = Object.assign({}, errorField);

      const fields = [
        'title',
        'slug',
        'resume',
        'image',
        'alt_image',
        'content',
      ];

      for (let field of fields) {
        if (post[field] === '') {
          formError = true;
          fieldsErrors = {
            ...fieldsErrors,
            [field]: 'Requerido',
          };
        }
        if (errorField[field]) {
          formError = true;
        }
      }

      if (formError === true) {
        setErrorField(fieldsErrors);
        return;
      }
    }

    try {
      dispatch(updateSettings());

      if (actionPosts === 'NEW') {
        dispatch(onCreatePost());
      } else {
        dispatch(onUpdatePost());
      }

      dispatch(updateSections());
      dispatch(updateSubsections());
    } catch (error) {
      dispatchNotif({
        type: 'ERROR',
        message: error,
      });
    }
  };

  const onCancel = () => {
    dispatch(getAllPosts());
    dispatch(getAllSections());
  };

  const onChangeSetting = (feature, value) => {
    dispatch(changeSettings({ feature, value }));
  };

  const onChangePost = (name, value) => {
    dispatch(changePost({ name, value, id: editData.id }));
    setErrorField({ ...errorField, [name]: null });
  };

  const setDelError = () => {
    setErrorField(INITIAL_ERROR_POSTS);
  };

  return {
    actionPosts,
    blogSection,
    quillRef,
    quillRef2,
    quillRef3,
    blogBgColor,
    modules,
    isOpenModal,
    closeModal,
    editData,
    errorField,
    waveBlogShow,
    waveBlog,
    setEditData,
    setDelError,
    onSubmit,
    onCancel,
    onChangeSection,
    onChangeSubsection,
    onChangeSetting,
    handleSelect,
    onChangePost,
  };
};

export default useBlogSection;