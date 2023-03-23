import { useDispatch } from 'react-redux';
import { changeSettings } from '@/store/settings';
import Tooltip from '@/commons/Tooltip/Tooltip';
import { useModal } from '@/hooks/useModal';
import { Modal } from '@/commons/Modal/Modal';
import { FaEdit } from 'react-icons/fa';
import ButtonStyles from './ButtonStyles';

const EditBtn = ({ button, currentSection }) => {
  const dispatch = useDispatch();
  const [isOpenModalBtn, openModalBtn, closeModalBtn] = useModal(false);

  const onChangeSetting = (feature, value, type) => {
    dispatch(
      changeSettings({
        feature,
        value,
        type,
      })
    );
  };

  return (
    <>
      <div className="form__group w-full">
        <input
          checked={button.show.value === 'false' ? false : true}
          type="checkbox"
          value=""
          name={button.show.feature}
          onChange={(e) =>
            onChangeSetting(e.target.name, e.target.checked.toString())
          }
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          htmlFor="main"
          className="ml-2 text-sm font-medium text-gray-700 text"
        >
          Botón CTA
        </label>

        <div className="ml-5 inline-block">
          <Tooltip content="Editar Botón" position="top">
            <button
              type="button"
              className="hover:bg-slate-200 p-2 rounded-full cursor-pointer"
              onClick={openModalBtn}
            >
              <FaEdit className="text-teal-500 text-xl" />
            </button>
          </Tooltip>
        </div>
      </div>
      {isOpenModalBtn && (
        <Modal isOpenModal={isOpenModalBtn} closeModal={closeModalBtn}>
          <ButtonStyles
            button={button}
            onChangeSetting={onChangeSetting}
            closeModal={closeModalBtn}
            currentSection={currentSection}
          />
        </Modal>
      )}
    </>
  );
};

export default EditBtn;
