import ReactQuill from 'react-quill';
import { quillSimpleModules } from '@/config/constants';
import { Modal } from '@/commons/Modal/Modal';
import Media from '@/components/Media/Media';
import Posts from './Posts/Posts';
import useBlogSection from './useBlogSection';
import WaveSettings from '@/commons/WaveSettings/WaveSettings';
import WaveStyles from '@/components/WaveStyles/WaveStyles';

const BlogSection = () => {
  const {
    actionPosts,
    blogSection,
    quillRef,
    quillRef2,
    blogBgColor,
    modules,
    isOpenModal,
    closeModal,
    editData,
    errorField,
    waveBlogShow,
    waveBlog,
    isOpenModalWave,
    openModalWave,
    closeModalWave,
    clinicBgColor,
    setEditData,
    setDelError,
    onSubmit,
    onCancel,
    onChangeSection,
    onChangeSubsection,
    onChangeSetting,
    handleSelect,
    onChangePost,
  } = useBlogSection();
  return (
    <>
      <form onSubmit={onSubmit} noValidate>
        {blogSection && (
          <>
            <div className="form__group w-full">
              <label className="form__label">Título</label>
              <ReactQuill
                ref={quillRef}
                id={blogSection.id}
                style={{ backgroundColor: `${blogBgColor.value}` }}
                theme="snow"
                value={blogSection.title}
                onChange={(e) => onChangeSection('title', e)}
                placeholder={'Write something awesome...'}
                modules={quillSimpleModules}
              />
            </div>

            {blogSection.subsections.map((subsection) => (
              <div key={subsection.id}>
                <div className="form__group w-full editor">
                  <label className="form__label">Contenido</label>
                  <ReactQuill
                    ref={quillRef2}
                    id={subsection.id}
                    style={{ backgroundColor: `${blogBgColor.value}` }}
                    theme="snow"
                    value={subsection.content}
                    onChange={(e) =>
                      onChangeSubsection(
                        'content',
                        e,
                        blogSection.id,
                        subsection.id
                      )
                    }
                    placeholder={'Write something awesome...'}
                    modules={modules}
                  />
                </div>

                <div className="form__group w-full">
                  <label className="form__label">Color fondo sección</label>
                  <div className="flex items-center gap-4">
                    <input
                      className="form__input--color w-full border-gray-500"
                      type="color"
                      name="blogBgColor"
                      value={blogBgColor.value}
                      onChange={(e) =>
                        onChangeSetting(e.target.name, e.target.value)
                      }
                    />
                    <input
                      type="text"
                      value={blogBgColor.value}
                      name="blogBgColor"
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
                      checked={waveBlogShow?.value === 'false' ? false : true}
                      type="checkbox"
                      value=""
                      name={waveBlogShow.feature}
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

                <Modal isOpenModal={isOpenModal} closeModal={closeModal}>
                  <Media handleSelect={handleSelect} />
                </Modal>
              </div>
            ))}
          </>
        )}

        <Modal isOpenModal={isOpenModalWave} closeModal={closeModalWave}>
          <WaveStyles
            wave={waveBlog}
            onChangeSetting={onChangeSetting}
            closeModalWave={closeModalWave}
            bg={blogBgColor} // Color seccion actual
            waveColor={clinicBgColor} // Color siguiente seccion
            section="Entradas destacadas"
            nextSection="Consultorios"
          />
        </Modal>

        <hr />

        <Posts
          errorField={errorField}
          onChangePost={onChangePost}
          editData={editData}
          setEditData={setEditData}
          setDelError={setDelError}
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
            {actionPosts === 'NEW' ? 'Crear' : 'Modificar'}
          </button>
        </div>
      </form>
    </>
  );
};

export default BlogSection;
