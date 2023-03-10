import { useModal } from '@/hooks/useModal';
import { Modal } from '@/commons/Modal/Modal';
import Media from '@/components/Media/Media';
import { useDispatch } from 'react-redux';
import { changeSettings } from '@/store/settings';

const AddPicture = ({ logoImage }) => {
  const [isOpenModal, openModal, closeModal] = useModal(false);
  const dispatch = useDispatch();

  const handleSelect = (image) => {
    closeModal();
    dispatch(changeSettings({ feature: 'image', value: image }));
  };

  function firstCapital(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="form__group p-0 mt-8">
          <label className="form__label">
            {firstCapital(logoImage.feature)}
          </label>
          <img
            className="inline-block min-w-[250px] w-[300px] h-[50px] max-h-[60px] rounded bg-cover bg-center border border-solid border-gray-300 shadow-[0_0_10px_rgba(0,0,0,0.1)]"
            src={logoImage.value}
            alt={logoImage.feature}
          />
        </div>

        <button onClick={openModal} type="button" className="btn__primary">
          Seleccionar {firstCapital(logoImage.feature)}
        </button>
      </div>
      <Modal isOpenModal={isOpenModal} closeModal={closeModal}>
        <Media handleSelect={handleSelect} />
      </Modal>
    </>
  );
};

export default AddPicture;
