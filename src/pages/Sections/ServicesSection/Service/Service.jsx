import ReactQuill from 'react-quill';

import { quillSimpleModules } from '@/config/constants';
import AddPicture from '@/components/AddPicture/AddPicture';
import useService from './useService';
import { Modal } from '@/commons/Modal/Modal';
import Media from '@/components/Media/Media';

const Service = ({ editData, errorFields, onChangeService }) => {
  const {
    service,
    error,
    handleSelect,
    blogSection,
    isOpenModal,
    closeModal,
    quillRef,
    quillRef2,
  } = useService({ editData, onChangeService });

  return (
    <div>
      {service && (
        <>
          <div className="form__group w-full">
            <label className="form__label">Título</label>
            <ReactQuill
              ref={quillRef}
              style={{ backgroundColor: `${blogSection.bgColor.value}` }}
              theme="snow"
              value={service.title}
              onChange={(e) => onChangeService('title', e)}
              placeholder={'Write something awesome...'}
              modules={quillSimpleModules}
            />
          </div>

          <AddPicture
            container={service}
            handleChangeImage={onChangeService}
            error={errorFields}
          />

          <div className="form__group w-full">
            <label className="form__label">Contenido</label>
            <ReactQuill
              ref={quillRef2}
              style={{ backgroundColor: `${blogSection.bgColor.value}` }}
              theme="snow"
              value={service.content}
              onChange={(e) => onChangeService('content', e)}
              placeholder={'Write something awesome...'}
              modules={quillSimpleModules}
            />
          </div>
        </>
      )}
      <Modal isOpenModal={isOpenModal} closeModal={closeModal}>
        <Media handleSelect={handleSelect} />
      </Modal>
    </div>
  );
};

export default Service;
