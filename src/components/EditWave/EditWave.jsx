import { useDispatch } from 'react-redux';
import { changeSettings } from '@/store/settings';
import { useModal } from '@/hooks/useModal';
import { Modal } from '@/commons/Modal/Modal';
import WaveStyles from './WaveStyles';
import Tooltip from '@/commons/Tooltip/Tooltip';
import { FaEdit } from 'react-icons/fa';

const EditWave = ({ currentSection, waveColor, section, nextSection }) => {
  const dispatch = useDispatch();
  const [isOpenModalWave, openModalWave, closeModalWave] = useModal(false);

  const onChangeSetting = (feature, value) => {
    dispatch(
      changeSettings({
        feature,
        value,
        type: currentSection.bgColor.type,
      })
    );
  };

  return (
    <>
      <div className="form__group w-full">
        <input
          checked={currentSection.waveShow?.value === 'false' ? false : true}
          type="checkbox"
          value=""
          id={currentSection.waveShow.feature}
          name={currentSection.waveShow.feature}
          onChange={(e) =>
            onChangeSetting(e.target.name, e.target.checked.toString())
          }
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          htmlFor={currentSection.waveShow.feature}
          className="ml-2 text-sm font-medium text-gray-700 text"
        >
          Wave
        </label>

        <div className="ml-5 inline-block">
          <Tooltip content="Editar Wave" position="top">
            <button
              type="button"
              className="hover:bg-slate-200 p-2 rounded-full cursor-pointer"
              onClick={openModalWave}
            >
              <FaEdit className="text-teal-500 text-xl" />
            </button>
          </Tooltip>
        </div>
      </div>
      {isOpenModalWave && (
        <Modal isOpenModal={isOpenModalWave} closeModal={closeModalWave}>
          <WaveStyles
            wave={currentSection.wave}
            onChangeSetting={onChangeSetting}
            closeModalWave={closeModalWave}
            bg={currentSection.bgColor} // Color seccion actual
            waveColor={waveColor} // Color siguiente seccion
            section={section}
            nextSection={nextSection}
          />
        </Modal>
      )}
    </>
  );
};

export default EditWave;
