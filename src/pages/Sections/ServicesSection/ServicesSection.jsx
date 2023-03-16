import ReactQuill from 'react-quill';
import {
  quillSimpleModules,
  paginationComponentOptions,
} from '@/config/constants';
import DataTable from 'react-data-table-component';
import Service from './Service/Service';
import { Modal } from '@/commons/Modal/Modal';
import DeleteSubsection from './DeleteSubsection/DeleteSubsection';
import useServicesSection from './useServicesSection';
// import WaveSettings from '../../../commons/WaveSettings/WaveSettings';
import WaveStyles from '@/components/WaveStyles/WaveStyles';

const ServicesSection = () => {
  const {
    servicesSection,
    actionSections,
    quillRef,
    servicesBgColor,
    columns,
    actionsMemo,
    service,
    isOpenModal,
    closeModal,
    errorFields,
    waveServiceShow,
    waveService,
    isOpenModalWave,
    openModalWave,
    closeModalWave,
    blogBgColor,
    onChangeSection,
    onChangeSetting,
    onCancel,
    onSubmit,
    handleCancelDelete,
    handleDelete,
  } = useServicesSection();
  return (
    <>
      <form onSubmit={onSubmit}>
        {servicesSection && (
          <div>
            {actionSections === 'SECTIONS' && (
              <>
                <div className="form__group w-full">
                  <label className="form__label">Título</label>
                  <ReactQuill
                    ref={quillRef}
                    id={servicesSection.id}
                    style={{ backgroundColor: `${servicesBgColor.value}` }}
                    theme="snow"
                    value={servicesSection.title}
                    onChange={(e) => onChangeSection('title', e)}
                    placeholder={'Write something awesome...'}
                    modules={quillSimpleModules}
                  />
                </div>

                <div className="form__group">
                  <label className="form__label">Color fondo sección</label>
                  <div className="flex items-center gap-4">
                    <input
                      className="form__input--color w-full border-gray-500"
                      type="color"
                      name="servicesBgColor"
                      value={servicesBgColor.value}
                      onChange={(e) =>
                        onChangeSetting(e.target.name, e.target.value)
                      }
                    />
                    <input
                      type="text"
                      value={servicesBgColor.value}
                      name="servicesBgColor"
                      placeholder="#531253"
                      className="form__input border-gray-500"
                      onChange={(e) =>
                        onChangeSetting(e.target.name, e.target.value)
                      }
                    />
                  </div>
                </div>

                {/* WAVE */}
                <div className="flex">
                  <div className="form__group w-full">
                    <input
                      checked={
                        waveServiceShow?.value === 'false' ? false : true
                      }
                      type="checkbox"
                      value=""
                      name={waveServiceShow.feature}
                      onChange={(e) =>
                        onChangeSetting(
                          e.target.name,
                          e.target.checked.toString()
                        )
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

                <hr />

                <DataTable
                  title={<h1 className="title text-left">Servicios</h1>}
                  columns={columns}
                  data={servicesSection.subsections}
                  actions={actionsMemo}
                  pagination
                  paginationComponentOptions={paginationComponentOptions}
                />
              </>
            )}
          </div>
        )}

        {actionSections !== 'SECTIONS' && (
          <Service service={service} errorFields={errorFields} />
        )}

        <div className="actions">
          <button
            onClick={onCancel}
            className="mt-8 btn__secondary"
            type="submit"
          >
            Cancelar
          </button>

          <button className="my-8 btn__primary" type="submit">
            {actionSections === 'NEW' ? 'Crear' : 'Modificar'}
          </button>
        </div>
      </form>

      <Modal isOpenModal={isOpenModal} closeModal={closeModal}>
        <DeleteSubsection
          subsection={service}
          handleCancelDelete={handleCancelDelete}
          handleDelete={handleDelete}
        />
      </Modal>

      <Modal isOpenModal={isOpenModalWave} closeModal={closeModalWave}>
        <WaveStyles
          wave={waveService}
          onChangeSetting={onChangeSetting}
          closeModalWave={closeModalWave}
          bg={servicesBgColor} // Color seccion actual
          waveColor={blogBgColor} // Color siguiente seccion
          section="Servicios"
          nextSection="Entradas destacadas"
        />
      </Modal>
    </>
  );
};

export default ServicesSection;
