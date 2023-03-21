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
import WaveStyles from '@/components/WaveStyles/WaveStyles';
import Services from './Services/Services';

const ServicesSection = () => {
  const {
    servicesSection,
    blogSection,
    actionServices,
    quillRef,
    quillRef2,
    columns,
    actionsMemo,
    service,
    isOpenModal,
    closeModal,
    errorFields,
    isOpenModalWave,
    openModalWave,
    closeModalWave,
    editData,
    setDelError,
    setEditData,
    onChangeSetting,
    onChangeService,
    onCancel,
    onSubmit,
    handleCancelDelete,
    handleDelete,
  } = useServicesSection();
  return (
    <>
      <form onSubmit={onSubmit}>
        {Object.keys(servicesSection).length > 0 && (
          <div>
            {actionServices === 'SERVICES' && (
              <>
                <div className="form__group w-full">
                  <label className="form__label">Título</label>
                  <ReactQuill
                    ref={quillRef}
                    style={{
                      backgroundColor: `${servicesSection.bgColor.value}`,
                    }}
                    theme="snow"
                    value={servicesSection.title.value}
                    onChange={(e) => onChangeSetting('title', e)}
                    placeholder={'Write something awesome...'}
                    modules={quillSimpleModules}
                  />
                </div>

                <div className="form__group w-full">
                  <label className="form__label">Contenido</label>
                  <ReactQuill
                    ref={quillRef2}
                    style={{
                      backgroundColor: `${servicesSection.bgColor.value}`,
                    }}
                    theme="snow"
                    value={servicesSection.text.value}
                    onChange={(e) => onChangeSetting('text', e)}
                    placeholder={'Write something awesome...'}
                    modules={quillSimpleModules}
                  />
                </div>

                {/* SECTION */}
                <div className="flex flex-col sm:flex-row sm:gap-10">
                  <div className="form__group w-full">
                    <label className="form__label">Background</label>
                    <div className="flex items-center gap-4">
                      <input
                        className="form__input--color w-full border-gray-500"
                        type="color"
                        name={servicesSection.bgColor.feature}
                        value={servicesSection.bgColor.value}
                        onChange={(e) =>
                          onChangeSetting(e.target.name, e.target.value)
                        }
                      />
                      <input
                        type="text"
                        name={servicesSection.bgColor.feature}
                        value={servicesSection.bgColor.value}
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
                        name={servicesSection.textColor.feature}
                        value={servicesSection.textColor.value}
                        onChange={(e) =>
                          onChangeSetting(e.target.name, e.target.value)
                        }
                      />
                      <input
                        type="text"
                        name={servicesSection.textColor.feature}
                        value={servicesSection.textColor.value}
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
                      checked={
                        servicesSection.waveShow?.value === 'false'
                          ? false
                          : true
                      }
                      type="checkbox"
                      value=""
                      id={servicesSection.waveShow.feature}
                      name={servicesSection.waveShow.feature}
                      onChange={(e) =>
                        onChangeSetting(
                          e.target.name,
                          e.target.checked.toString()
                        )
                      }
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor={servicesSection.waveShow.feature}
                      className="ml-2 text-sm font-medium text-gray-700 text"
                    >
                      Wave
                    </label>
                    <button
                      disabled={servicesSection.waveShow.value === 'false'}
                      type="button"
                      onClick={() => openModalWave()}
                      className="btn__primary ml-4 disabled:bg-slate-400 disabled:cursor-default"
                    >
                      Modificar wave
                    </button>
                  </div>
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

      <Modal isOpenModal={isOpenModal} closeModal={closeModal}>
        <DeleteSubsection
          subsection={service}
          handleCancelDelete={handleCancelDelete}
          handleDelete={handleDelete}
        />
      </Modal>

      <Modal isOpenModal={isOpenModalWave} closeModal={closeModalWave}>
        <WaveStyles
          wave={servicesSection.wave}
          onChangeSetting={onChangeSetting}
          closeModalWave={closeModalWave}
          bg={servicesSection.bgColor} // Color seccion actual
          waveColor={blogSection.bgColor} // Color siguiente seccion
          section="Servicios"
          nextSection="Entradas destacadas"
        />
      </Modal>
    </>
  );
};

export default ServicesSection;
