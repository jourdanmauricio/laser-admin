import { useModal } from '@/hooks/useModal';
import { Modal } from '@/commons/Modal/Modal';
import Media from '@/components/Media/Media';
import { FaCloudUploadAlt } from 'react-icons/fa';
import Tooltip from '@/commons/Tooltip/Tooltip';

const AddPicture = ({ container, handleChangeImage, error }) => {
  const [isOpenModal, openModal, closeModal] = useModal(false);

  const handleSelect = (image) => {
    handleChangeImage('image', image);
    closeModal();
  };

  return (
    <>
      <div className="flex flex-col md:flex-row w-full gap-8">
        <div className="my-5 grid__image">
          <div className="w-[150px] self-center justify-center mx-auto">
            <img
              className="rounded border border-solid border-gray-400 w-[150px]  object-contain aspect-square"
              src={container?.image}
              alt=""
            />
          </div>

          <Tooltip content="Seleccionar imagen" position="top">
            <button
              type="button"
              className="hover:bg-slate-200 p-2 rounded-full cursor-pointer"
              onClick={openModal}
            >
              <FaCloudUploadAlt className="text-teal-500 text-4xl" />
            </button>
          </Tooltip>
        </div>

        <div className="w-full">
          <div className="form__group">
            <label className="form__label">Alt Imágen</label>
            <input
              onChange={(e) =>
                handleChangeImage(e.target.name, e.target.value, container.id)
              }
              className="form__input border-gray-500 w-full"
              type="text"
              name="alt_image"
              placeholder="Texto alternativo"
              value={container.alt_image}
            />
            <p
              className={`input__error ${
                error.alt_image ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {error.alt_image}
            </p>
          </div>

          <div className="form__group w-full">
            <label className="form__label">Imágen</label>
            <input
              disabled
              className="form__input border-gray-500 w-full"
              type="text"
              id="image"
              name="image"
              placeholder="Imagen Resumen del post"
              value={container.image}
            />
            <p
              className={`input__error ${
                error.image ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {error.image}
            </p>
          </div>
        </div>
      </div>
      <Modal isOpenModal={isOpenModal} closeModal={closeModal}>
        <Media handleSelect={handleSelect} />
      </Modal>
    </>
  );
};

export default AddPicture;
