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
          <div className="mt-8">
            <AddPicture
              container={service}
              handleChangeImage={onChangeService}
              error={errorFields}
            />
          </div>

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

          <div className="form__group w-full sm:w-1/3">
            <label className="form__label">Orden</label>
            <input
              onChange={(e) => onChangeService(e.target.name, e.target.value)}
              className="form__input border-gray-500 w-full"
              type="number"
              min="0"
              name="order"
              placeholder="Orden de aparición"
              value={service.order || '1'}
            />
          </div>

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
