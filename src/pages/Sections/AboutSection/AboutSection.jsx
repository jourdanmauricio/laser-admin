import ReactQuill from 'react-quill';
import { quillSimpleModules } from '@/config/constants';
import { Modal } from '@/commons/Modal/Modal';
import Media from '@/components/Media/Media';
import useAboutSection from './useAboutSection';
import WaveStyles from '@/components/WaveStyles/WaveStyles';

const AboutSection = () => {
  const {
    aboutSection,
    quillRef,
    aboutBgColor,
    aboutTextColor,
    quillRef2,
    modules,
    isOpenModal,
    closeModal,
    waveAboutShow,
    waveAbout,
    isOpenModalWave,
    openModalWave,
    closeModalWave,
    servicesBgColor,
    onChangeSection,
    onChangeSubsection,
    onSubmit,
    handleSelect,
    onChangeSetting,
    onCancel,
  } = useAboutSection();

  return (
    <>
      {aboutSection && aboutBgColor && (
        <form onSubmit={onSubmit}>
          <div className="form__group w-full">
            <label className="form__label">Título</label>
            <ReactQuill
              ref={quillRef}
              id={aboutSection.id}
              style={{ backgroundColor: `${aboutBgColor.value}` }}
              theme="snow"
              value={aboutSection.title}
              onChange={(e) => onChangeSection('title', e)}
              placeholder={'Write something awesome...'}
              modules={quillSimpleModules}
            />
          </div>

          {aboutSection.subsections.map((subsection) => (
            <div key={subsection.id}>
              <div className="form__group w-full editor">
                <label className="form__label">Contenido</label>
                <ReactQuill
                  ref={quillRef2}
                  id={subsection.id}
                  style={{ backgroundColor: `${aboutBgColor.value}` }}
                  theme="snow"
                  value={subsection.content}
                  onChange={(e) =>
                    onChangeSubsection(
                      'content',
                      e,
                      aboutSection.id,
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
                  name={aboutBgColor.feature}
                  value={aboutBgColor.value}
                  onChange={(e) =>
                    onChangeSetting(e.target.name, e.target.value)
                  }
                />
                <input
                  type="text"
                  name={aboutBgColor.feature}
                  value={aboutBgColor.value}
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
                  name={aboutTextColor.feature}
                  value={aboutTextColor.value}
                  onChange={(e) =>
                    onChangeSetting(e.target.name, e.target.value)
                  }
                />
                <input
                  type="text"
                  name={aboutTextColor.feature}
                  value={aboutTextColor.value}
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
            {/* <div className="flex items-center gap-4 w-1/2">
              <div className="form__group w-full">
                <input
                  checked={
                    aboutBtn.aboutBtnShow.value === 'false' ? false : true
                  }
                  type="checkbox"
                  value=""
                  name={aboutBtn.aboutBtnShow.feature}
                  onChange={(e) =>
                    onChangeSetting(e.target.name, e.target.checked.toString())
                  }
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="main"
                  className="ml-2 text-sm font-medium text-gray-700 text"
                >
                  Botón CTA
                </label>
                <button
                  disabled={aboutBtn.aboutBtnShow.value === 'false'}
                  type="button"
                  onClick={() => openModalButton()}
                  className="btn__primary ml-4 disabled:bg-slate-400 disabled:cursor-default"
                >
                  Modificar botón
                </button>

              </div>
              <div className="form__group w-full">
              </div>
            </div> */}

            <div className="form__group w-full">
              <input
                checked={waveAboutShow?.value === 'false' ? false : true}
                type="checkbox"
                value=""
                id={waveAboutShow.feature}
                name={waveAboutShow.feature}
                onChange={(e) =>
                  onChangeSetting(e.target.name, e.target.checked.toString())
                }
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor={waveAboutShow.feature}
                className="ml-2 text-sm font-medium text-gray-700 text"
              >
                Wave
              </label>
              <button
                disabled={waveAboutShow.value === 'false'}
                type="button"
                onClick={() => openModalWave()}
                className="btn__primary ml-4 disabled:bg-slate-400 disabled:cursor-default"
              >
                Modificar wave
              </button>
            </div>
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
      <Modal isOpenModal={isOpenModal} closeModal={closeModal}>
        <Media handleSelect={handleSelect} />
      </Modal>
      <Modal isOpenModal={isOpenModalWave} closeModal={closeModalWave}>
        <WaveStyles
          wave={waveAbout}
          onChangeSetting={onChangeSetting}
          closeModalWave={closeModalWave}
          bg={aboutBgColor} // Color seccion actual
          waveColor={servicesBgColor} // Color siguiente seccion
          section="Sobre mi"
          nextSection="Servicios"
        />
      </Modal>
    </>
  );
};

export default AboutSection;
