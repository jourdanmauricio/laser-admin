import { useModal } from '@/hooks/useModal';
import { Modal } from '@/commons/Modal/Modal';
import Media from '@/components/Media/Media';
import { useDispatch } from 'react-redux';
import { changeSettings } from '@/store/settings';
import { FaCloudUploadAlt } from 'react-icons/fa';
import Tooltip from '@/commons/Tooltip/Tooltip';

const AddPicture = ({ logoImage }) => {
  const [isOpenModal, openModal, closeModal] = useModal(false);
  const dispatch = useDispatch();

  const handleSelect = (image) => {
    closeModal();
    dispatch(
      changeSettings({ feature: 'image', value: image, type: logoImage.type })
    );
  };

  function firstCapital(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row items-center mt-8 gap-4">
        <div className="form__group p-0">
          <label className="form__label">
            {firstCapital(logoImage.feature)}
          </label>
          <img
            className="inline-block min-w-[250px] w-[300px] h-[50px] max-h-[60px] rounded bg-cover bg-center border border-solid border-gray-300 shadow-[0_0_10px_rgba(0,0,0,0.1)]"
            src={logoImage.value}
            alt={logoImage.feature}
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
      <Modal isOpenModal={isOpenModal} closeModal={closeModal}>
        <Media handleSelect={handleSelect} />
      </Modal>
    </>
  );
};

export default AddPicture;
