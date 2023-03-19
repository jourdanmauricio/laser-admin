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
    actionClinics,
    clinicSection,
    quillRef,
    quillRef2,
    clinicBgColor,
    clinicTextColor,
    isOpenModal,
    closeModal,
    modules,
    errorField,
    editData,
    waveClinicShow,
    waveClinic,
    isOpenModalButton,
    closeModalButton,
    openModalButton,
    button,
    isOpenModalWave,
    openModalWave,
    closeModalWave,
    testimonialsBgColor,
    setDelError,
    setEditData,
    onChangeSection,
    handleSelect,
    onChangeSetting,
    onChangeSetting2,
    onChangeSubsection,
    onSubmit,
    onCancel,
    onChangeClinic,
    onChangeClinicImage,
  } = useClinicsSection();

  return (
    <>
      <form onSubmit={onSubmit} noValidate>
        {clinicSection && clinicBgColor && (
          <>
            <div>
              <div className="form__group w-full">
                <label className="form__label">Título</label>
                <ReactQuill
                  ref={quillRef}
                  id={clinicSection.id}
                  style={{ backgroundColor: `${clinicBgColor.value}` }}
                  theme="snow"
                  value={clinicSection.title}
                  onChange={(e) => onChangeSection('title', e)}
                  placeholder={'Write something awesome...'}
                  modules={quillSimpleModules}
                />
              </div>
              {clinicSection.subsections.map((subsection) => (
                <div key={subsection.id}>
                  <div className="form__group w-full editor pb-0">
                    <label className="form__label">Contenido</label>
                    <ReactQuill
                      ref={quillRef2}
                      id={subsection.id}
                      style={{ backgroundColor: `${clinicBgColor.value}` }}
                      theme="snow"
                      value={subsection.content}
                      onChange={(e) =>
                        onChangeSubsection(
                          'content',
                          e,
                          clinicSection.id,
                          subsection.id
                        )
                      }
                      placeholder={'Write something awesome...'}
                      modules={modules}
                    />
                  </div>
                </div>
              ))}

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
                    name="clinicBgColor"
                    value={clinicBgColor.value}
                    onChange={(e) =>
                      onChangeSetting(e.target.name, e.target.value)
                    }
                  />
                  <input
                    type="text"
                    value={clinicBgColor.value}
                    name="clinicBgColor"
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
                    name="clinicTextColor"
                    value={clinicTextColor.value}
                    onChange={(e) =>
                      onChangeSetting(e.target.name, e.target.value)
                    }
                  />
                  <input
                    type="text"
                    value={clinicTextColor.value}
                    name="clinicTextColor"
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
                    checked={waveClinicShow?.value === 'false' ? false : true}
                    type="checkbox"
                    value=""
                    name={waveClinicShow.feature}
                    id={waveClinicShow.feature}
                    onChange={(e) =>
                      onChangeSetting(
                        e.target.name,
                        e.target.checked.toString()
                      )
                    }
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor={waveClinicShow.feature}
                    className="ml-2 w-[90px] text-sm font-medium text-gray-700"
                  >
                    Wave
                  </label>
                  <button
                    disabled={waveClinicShow.value === 'false'}
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
          wave={waveClinic}
          onChangeSetting={onChangeSetting}
          closeModalWave={closeModalWave}
          bg={clinicBgColor} // Color seccion actual
          waveColor={testimonialsBgColor} // Color siguiente seccion
          section="Consultorios"
          nextSection="Testimonios"
        />
      </Modal>
      {isOpenModalButton && (
        <Modal isOpenModal={isOpenModalButton} closeModal={closeModalButton}>
          <ButtonStyles
            button={button}
            onChangeSetting2={onChangeSetting2}
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
