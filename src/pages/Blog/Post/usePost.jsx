import { useDispatch, useSelector } from 'react-redux';
import {
  onCancel,
  onCreatePost,
  onUpdatePost,
  setEditPost,
} from '@/store/posts';
import { useState } from 'react';
import { useNotification } from '@/commons/Notifications/NotificationProvider';

const usePost = () => {
  const dispatch = useDispatch();
  const dispatchNotif = useNotification();
  const [error, setError] = useState({
    name: null,
    resume: null,
    image: null,
    alt_image: null,
    content: null,
  });
  let { editPost, action } = useSelector((state) => state.posts);

  const onContent = (value) => {
    dispatch(setEditPost({ name: 'content', value }));
  };

  const handleChange = (name, value) => {
    dispatch(setEditPost({ name, value }));
    setError({ ...error, [name]: null });
  };

  const handleCancel = () => {
    dispatch(onCancel());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let error = false;
    const fields = ['title', 'resume', 'image', 'alt_image', 'content'];
    console.log('Submit', editPost, action);
    if (editPost.title.length > 50) {
      setError({ ...error, title: 'Cantidad máx 50 caracteres' });
      error = true;
    }

    if (editPost.resume.length > 250) {
      setError({ ...error, resume: 'Cantidad máx 250 caracteres' });
      error = true;
    }

    if (editPost.alt_image.length > 250) {
      setError({ ...error, alt_image: 'Cantidad máx 250 caracteres' });
      error = true;
    }

    for (let field of fields) {
      if (editPost[field].length === 0) {
        setError({ ...error, [field]: 'Requerido' });
        error = true;
      }
    }

    if (error === true) return;

    if (action === 'NEW') {
      dispatch(onCreatePost({ post: editPost }));
    } else {
      dispatch(onUpdatePost({ post: editPost }));
    }
  };

  return {
    action,
    onCreatePost,
    onUpdatePost,
    setEditPost,
    editPost,
    error,
    onContent,
    handleChange,
    handleSubmit,
    handleCancel,
  };
};

export default usePost;
