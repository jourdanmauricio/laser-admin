import ReactQuill from 'react-quill';
import { quillSimpleModules } from '@/config/constants';
import { Modal } from '@/commons/Modal/Modal';
import Media from '@/components/Media/Media';
import Posts from './Posts/Posts';
import useBlogSection from './useBlogSection';
import WaveStyles from '@/components/WaveStyles/WaveStyles';
import ButtonStyles from '@/components/ButtonStyles/ButtonStyles';

const BlogSection = () => {
  const {
    actionPosts,
    blogSection,
    blogTextColor,
    button,
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
    isOpenModalBtnBlog,
    closeModalBtnBlog,
    openModalBtnBlog,
    setEditData,
    setDelError,
    onSubmit,
    onCancel,
    onChangeSection,
    onChangeSubsection,
    onChangeSetting,
    onChangeSetting2,
    handleSelect,
    onChangePost,
  } = useBlogSection();
  return (
    <>
      <form onSubmit={onSubmit} noValidate>
        {blogSection && blogBgColor && (
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

                <div className="border border-solid border-gray-300 bg-clinicBgColor h-20 w-full flex items-center justify-center">
                  {button.show.value === 'true' && (
                    <div
                      type="button"
                      className="border border-solid transition ease-in-out delay-100  hover:cursor-pointer btn__blog"
                    >
                      {button.text.value}
                    </div>
                  )}
                </div>

                {/* SECTION */}
                <div className="flex flex-col sm:flex-row sm:gap-10">
                  <div className="form__group w-full">
                    <label className="form__label">Background</label>
                    <div className="flex items-center gap-4">
                      <input
                        className="form__input--color w-full border-gray-500"
                        type="color"
                        name={blogBgColor.feature}
                        value={blogBgColor.value}
                        onChange={(e) =>
                          onChangeSetting(e.target.name, e.target.value)
                        }
                      />
                      <input
                        type="text"
                        name={blogBgColor.feature}
                        value={blogBgColor.value}
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
                        name={blogTextColor.feature}
                        value={blogTextColor.value}
                        onChange={(e) =>
                          onChangeSetting(e.target.name, e.target.value)
                        }
                      />
                      <input
                        type="text"
                        name={blogTextColor.feature}
                        value={blogTextColor.value}
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
                      checked={button.show.value === 'false' ? false : true}
                      type="checkbox"
                      value=""
                      name={button.show.feature}
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
                      Botón CTA
                    </label>
                    <button
                      disabled={button.show.value === 'false'}
                      type="button"
                      onClick={() => openModalBtnBlog()}
                      className="btn__primary ml-4 disabled:bg-slate-400 disabled:cursor-default"
                    >
                      Modificar botón
                    </button>
                  </div>

                  <div className="flex items-center gap-4 w-full">
                    <div className="form__group w-full">
                      <input
                        checked={waveBlogShow?.value === 'false' ? false : true}
                        type="checkbox"
                        value=""
                        id={waveBlogShow.feature}
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
                        htmlFor={waveBlogShow.feature}
                        className="ml-2 text-sm font-medium text-gray-700 text"
                      >
                        Wave
                      </label>
                      <button
                        disabled={waveBlogShow.value === 'false'}
                        type="button"
                        onClick={() => openModalWave()}
                        className="btn__primary ml-4 disabled:bg-slate-400 disabled:cursor-default"
                      >
                        Modificar wave
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}

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
      {isOpenModalBtnBlog && (
        <Modal isOpenModal={isOpenModalBtnBlog} closeModal={closeModalBtnBlog}>
          <ButtonStyles
            button={button}
            onChangeSetting2={onChangeSetting2}
            closeModal={closeModalBtnBlog}
          />
        </Modal>
      )}
      <Modal isOpenModal={isOpenModal} closeModal={closeModal}>
        <Media handleSelect={handleSelect} />
      </Modal>

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
    </>
  );
};

export default BlogSection;
