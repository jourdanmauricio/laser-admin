import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSettings, updateSettings } from '@/store/settings';
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
  const [errorField, setErrorField] = useState(INITIAL_ERROR_POSTS);
  const [editData, setEditData] = useState();

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
  const dataBtn = useSelector((state) =>
    state.settings.settings.filter((setting) => setting.type === 'blogBtn')
  );
  const button = dataBtn.reduce(
    (obj, cur) => ({ ...obj, [cur.feature]: cur }),
    {}
  );

  //Set Properties
  if (Object.keys(blogSection).length > 0) {
    document.documentElement.style.setProperty(
      '--blogBgColor',
      blogSection.bgColor?.value
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
    editData,
    errorField,
    setEditData,
    setDelError,
    onSubmit,
    onCancel,
    onChangePost,
  };
};

export default useBlogSection;
