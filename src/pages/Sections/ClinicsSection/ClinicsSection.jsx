import ReactQuill from 'react-quill';
import { quillSimpleModules } from '@/config/constants';
import { Modal } from '@/commons/Modal/Modal';
import Media from '@/components/Media/Media';
import Clinics from './Clinics/Clinics';
import useClinicsSection from './useClinicsSection';
// import WaveSettings from '@/commons/WaveSettings/WaveSettings';
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
    clinicBtn,
    isOpenModalWave,
    openModalWave,
    closeModalWave,
    footerBgColor,
    setDelError,
    setEditData,
    onChangeSection,
    handleSelect,
    onChangeSetting,
    onChangeSubsection,
    onSubmit,
    onCancel,
    onChangeClinic,
  } = useClinicsSection();

  return (
    <>
      <form onSubmit={onSubmit} noValidate>
        {clinicSection && (
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

              {clinicBtn.clinicBtnShow.value === 'true' && (
                <div className="border border-solid border-gray-300 bg-clinicBgColor h-20 w-full flex items-center justify-center">
                  <div
                    type="button"
                    className="border border-solid px-4 py-2 transition ease-in-out delay-100  hover:cursor-pointer btn__settings"
                  >
                    {clinicBtn.clinicBtnText.value}
                  </div>
                </div>
              )}
            </div>

            {/* SECCION */}
            <div className="form__group">
              <label className="form__label">Color fondo sección</label>
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

            <div className="form__group">
              <label className="form__label">Color de texto consultorios</label>
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

            {/* BOTON */}
            <div className="flex">
              <div className="form__group w-full">
                <input
                  checked={
                    clinicBtn.clinicBtnShow.value === 'false' ? false : true
                  }
                  type="checkbox"
                  value=""
                  name={clinicBtn.clinicBtnShow.feature}
                  onChange={(e) =>
                    onChangeSetting(e.target.name, e.target.checked.toString())
                  }
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="main"
                  className="ml-2 text-sm font-medium text-gray-700 text"
                >
                  Mostrar botón
                </label>
              </div>
              <div className="form__group w-full">
                <button
                  type="button"
                  onClick={() => openModalButton()}
                  className="btn__primary"
                >
                  Modificar botón
                </button>
              </div>
            </div>

            {/* WAVE */}
            <div className="flex">
              <div className="form__group w-full">
                <input
                  checked={waveClinicShow?.value === 'false' ? false : true}
                  type="checkbox"
                  value=""
                  name={waveClinicShow.feature}
                  onChange={(e) =>
                    onChangeWave(e.target.name, e.target.checked.toString())
                  }
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="main"
                  className="ml-2 text-sm font-medium text-gray-700 text"
                >
                  Wave
                </label>
              </div>
              <div className="form__group w-full">
                <button
                  type="button"
                  onClick={() => openModalWave()}
                  className="btn__primary"
                >
                  Modificar wave
                </button>
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
        />
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
          waveColor={footerBgColor} // Color siguiente seccion
          section="Consultorios"
          nextSection="Footer"
        />
      </Modal>

      <Modal isOpenModal={isOpenModalButton} closeModal={closeModalButton}>
        <ButtonStyles
          text={clinicBtn.clinicBtnText}
          textColor={clinicBtn.clinicBtnTextColor}
          textColorHover={clinicBtn.clinicBtnTextColorHover}
          borderColor={clinicBtn.clinicBtnBorderColor}
          borderColorHover={clinicBtn.clinicBtnBorderColorHover}
          bg={clinicBtn.clinicBtnBg}
          bgHover={clinicBtn.clinicBtnBgHover}
          tlRadius={clinicBtn.clinicBtnTlRadius}
          trRadius={clinicBtn.clinicBtnTrRadius}
          blRadius={clinicBtn.clinicBtnBlRadius}
          brRadius={clinicBtn.clinicBtnBrRadius}
          shadow={clinicBtn.clinicBtnShadow}
          link={clinicBtn.clinicBtnLink}
          onChangeSetting={onChangeSetting}
          closeModalButton={closeModalButton}
        />
      </Modal>

      <Modal isOpenModal={isOpenModal} closeModal={closeModal}>
        <Media handleSelect={handleSelect} />
      </Modal>
    </>
  );
};

export default ClinicsSection;
