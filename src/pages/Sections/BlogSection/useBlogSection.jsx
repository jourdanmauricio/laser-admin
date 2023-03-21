import useEditor from '@/config/useEditor';
import { useEffect, useRef, useState } from 'react';
import { useModal } from '@/hooks/useModal';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllSettings,
  changeSettings,
  updateSettings,
} from '@/store/settings';
import { useNotification } from '@/commons/Notifications/NotificationProvider';
import {
  getAllPosts,
  onCreatePost,
  onUpdatePost,
  changePost,
  delMessage,
} from '@/store/posts';

const INITIAL_ERROR_POSTS = {
  title: null,
  slug: null,
  resume: null,
};

const useBlogSection = () => {
  const dispatch = useDispatch();
  const dispatchNotif = useNotification();
  const [isOpenModal, openModal, closeModal] = useModal(false);
  const [isOpenModalWave, openModalWave, closeModalWave] = useModal(false);
  const [isOpenModalBtnBlog, openModalBtnBlog, closeModalBtnBlog] =
    useModal(false);
  const [errorField, setErrorField] = useState(INITIAL_ERROR_POSTS);
  const [editData, setEditData] = useState();
  const quillRef = useRef();
  const quillRef2 = useRef();

  // Data
  const post = useSelector((state) =>
    state.posts.posts.find((post) => post.id === editData?.id)
  );
  const { actionPosts, status, message } = useSelector((state) => state.posts);
  const settings = useSelector((state) => state.settings.settings);

  // Secciones
  const sectionBlog = useSelector((state) =>
    state.settings.settings.filter((setting) => setting.type === 'sectionBlog')
  );
  const blogSection = sectionBlog.reduce(
    (obj, cur) => ({ ...obj, [cur.feature]: cur }),
    {}
  );
  const sectionClinics = useSelector((state) =>
    state.settings.settings.filter(
      (setting) => setting.type === 'sectionClinic'
    )
  );
  const clinicsSection = sectionClinics.reduce(
    (obj, cur) => ({ ...obj, [cur.feature]: cur }),
    {}
  );

  // Botones
  const blogBtn = useSelector((state) =>
    state.settings.settings.filter((setting) => setting.type === 'blogBtn')
  );
  const button = blogBtn.reduce(
    (obj, cur) => ({ ...obj, [cur.feature]: cur }),
    {}
  );

  // Images Module
  const imageHandler = async () => {
    openModal();
  };
  const { modules } = useEditor({ imageHandler });

  // Set properties
  if (Object.keys(button).length > 0) {
    document.documentElement.style.setProperty(
      '--btnTextColorBlog',
      `${button.textColor.value}`
    );
    document.documentElement.style.setProperty(
      '--btnTextColorHoverBlog',
      `${button.textColorHover.value}`
    );
    document.documentElement.style.setProperty(
      '--btnBgColorBlog',
      `${button.bgColor.value}`
    );
    document.documentElement.style.setProperty(
      '--btnBgColorHoverBlog',
      `${button.bgColorHover.value}`
    );
    document.documentElement.style.setProperty(
      '--btnTlRadiusBlog',
      `${button.tlRadius.value}`
    );
    document.documentElement.style.setProperty(
      '--btnTrRadiusBlog',
      `${button.trRadius.value}`
    );
    document.documentElement.style.setProperty(
      '--btnBlRadiusBlog',
      `${button.blRadius.value}`
    );
    document.documentElement.style.setProperty(
      '--btnBrRadiusBlog',
      `${button.brRadius.value}`
    );
    document.documentElement.style.setProperty(
      '--btnBorderColorBlog',
      `${button.borderColor.value}`
    );
    document.documentElement.style.setProperty(
      '--btnBorderColorHoverBlog',
      `${button.borderColorHover.value}`
    );
    document.documentElement.style.setProperty(
      '--btnShadowBlog',
      `${button.shadow.value}`
    );
    document.documentElement.style.setProperty(
      '--btnHeightBlog',
      `${button.height.value}`
    );
    document.documentElement.style.setProperty(
      '--btnWidthBlog',
      `${button.width.value}`
    );
    document.documentElement.style.setProperty(
      '--btnBorderBlog',
      `${button.border.value}`
    );
  }

  // Methods
  useEffect(() => {
    if (message) {
      dispatchNotif({
        type: `${status === 'success' ? 'SUCCESS' : 'ERROR'}`,
        message: message,
      });
      dispatch(delMessage());
    }
  }, [message]);

  const handleSelect = (image) => {
    closeModal();
    const quillObj = quillRef2.current.getEditor();
    quillObj.focus();
    const position = quillObj.getSelection();
    quillObj.editor.insertEmbed(position.index, 'image', image, 'user');
    const changes = quillRef2.current.unprivilegedEditor.getHTML();
    onChangeSetting('text', changes);
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
      const updated = settings.findIndex((setting) => setting.updated === true);
      if (updated !== -1) dispatch(updateSettings());

      if (post?.updated === true) {
        if (actionPosts === 'NEW') dispatch(onCreatePost());

        if (actionPosts === 'EDIT') dispatch(onUpdatePost());
      }
    } catch (error) {
      dispatchNotif({
        type: 'ERROR',
        message: error,
      });
    }
  };
  const onCancel = () => {
    dispatch(getAllPosts());
    dispatch(getAllSettings());
  };
  const onChangeSetting = (feature, value) => {
    dispatch(
      changeSettings({ feature, value, type: blogSection.bgColor.type })
    );
  };
  const onChangePost = (name, value) => {
    dispatch(changePost({ name, value, id: editData.id }));
    setErrorField({ ...errorField, [name]: null });
  };
  const setDelError = () => {
    setErrorField(INITIAL_ERROR_POSTS);
  };

  return {
    blogSection,
    clinicsSection,
    actionPosts,
    button,
    quillRef,
    quillRef2,
    modules,
    isOpenModal,
    closeModal,
    editData,
    errorField,
    isOpenModalWave,
    openModalWave,
    closeModalWave,
    isOpenModalBtnBlog,
    closeModalBtnBlog,
    openModalBtnBlog,
    setEditData,
    setDelError,
    onSubmit,
    onCancel,
    onChangeSetting,
    handleSelect,
    onChangePost,
  };
};

export default useBlogSection;
