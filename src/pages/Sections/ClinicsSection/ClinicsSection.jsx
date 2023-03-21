import ReactQuill from 'react-quill';
import { quillSimpleModules } from '@/config/constants';
import { Modal } from '@/commons/Modal/Modal';
import Media from '@/components/Media/Media';
import Clinics from './Clinics/Clinics';
import useClinicsSection from './useClinicsSection';
import ButtonStyles from '@/components/ButtonStyles/ButtonStyles';
import WaveStyles from '@/components/WaveStyles/WaveStyles';

const ClinicsSection = () => {
  const {
    clinicsSection,
    testimonialsSection,
    actionClinics,
    quillRef,
    quillRef2,
    isOpenModal,
    closeModal,
    isOpenModalButton,
    closeModalButton,
    openModalButton,
    modules,
    errorField,
    editData,
    button,
    isOpenModalWave,
    openModalWave,
    closeModalWave,
    setDelError,
    setEditData,
    handleSelect,
    onChangeSetting,
    onSubmit,
    onCancel,
    onChangeClinic,
    onChangeClinicImage,
  } = useClinicsSection();

  return (
    <>
      <form onSubmit={onSubmit} noValidate>
        {Object.keys(clinicsSection).length > 0 && (
          <>
            <div>
              <div className="form__group w-full">
                <label className="form__label">Título</label>
                <ReactQuill
                  ref={quillRef}
                  style={{ backgroundColor: `${clinicsSection.bgColor.value}` }}
                  theme="snow"
                  value={clinicsSection.title.value}
                  onChange={(e) => onChangeSetting('title', e)}
                  placeholder={'Write something awesome...'}
                  modules={quillSimpleModules}
                />
              </div>
              <div className="form__group w-full editor pb-0">
                <label className="form__label">Contenido</label>
                <ReactQuill
                  ref={quillRef2}
                  style={{ backgroundColor: `${clinicsSection.bgColor.value}` }}
                  theme="snow"
                  value={clinicsSection.text.value}
                  onChange={(e) => onChangeSetting('text', e)}
                  placeholder={'Write something awesome...'}
                  modules={modules}
                />
              </div>

              <div className="border border-solid border-gray-300 bg-clinicBgColor h-20 w-full flex items-center justify-center">
                {button.show.value === 'true' && (
                  <div
                    type="button"
                    className="border border-solid transition ease-in-out delay-100  hover:cursor-pointer btn__clinic"
                  >
                    {/* px-8 py-2 */}
                    {button.text.value}
                  </div>
                )}
              </div>
            </div>

            {/* SECCION */}
            <div className="flex flex-col sm:flex-row sm:gap-10">
              <div className="form__group w-full">
                <label className="form__label">Background</label>
                <div className="flex items-center gap-4">
                  <input
                    className="form__input--color w-full border-gray-500"
                    type="color"
                    name={clinicsSection.bgColor.feature}
                    value={clinicsSection.bgColor.value}
                    onChange={(e) =>
                      onChangeSetting(e.target.name, e.target.value)
                    }
                  />
                  <input
                    type="text"
                    value={clinicsSection.bgColor.value}
                    name={clinicsSection.bgColor.feature}
                    placeholder="#531253"
                    className="form__input border-gray-500"
                    onChange={(e) =>
                      onChangeSetting(e.target.name, e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="form__group w-full">
                <label className="form__label">Contenido</label>
                <div className="flex items-center gap-4">
                  <input
                    className="form__input--color w-full border-gray-500"
                    type="color"
                    name={clinicsSection.textColor.feature}
                    value={clinicsSection.textColor.value}
                    onChange={(e) =>
                      onChangeSetting(e.target.name, e.target.value)
                    }
                  />
                  <input
                    type="text"
                    name={clinicsSection.textColor.feature}
                    value={clinicsSection.textColor.value}
                    placeholder="#531253"
                    className="form__input border-gray-500"
                    onChange={(e) =>
                      onChangeSetting(e.target.name, e.target.value)
                    }
                  />
                </div>
              </div>
            </div>

            {/* BOTON - WAVE */}
            <div className="flex flex-col sm:flex-row sm:gap-10">
              <div className="form__group w-full">
                <input
                  checked={button.show.value === 'false' ? false : true}
                  type="checkbox"
                  value=""
                  name={button.show.feature}
                  id={button.show.feature}
                  onChange={(e) =>
                    onChangeSetting(e.target.name, e.target.checked.toString())
                  }
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor={button.show.feature}
                  className="ml-2 min-w-[90px] text-sm font-medium text-gray-700"
                >
                  Botón CTA
                </label>
                <button
                  disabled={button.show.value === 'false'}
                  type="button"
                  onClick={() => openModalButton()}
                  className="btn__primary ml-4 disabled:bg-slate-400 disabled:cursor-default"
                >
                  Modificar botón
                </button>
              </div>

              <div className="flex items-center gap-4 w-full">
                <div className="form__group w-full">
                  <input
                    checked={
                      clinicsSection.waveShow?.value === 'false' ? false : true
                    }
                    type="checkbox"
                    value=""
                    name={clinicsSection.waveShow.feature}
                    id={clinicsSection.waveShow.feature}
                    onChange={(e) =>
                      onChangeSetting(
                        e.target.name,
                        e.target.checked.toString()
                      )
                    }
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor={clinicsSection.waveShow.feature}
                    className="ml-2 w-[90px] text-sm font-medium text-gray-700"
                  >
                    Wave
                  </label>
                  <button
                    disabled={clinicsSection.waveShow.value === 'false'}
                    type="button"
                    onClick={() => openModalWave()}
                    className="btn__primary ml-4 disabled:bg-slate-400 disabled:cursor-default"
                  >
                    Modificar wave
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
        <hr />

        <Clinics
          errorField={errorField}
          onChangeClinic={onChangeClinic}
          editData={editData}
          setEditData={setEditData}
          setDelError={setDelError}
          onChangeClinicImage={onChangeClinicImage}
        />

        {/* ACTIONS */}
        <div className="actions">
          <button
            onClick={onCancel}
            className="mt-8 btn__secondary"
            type="button"
          >
            Cancelar
          </button>

          <button className="my-8 btn__primary" type="submit">
            {actionClinics === 'NEW' ? 'Crear' : 'Modificar'}
          </button>
        </div>
      </form>

      <Modal isOpenModal={isOpenModalWave} closeModal={closeModalWave}>
        <WaveStyles
          wave={clinicsSection.wave}
          onChangeSetting={onChangeSetting}
          closeModalWave={closeModalWave}
          bg={clinicsSection.bgColor} // Color seccion actual
          waveColor={testimonialsSection.bgColor} // Color siguiente seccion
          section="Consultorios"
          nextSection="Testimonios"
        />
      </Modal>

      {isOpenModalButton && (
        <Modal isOpenModal={isOpenModalButton} closeModal={closeModalButton}>
          <ButtonStyles
            button={button}
            onChangeSetting2={onChangeSetting}
            closeModal={closeModalButton}
          />
        </Modal>
      )}

      <Modal isOpenModal={isOpenModal} closeModal={closeModal}>
        <Media handleSelect={handleSelect} />
      </Modal>
    </>
  );
};

export default ClinicsSection;
