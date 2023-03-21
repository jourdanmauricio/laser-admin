import { useDispatch, useSelector } from 'react-redux';
import { delError } from '@/store/services';
import { useRef } from 'react';
import useEditor from '@/config/useEditor';
import { useModal } from '@/hooks/useModal';

const useService = ({ editData, onChangeService }) => {
  const service = useSelector((state) =>
    state.services.services.find((service) => service.id === editData.id)
  );

  const { error } = useSelector((state) => state.services);
  const dispatch = useDispatch();
  const quillRef = useRef();
  const quillRef2 = useRef();
  const quillRef3 = useRef();
  const [isOpenModal, openModal, closeModal] = useModal(false);

  const sectionBlog = useSelector((state) =>
    state.settings.settings.filter((setting) => setting.type === 'sectionBlog')
  );
  const blogSection = sectionBlog.reduce(
    (obj, cur) => ({ ...obj, [cur.feature]: cur }),
    {}
  );

  const imageHandler = async () => {
    openModal();
  };

  const { modules } = useEditor({ imageHandler });

  const closeMessage = () => {
    dispatch(delError());
  };

  const onContent = (value) => {
    onChangeService('content', value);
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

  return {
    service,
    error,
    isOpenModal,
    closeModal,
    quillRef,
    quillRef2,
    quillRef3,
    modules,
    blogSection,
    closeMessage,
    handleSelect,
    onContent,
  };
};

export default useService;
