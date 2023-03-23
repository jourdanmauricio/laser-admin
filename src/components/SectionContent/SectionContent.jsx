import { useDispatch } from 'react-redux';
import { changeSettings } from '@/store/settings';
import { useRef } from 'react';
import ReactQuill from 'react-quill';
import useEditor from '@/config/useEditor';
import { quillSimpleModules } from '@/config/constants';
import { useModal } from '@/hooks/useModal';
import { Modal } from '@/commons/Modal/Modal';
import Media from '@/components/Media/Media';

const SectionContent = ({ section }) => {
  const dispatch = useDispatch();
  const [isOpenModal, openModal, closeModal] = useModal(false);
  const quillRef = useRef();
  const quillRef2 = useRef();

  // Images Module
  const imageHandler = async () => {
    openModal();
  };
  const { modules } = useEditor({ imageHandler });

  const handleSelect = (image) => {
    closeModal();
    const quillObj = quillRef2.current.getEditor();
    quillObj.focus();
    const position = quillObj.getSelection();
    quillObj.editor.insertEmbed(position.index, 'image', image, 'user');
    const changes = quillRef2.current.unprivilegedEditor.getHTML();
    onChangeSetting('text', changes);
  };

  const onChangeSetting = (feature, value) => {
    dispatch(changeSettings({ feature, value, type: section.bgColor.type }));
  };

  return (
    <>
      <div className="form__group w-full">
        <label className="form__label">Título</label>
        <ReactQuill
          ref={quillRef}
          style={{
            backgroundColor: `${section.bgColor.value}`,
          }}
          theme="snow"
          value={section.title.value}
          onChange={(e) => onChangeSetting('title', e)}
          placeholder={'Write something awesome...'}
          modules={quillSimpleModules}
        />
      </div>

      <div className="form__group w-full editor pb-0">
        <label className="form__label">Contenido</label>
        <ReactQuill
          ref={quillRef2}
          style={{ backgroundColor: `${section.bgColor.value}` }}
          theme="snow"
          value={section.text.value}
          onChange={(e) => onChangeSetting('text', e)}
          placeholder={'Write something awesome...'}
          modules={modules}
        />
      </div>

      <Modal isOpenModal={isOpenModal} closeModal={closeModal}>
        <Media handleSelect={handleSelect} />
      </Modal>
    </>
  );
};

export default SectionContent;
