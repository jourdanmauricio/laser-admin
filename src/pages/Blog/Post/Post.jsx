import ReactQuill from 'react-quill';
import AddPicture from '../AddPicture/AddPicture';
import usePost from './usePost';
import { Modal } from '@/commons/Modal/Modal';
import Media from '@/components/Media/Media';

const Post = () => {
  const {
    action,
    editPost,
    error,
    isOpenModal,
    closeModal,
    quillRef,
    modules,
    onContent,
    onChange,
    onSubmit,
    onCancelPost,
    imageHandler,
    handleSelect,
    onBlurTitle,
  } = usePost();

  return (
    <div>
      <form
        onSubmit={onSubmit}
        className="bg-white p-5 flex justify-center items-center flex-col"
      >
        <div className="flex flex-col sm:flex-row justify-start items-start sm:items-center gap-4 sm:gap-8 w-full">
          <div className="form__group w-full sm:w-3/4 ">
            <label className="form__label">Título</label>
            <input
              onChange={(e) => onChange(e.target.name, e.target.value)}
              onBlur={(e) => onBlurTitle(e.target.value)}
              className="form__input border-gray-500 w-full"
              type="text"
              id="title"
              name="title"
              placeholder="Título de post"
              value={editPost.title}
            />
            <p
              className={`input__error ${
                error.title ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {error.title}
            </p>
          </div>
          <div className="form__group w-full sm:w-1/4 ">
            <label className="form__label">Orden</label>
            <input
              onChange={(e) => onChange(e.target.name, e.target.value)}
              className="form__input border-gray-500 w-full"
              type="number"
              id="order"
              min="1"
              name="order"
              placeholder="Orden en blog page"
              value={editPost.order}
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-start items-start sm:items-center gap-4 sm:gap-8 w-full">
          <div className="form__group w-full sm:w-3/4">
            <label className="form__label">Slug</label>
            <input
              onChange={(e) => onChange(e.target.name, e.target.value)}
              className="form__input border-gray-500 w-full"
              type="text"
              id="slug"
              name="slug"
              placeholder="Url del post"
              value={editPost.slug}
            />
            <p
              className={`input__error ${
                error.slug ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {error.slug}
            </p>
          </div>
          <div className="form__group w-full sm:w-1/4 mt-0 sm:mt-4">
            <input
              checked={editPost.main}
              id="main"
              type="checkbox"
              value=""
              name="main"
              onChange={(e) => onChange(e.target.name, e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="main"
              className="ml-2 text-sm font-medium text-gray-700 text"
            >
              Página principal
            </label>
          </div>
        </div>

        <div className="form__group w-full">
          <label className="form__label">Resumen</label>
          <textarea
            onChange={(e) => onChange(e.target.name, e.target.value)}
            className="form__input border-gray-500 w-full"
            type="text"
            id="resume"
            name="resume"
            rows={3}
            placeholder="Resumen del post"
            value={editPost.resume}
          ></textarea>
          <p
            className={`input__error ${
              error.resume ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {error.resume}
          </p>
        </div>

        <AddPicture handleAddPict={onChange} error={error} />

        <div className="form__group w-full editor">
          <label className="form__label">Contenido</label>
          <ReactQuill
            ref={quillRef}
            theme="snow"
            value={editPost.content}
            onChange={onContent}
            placeholder={'Haz tu magia...'}
            modules={modules}
          />
        </div>

        <div className="actions">
          <button
            onClick={onCancelPost}
            className="mt-8 btn__secondary"
            type="button"
          >
            Cancelar
          </button>

          <button className="mt-8 btn__primary" type="submit">
            {action === 'NEW' ? 'Crear post' : 'Editar Post'}
          </button>
        </div>
      </form>

      <Modal isOpenModal={isOpenModal} closeModal={closeModal}>
        <Media handleSelect={handleSelect} />
      </Modal>
    </div>
  );
};

export default Post;
