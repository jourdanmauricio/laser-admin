import ReactQuill from 'react-quill';
import { quillSimpleModules } from '@/config/constants';
import { Modal } from '@/commons/Modal/Modal';
import Media from '@/components/Media/Media';
import useAboutSection from './useAboutSection';
// import WaveSettings from '@/commons/WaveSettings/WaveSettings';
import WaveStyles from '@/components/WaveStyles/WaveStyles';

const AboutSection = () => {
  const {
    aboutSection,
    quillRef,
    aboutBgColor,
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
      {aboutSection && (
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
          <div className="form__group">
            <label className="form__label">Color fondo sección</label>
            <div className="flex items-center gap-4">
              <input
                className="form__input--color w-full border-gray-500"
                type="color"
                name="aboutBgColor"
                value={aboutBgColor.value}
                onChange={(e) => onChangeSetting(e.target.name, e.target.value)}
              />
              <input
                type="text"
                value={aboutBgColor.value}
                name="aboutBgColor"
                placeholder="#531253"
                className="form__input border-gray-500"
                onChange={(e) => onChangeSetting(e.target.name, e.target.value)}
              />
            </div>
          </div>

          {/* WAVE */}
          <div className="flex">
            <div className="form__group w-full">
              <input
                checked={waveAboutShow?.value === 'false' ? false : true}
                type="checkbox"
                value=""
                name={waveAboutShow.feature}
                onChange={(e) =>
                  onChangeSetting(e.target.name, e.target.checked.toString())
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
