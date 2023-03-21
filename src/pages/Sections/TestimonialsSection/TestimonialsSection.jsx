import ReactQuill from 'react-quill';
import { quillSimpleModules } from '@/config/constants';
import { Modal } from '@/commons/Modal/Modal';
import Media from '@/components/Media/Media';
import WaveStyles from '@/components/WaveStyles/WaveStyles';
import useTestimonialsSection from './useTestimonialsSection';
import Testimonials from './Testimonials/Testimonials';

const TestimonialsSection = () => {
  const {
    testimonialsSection,
    footerSection,
    quillRef,
    quillRef2,
    modules,
    isOpenModal,
    closeModal,
    isOpenModalWave,
    openModalWave,
    closeModalWave,
    errorField,
    editData,
    setDelError,
    setEditData,
    onChangeTestimonial,
    onSubmit,
    handleSelect,
    onChangeSetting,
    onCancel,
  } = useTestimonialsSection();

  return (
    <>
      {Object.keys(testimonialsSection).length > 0 && (
        <form onSubmit={onSubmit}>
          <div className="form__group w-full">
            <label className="form__label">Título</label>
            <ReactQuill
              ref={quillRef}
              id={testimonialsSection.id}
              style={{
                backgroundColor: `${testimonialsSection.bgColor.value}`,
              }}
              theme="snow"
              value={testimonialsSection.title.value}
              onChange={(e) => onChangeSetting('title', e)}
              placeholder={'Write something awesome...'}
              modules={quillSimpleModules}
            />
          </div>

          <div className="form__group w-full editor">
            <label className="form__label">Contenido</label>
            <ReactQuill
              ref={quillRef2}
              style={{
                backgroundColor: `${testimonialsSection.bgColor.value}`,
              }}
              theme="snow"
              value={testimonialsSection.text.value}
              onChange={(e) => onChangeSetting('text', e)}
              placeholder={'Write something awesome...'}
              modules={modules}
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
                  name={testimonialsSection.bgColor.feature}
                  value={testimonialsSection.bgColor.value}
                  onChange={(e) =>
                    onChangeSetting(e.target.name, e.target.value)
                  }
                />
                <input
                  type="text"
                  name={testimonialsSection.bgColor.feature}
                  value={testimonialsSection.bgColor.value}
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
                  name={testimonialsSection.textColor.feature}
                  value={testimonialsSection.textColor.value}
                  onChange={(e) =>
                    onChangeSetting(e.target.name, e.target.value)
                  }
                />
                <input
                  type="text"
                  name={testimonialsSection.textColor.feature}
                  value={testimonialsSection.textColor.value}
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
                  testimonialsSection.waveShow?.value === 'false' ? false : true
                }
                type="checkbox"
                value=""
                id={testimonialsSection.waveShow.feature}
                name={testimonialsSection.waveShow.feature}
                onChange={(e) =>
                  onChangeSetting(e.target.name, e.target.checked.toString())
                }
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor={testimonialsSection.waveShow.feature}
                className="ml-2 text-sm font-medium text-gray-700 text"
              >
                Wave
              </label>
              <button
                disabled={testimonialsSection.waveShow.value === 'false'}
                type="button"
                onClick={() => openModalWave()}
                className="btn__primary ml-4 disabled:bg-slate-400 disabled:cursor-default"
              >
                Modificar wave
              </button>
            </div>
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
              Modificar
            </button>
          </div>
        </form>
      )}
      <Modal isOpenModal={isOpenModal} closeModal={closeModal}>
        <Media handleSelect={handleSelect} />
      </Modal>
      <Modal isOpenModal={isOpenModalWave} closeModal={closeModalWave}>
        <WaveStyles
          wave={testimonialsSection.wave}
          onChangeSetting={onChangeSetting}
          closeModalWave={closeModalWave}
          bg={testimonialsSection.bgColor} // Color seccion actual
          waveColor={footerSection.bgColor} // Color siguiente seccion
          section="Testimonios"
          nextSection="Footer"
        />
      </Modal>
    </>
  );
};

export default TestimonialsSection;
