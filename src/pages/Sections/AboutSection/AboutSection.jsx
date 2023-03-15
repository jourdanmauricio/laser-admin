import ReactQuill from 'react-quill';
import { quillSimpleModules } from '@/config/constants';
import { Modal } from '@/commons/Modal/Modal';
import Media from '@/components/Media/Media';
import useAboutSection from './useAboutSection';
import WaveSettings from '@/commons/WaveSettings/WaveSettings';

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
              <Modal isOpenModal={isOpenModal} closeModal={closeModal}>
                <Media handleSelect={handleSelect} />
              </Modal>
            </div>
          ))}
          <div className="mt-8 form__group">
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

          <WaveSettings
            waveShow={waveAboutShow}
            wave={waveAbout}
            onChangeWave={onChangeSetting}
          />

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
