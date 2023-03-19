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
    quillRef,
    testimonialsBgColor,
    testimonialsTextColor,
    quillRef2,
    modules,
    isOpenModal,
    closeModal,
    waveTestimonialsShow,
    waveTestimonials,
    isOpenModalWave,
    openModalWave,
    closeModalWave,
    footerBgColor,
    errorField,
    editData,
    setDelError,
    setEditData,
    onChangeTestimonial,
    onChangeSection,
    onChangeSubsection,
    onSubmit,
    handleSelect,
    onChangeSetting,
    onCancel,
  } = useTestimonialsSection();

  return (
    <>
      {testimonialsSection && testimonialsBgColor && (
        <form onSubmit={onSubmit}>
          <div className="form__group w-full">
            <label className="form__label">Título</label>
            <ReactQuill
              ref={quillRef}
              id={testimonialsSection.id}
              style={{ backgroundColor: `${testimonialsBgColor.value}` }}
              theme="snow"
              value={testimonialsSection.title}
              onChange={(e) => onChangeSection('title', e)}
              placeholder={'Write something awesome...'}
              modules={quillSimpleModules}
            />
          </div>

          {testimonialsSection.subsections.map((subsection) => (
            <div key={subsection.id}>
              <div className="form__group w-full editor">
                <label className="form__label">Contenido</label>
                <ReactQuill
                  ref={quillRef2}
                  id={subsection.id}
                  style={{ backgroundColor: `${testimonialsBgColor.value}` }}
                  theme="snow"
                  value={subsection.content}
                  onChange={(e) =>
                    onChangeSubsection(
                      'content',
                      e,
                      testimonialsSection.id,
                      subsection.id
                    )
                  }
                  placeholder={'Write something awesome...'}
                  modules={modules}
                />
              </div>
              <hr />
            </div>
          ))}

          {/* SECTION */}
          <div className="flex flex-col sm:flex-row sm:gap-10">
            <div className="form__group w-full">
              <label className="form__label">Background</label>
              <div className="flex items-center gap-4">
                <input
                  className="form__input--color w-full border-gray-500"
                  type="color"
                  name={testimonialsBgColor.feature}
                  value={testimonialsBgColor.value}
                  onChange={(e) =>
                    onChangeSetting(e.target.name, e.target.value)
                  }
                />
                <input
                  type="text"
                  name={testimonialsBgColor.feature}
                  value={testimonialsBgColor.value}
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
                  name={testimonialsTextColor.feature}
                  value={testimonialsTextColor.value}
                  onChange={(e) =>
                    onChangeSetting(e.target.name, e.target.value)
                  }
                />
                <input
                  type="text"
                  name={testimonialsTextColor.feature}
                  value={testimonialsTextColor.value}
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
                checked={waveTestimonialsShow?.value === 'false' ? false : true}
                type="checkbox"
                value=""
                id={waveTestimonialsShow.feature}
                name={waveTestimonialsShow.feature}
                onChange={(e) =>
                  onChangeSetting(e.target.name, e.target.checked.toString())
                }
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor={waveTestimonialsShow.feature}
                className="ml-2 text-sm font-medium text-gray-700 text"
              >
                Wave
              </label>
              <button
                disabled={waveTestimonialsShow.value === 'false'}
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
            // onChangeClinicImage={onChangeClinicImage}
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
          wave={waveTestimonials}
          onChangeSetting={onChangeSetting}
          closeModalWave={closeModalWave}
          bg={testimonialsBgColor} // Color seccion actual
          waveColor={footerBgColor} // Color siguiente seccion
          section="Testimonios"
          nextSection="Footer"
        />
      </Modal>
    </>
  );
};

export default TestimonialsSection;
