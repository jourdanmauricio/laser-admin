import ReactQuill from 'react-quill';
import { quillSimpleModules } from '@/config/constants';
import { Modal } from '@/commons/Modal/Modal';
import Media from '@/components/Media/Media';
import Clinics from './Clinics/Clinics';
import useClinicsSection from './useClinicsSection';
import WaveSettings from '@/commons/WaveSettings/WaveSettings';

const ClinicsSection = () => {
  const {
    actionClinics,
    clinicSection,
    quillRef,
    quillRef2,
    clinicBgColor,
    isOpenModal,
    closeModal,
    modules,
    errorField,
    editData,
    waveClinicShow,
    waveClinic,
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
                <div className="form__group w-full editor">
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
          </div>
        )}
        <div className="mt-1 form__group">
          <label className="form__label">Color fondo sección</label>
          <div className="flex items-center gap-4">
            <input
              className="form__input--color w-full border-gray-500"
              type="color"
              name="clinicBgColor"
              value={clinicBgColor.value}
              onChange={(e) => onChangeSetting(e.target.name, e.target.value)}
            />
            <input
              type="text"
              value={clinicBgColor.value}
              name="clinicBgColor"
              placeholder="#531253"
              className="form__input border-gray-500"
              onChange={(e) => onChangeSetting(e.target.name, e.target.value)}
            />
          </div>
        </div>

        <WaveSettings
          waveShow={waveClinicShow}
          wave={waveClinic}
          onChangeWave={onChangeSetting}
        />

        <hr />
        <Modal isOpenModal={isOpenModal} closeModal={closeModal}>
          <Media handleSelect={handleSelect} />
        </Modal>

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
    </>
  );
};

export default ClinicsSection;
