import Service from './Service/Service';
import useServicesSection from './useServicesSection';
import Services from './Services/Services';
import EditWave from '@/components/EditWave/EditWave';
import SectionColors from '@/components/SectionColors/SectionColors';
import SectionContent from '@/components/SectionContent/SectionContent';

const ServicesSection = () => {
  const {
    servicesSection,
    blogSection,
    actionServices,
    errorFields,
    editData,
    setDelError,
    setEditData,
    onChangeService,
    onCancel,
    onSubmit,
  } = useServicesSection();
  return (
    <form onSubmit={onSubmit}>
      {Object.keys(servicesSection).length > 0 && (
        <div>
          {actionServices === 'SERVICES' && (
            <>
              {/* SECTION */}
              <SectionContent section={servicesSection} />
              <SectionColors section={servicesSection} />

              {/* BOTON - WAVE */}
              <div className="flex flex-col sm:flex-row sm:gap-10">
                <EditWave
                  currentSection={servicesSection}
                  waveColor={blogSection.bgColor} // Color siguiente seccion
                  section="Servicios"
                  nextSection="Entradas destacadas"
                />
              </div>

              <hr />
              <Services
                errorFields={errorFields}
                onChangeService={onChangeService}
                editData={editData}
                setEditData={setEditData}
                setDelError={setDelError}
              />
            </>
          )}
        </div>
      )}

      {actionServices !== 'SERVICES' && (
        <Service
          editData={editData}
          errorFields={errorFields}
          onChangeService={onChangeService}
        />
      )}

      {/* ACTIONS */}
      <div className="actions">
        <button
          onClick={onCancel}
          className="mt-8 btn__secondary"
          type="submit"
        >
          Cancelar
        </button>

        <button className="my-8 btn__primary" type="submit">
          {actionServices === 'NEW' ? 'Crear' : 'Modificar'}
        </button>
      </div>
    </form>
  );
};

export default ServicesSection;
