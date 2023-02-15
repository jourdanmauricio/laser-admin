import useAddPicture from './useAddPicture';
import Spinner from '@/commons/Spinner/Spinner';

const AddPicture = ({ handleAddPict, post, error }) => {
  const { dragActive, loading, handleDrag, handleDrop, handleChange } =
    useAddPicture({ handleAddPict });
  return (
    <>
      {loading && <Spinner />}
      {post.image && (
        <>
          <div className="flex flex-col md:flex-row w-full gap-8">
            <div className="my-5 grid__image">
              <div className="w-[150px] self-center justify-center">
                <img
                  className="rounded border border-solid border-gray-400 w-[150px] object-contain aspect-square"
                  src={post.image}
                  alt=""
                />
              </div>
            </div>

            <div className="w-full">
              <div className="form__group">
                <label className="form_label">Alt Imágen</label>
                <input
                  onChange={(e) => handleAddPict(e.target.name, e.target.value)}
                  className="form__input border-gray-500 w-full"
                  type="text"
                  id="alt-image"
                  name="alt_image"
                  placeholder="Texto alternativo"
                  value={post.alt_image}
                />
                <p
                  className={`input__error ${
                    error.alt_image ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  {error.alt_image}
                </p>
              </div>

              <div className="form__group w-full">
                <label className="form_label">Imágen</label>
                <input
                  disabled
                  onChange={(e) => handleAddPict(e.target.name, e.target.value)}
                  className="form__input border-gray-500 w-full"
                  type="text"
                  id="image"
                  name="image"
                  placeholder="Imagen Resumen del post"
                  value={post.image}
                />
                <p
                  className={`input__error ${
                    error.image ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  {error.image}
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      <div
        className={`relative w-[80%] mx-auto p-8 text-center border-2 border-dotted border-black
        ${!dragActive ? '' : 'fileover'}`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onDragLeave={handleDrag}
      >
        <input
          onChange={handleChange}
          className="absolute cursor-pointer opacity-0 w-full h-full top-0 left-0"
          type="file"
        />
        <h3>Drag and drop file here or</h3>
        <br />
        <label className="ml-2.5 mt-10 text-white w-[183px] h-[44px] rounded-[21.5px] bg-red-600 py-2 px-4">
          Browse file
        </label>
      </div>
    </>
  );
};

export default AddPicture;
