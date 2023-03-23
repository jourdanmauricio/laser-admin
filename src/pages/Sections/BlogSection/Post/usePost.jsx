import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import { delError } from '@/store/posts';
import { useModal } from '@/hooks/useModal';
import useEditor from '@/config/useEditor';

const usePost = ({ editData, onChangePost }) => {
  const dispatch = useDispatch();
  const [isOpenModal, openModal, closeModal] = useModal(false);
  const quillRef = useRef();
  const quillRef2 = useRef();

  // Data
  const { error } = useSelector((state) => state.posts);
  const post = useSelector((state) =>
    state.posts.posts.find((post) => post.id === editData?.id)
  );
  const sectionBlog = useSelector((state) =>
    state.settings.settings.filter((setting) => setting.type === 'sectionBlog')
  );
  const blogSection = sectionBlog.reduce(
    (obj, cur) => ({ ...obj, [cur.feature]: cur }),
    {}
  );

  // Images Module
  const imageHandler = async () => {
    openModal();
  };
  const { modules } = useEditor({ imageHandler });

  // Methods
  const closeMessage = () => {
    dispatch(delError());
  };
  const onBlurTitle = () => {
    const quillObj = quillRef.current.getEditor();
    const text = quillObj.getText();

    if (post.slug === '') {
      const slug = text
        .trim()
        .replace(/\s+/g, '-')
        .replace(/,+/g, '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();
      onChangePost('slug', slug);
    }
  };
  const onContent = (name, value) => {
    onChangePost(name, value);
  };
  const handleSelect = (image) => {
    closeModal();
    const quillObj = quillRef2.current.getEditor();
    quillObj.focus();
    const position = quillObj.getSelection();
    quillObj.editor.insertEmbed(position.index, 'image', image, 'user');
    const changes = quillRef2.current.unprivilegedEditor.getHTML();
    onContent(changes);
  };

  return {
    post,
    error,
    isOpenModal,
    closeModal,
    quillRef,
    quillRef2,
    modules,
    blogSection,
    closeMessage,
    onBlurTitle,
    handleSelect,
    onContent,
  };
};

export default usePost;
