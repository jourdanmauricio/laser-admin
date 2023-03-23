import Message from '@/commons/Message/Message';
import ReactQuill from 'react-quill';
import { quillSimpleModules } from '@/config/constants';
import { Modal } from '@/commons/Modal/Modal';
import Media from '@/components/Media/Media';
import usePost from './usePost';
import AddPicture from '@/components/AddPicture/AddPicture';

const Post = ({ editData, errorField, onChangePost }) => {
  const {
    post,
    error,
    modules,
    isOpenModal,
    closeModal,
    quillRef,
    quillRef2,
    pagePost,
    closeMessage,
    onBlurTitle,
    handleSelect,
    onContent,
  } = usePost({
    editData,
    onChangePost,
  });

  return (
    <>
      <div>
        {post && (
          <div className="bg-white p-5 flex justify-center items-center flex-col">
            {error && <Message msg={error} closeMessage={closeMessage} />}

            <div className="form__group w-full editor">
              <label className="form__label">Título</label>
              <ReactQuill
                ref={quillRef}
                style={{ backgroundColor: `${pagePost.bgColor.value}` }}
                theme="snow"
                value={post.title}
                onChange={(e) => onContent('title', e)}
                onBlur={(e) => onBlurTitle(e)}
                placeholder={'Haz tu magia...'}
                modules={quillSimpleModules}
              />
            </div>

            <div className="flex flex-col md:flex-row justify-start items-start md:items-center gap-4 md:gap-8 w-full">
              <div className="form__group w-full md:w-3/5">
                <label className="form__label">Slug</label>
                <input
                  onChange={(e) => onChangePost(e.target.name, e.target.value)}
                  className="form__input border-gray-500 w-full"
                  type="text"
                  id="slug"
                  name="slug"
                  placeholder="Url del post"
                  value={post.slug}
                />
                <p
                  className={`input__error ${
                    errorField.slug ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  {errorField.slug}
                </p>
              </div>
              <div className="form__group w-full md:w-1/5 mt-0 md:mt-4">
                <input
                  checked={post.main}
                  id="main"
                  type="checkbox"
                  value=""
                  name="main"
                  onChange={(e) =>
                    onChangePost(e.target.name, e.target.checked)
                  }
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="main"
                  className="ml-2 text-sm font-medium text-gray-700 text"
                >
                  Página principal
                </label>
              </div>
              <div className="form__group w-full md:w-1/5 ">
                <label className="form__label">Orden</label>
                <input
                  onChange={(e) => onChangePost(e.target.name, e.target.value)}
                  className="form__input border-gray-500 w-full"
                  type="number"
                  id="order"
                  min="1"
                  name="order"
                  placeholder="Orden en blog page"
                  value={post.order}
                />
              </div>
            </div>

            <div className="form__group w-full">
              <label className="form__label">Resumen</label>
              <textarea
                onChange={(e) => onChangePost(e.target.name, e.target.value)}
                className="form__input border-gray-500 w-full"
                type="text"
                id="resume"
                name="resume"
                rows={3}
                placeholder="Resumen del post"
                value={post.resume}
              ></textarea>
              <p
                className={`input__error ${
                  errorField.resume ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {errorField.resume}
              </p>
            </div>

            <AddPicture
              handleChangeImage={onChangePost}
              error={errorField}
              container={post}
            />

            <div className="form__group w-full editor">
              <label className="form__label">Contenido</label>
              <ReactQuill
                ref={quillRef2}
                style={{ backgroundColor: `${pagePost.bgColor.value}` }}
                theme="snow"
                value={post.content}
                onChange={(e) => onContent('content', e)}
                placeholder={'Haz tu magia...'}
                modules={modules}
              />
            </div>
          </div>
        )}
      </div>
      <Modal isOpenModal={isOpenModal} closeModal={closeModal}>
        <Media handleSelect={handleSelect} />
      </Modal>
    </>
  );
};

export default Post;
