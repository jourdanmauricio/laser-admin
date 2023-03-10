import { useDispatch, useSelector } from 'react-redux';
import {
  onCancel,
  onCreatePost,
  onUpdatePost,
  setEditPost,
} from '@/store/posts';
import { useRef, useState } from 'react';
import { useModal } from '@/hooks/useModal';
import useEditor from '@/config/useEditor';

const usePost = () => {
  const [isOpenModal, openModal, closeModal] = useModal(false);
  const [error, setError] = useState({
    title: null,
    slug: null,
    main: false,
    resume: null,
    image: null,
    alt_image: null,
    content: null,
  });
  let { editPost, action } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const quillRef = useRef();

  const imageHandler = async () => {
    openModal();
  };

  const { modules } = useEditor({ imageHandler });

  const onContent = (value) => {
    dispatch(setEditPost({ name: 'content', value }));
  };

  const onBlurTitle = (value) => {
    if (action === 'NEW' && editPost.slug === '') {
      const slug = value
        .trim()
        .replace(/\s+/g, '-')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();
      dispatch(setEditPost({ name: 'slug', value: slug }));
    }
  };

  const onChange = (name, value) => {
    dispatch(setEditPost({ name, value }));
    setError({ ...error, [name]: null });
  };

  const onCancelPost = () => {
    dispatch(onCancel());
  };

  const handleSelect = (image) => {
    closeModal();
    const quillObj = quillRef.current.getEditor();
    quillObj.focus();
    const position = quillObj.getSelection();
    quillObj.editor.insertEmbed(position.index, 'image', image, 'user');
    const changes = quillRef.current.unprivilegedEditor.getHTML();

    onContent(changes);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let error = false;
    const fields = ['title', 'slug', 'resume', 'image', 'alt_image', 'content'];
    if (editPost.title.length > 250) {
      setError({ ...error, title: 'Cantidad máx 250 caracteres' });
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
    isOpenModal,
    openModal,
    closeModal,
    quillRef,
    modules,
    onContent,
    imageHandler,
    onChange,
    onSubmit,
    onCancelPost,
    handleSelect,
    onBlurTitle,
  };
};

export default usePost;
