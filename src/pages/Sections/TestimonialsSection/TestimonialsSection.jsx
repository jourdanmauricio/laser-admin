import useTestimonialsSection from './useTestimonialsSection';
import Testimonials from './Testimonials/Testimonials';
import EditWave from '@/components/EditWave/EditWave';
import SectionColors from '@/components/SectionColors/SectionColors';
import SectionContent from '@/components/SectionContent/SectionContent';

const TestimonialsSection = () => {
  const {
    testimonialsSection,
    actionTestimonials,
    footerSection,
    errorField,
    editData,
    setDelError,
    setEditData,
    onChangeTestimonial,
    onSubmit,
    onCancel,
  } = useTestimonialsSection();

  return (
    <>
      {Object.keys(testimonialsSection).length > 0 && (
        <form onSubmit={onSubmit}>
          {/* SECTION */}
          <SectionContent section={testimonialsSection} />
          <SectionColors section={testimonialsSection} />

          {/* BOTON - WAVE */}
          <div className="flex flex-col sm:flex-row sm:gap-10">
            <EditWave
              currentSection={testimonialsSection}
              waveColor={footerSection.bgColor} // Color siguiente seccion
              section="Testimonios"
              nextSection="Footer"
            />
          </div>

          <hr />

          <Testimonials
            errorField={errorField}
            onChangeTestimonial={onChangeTestimonial}
            editData={editData}
            setEditData={setEditData}
            setDelError={setDelError}
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
              {actionTestimonials === 'NEW' ? 'Crear' : 'Modificar'}
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default TestimonialsSection;
