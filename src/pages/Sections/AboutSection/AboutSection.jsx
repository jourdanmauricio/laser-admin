import useAboutSection from './useAboutSection';
import EditWave from '@/components/EditWave/EditWave';
import SectionColors from '@/components/SectionColors/SectionColors';
import SectionContent from '@/components/SectionContent/SectionContent';

const AboutSection = () => {
  const { aboutSection, servicesSection, onSubmit, onCancel } =
    useAboutSection();

  return (
    <>
      {Object.keys(aboutSection).length > 0 && (
        <form onSubmit={onSubmit}>
          {/* SECTION */}
          <SectionContent section={aboutSection} />
          <SectionColors section={aboutSection} />

          {/* WAVE */}
          <div className="flex flex-col sm:flex-row sm:gap-10">
            <EditWave
              currentSection={aboutSection}
              waveColor={servicesSection.bgColor} // Color siguiente seccion
              section="Sobre mí"
              nextSection="Servicios"
            />
          </div>

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
              Modificar
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default AboutSection;
