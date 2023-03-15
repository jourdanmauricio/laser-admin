import { useDispatch, useSelector } from 'react-redux';
import { delError } from '@/store/posts';
import { useRef } from 'react';
import useEditor from '@/config/useEditor';
import { useModal } from '@/hooks/useModal';

const usePosts = ({ editData, onChangePost }) => {
  const post = useSelector((state) =>
    state.posts.posts.find((post) => post.id === editData.id)
  );
  const { error } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const quillRef3 = useRef();
  const [isOpenModal, openModal, closeModal] = useModal(false);
  const blogBgColor = useSelector((state) =>
    state.settings.settings.find((setting) => setting.feature === 'blogBgColor')
  );

  const imageHandler = async () => {
    openModal();
  };

  const { modules } = useEditor({ imageHandler });

  const closeMessage = () => {
    dispatch(delError());
  };

  const onBlurTitle = (value) => {
    if (post.slug === '') {
      const slug = value
        .trim()
        .replace(/\s+/g, '-')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();
      onChangePost('slug', slug);
    }
  };

  const onContent = (value) => {
    onChangePost('content', value);
  };

  const handleSelect = (image) => {
    closeModal();
    const quillObj = quillRef3.current.getEditor();
    quillObj.focus();
    const position = quillObj.getSelection();
    quillObj.editor.insertEmbed(position.index, 'image', image, 'user');
    const changes = quillRef3.current.unprivilegedEditor.getHTML();
    onContent(changes);
  };

  return {
    post,
    error,
    isOpenModal,
    closeModal,
    quillRef3,
    modules,
    blogBgColor,
    closeMessage,
    onBlurTitle,
    handleSelect,
    onContent,
  };
};

export default usePosts;
