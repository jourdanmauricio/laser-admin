import Clinics from './Clinics/Clinics';
import useClinicsSection from './useClinicsSection';
import EditWave from '@/components/EditWave/EditWave';
import EditBtn from '@/components/EditBtn/EditBtn';
import SectionColors from '@/components/SectionColors/SectionColors';
import SectionContent from '@/components/SectionContent/SectionContent';
import SectionButtonPreview from '@/components/SectionButtonPreview/SectionButtonPreview';

const ClinicsSection = () => {
  const {
    clinicsSection,
    testimonialsSection,
    actionClinics,
    errorField,
    editData,
    button,
    setDelError,
    setEditData,
    onSubmit,
    onCancel,
    onChangeClinic,
    onChangeClinicImage,
  } = useClinicsSection();

  return (
    <form onSubmit={onSubmit} noValidate>
      {Object.keys(clinicsSection).length > 0 && (
        <>
          {/* SECCION */}
          <SectionContent section={clinicsSection} />
          <SectionButtonPreview button={button} section={clinicsSection} />
          <SectionColors section={clinicsSection} />

          {/* BOTON - WAVE */}
          <div className="flex flex-col sm:flex-row sm:gap-10">
            <EditWave
              currentSection={clinicsSection}
              waveColor={testimonialsSection.bgColor} // Color siguiente seccion
              section="Consultorios"
              nextSection="Testimonios"
            />

            <EditBtn button={button} currentSection={clinicsSection} />
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
  );
};

export default ClinicsSection;
