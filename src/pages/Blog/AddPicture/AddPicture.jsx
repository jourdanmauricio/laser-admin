import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setEditPost } from '../../../store/posts';

const AddPicture = ({ post, error }) => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const onClickSelImage = () => {
    console.log('Sel Image');
    navigate('/media?type=post');
  };

  const handleEditPost = (name, value) => {
    dispatch(setEditPost({ name, value }));
  };

  return (
    <>
      {/* {post && ( */}
      <>
        <div className="flex flex-col md:flex-row w-full gap-8">
          <div className="my-5 grid__image">
            <div className="w-[150px] self-center justify-center mx-auto">
              <img
                className="rounded border border-solid border-gray-400 w-[150px]  object-contain aspect-square"
                src={post?.image}
                alt=""
              />
            </div>
            <button
              onClick={onClickSelImage}
              type="button"
              className="btn__primary"
            >
              Seleccionar imagen
            </button>
          </div>

          <div className="w-full">
            <div className="form__group">
              <label className="form__label">Alt Imágen</label>
              <input
                onChange={(e) => handleEditPost(e.target.name, e.target.value)}
                className="form__input border-gray-500 w-full"
                type="text"
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
              <label className="form__label">Imágen</label>
              <input
                disabled
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
      {/* )} */}
    </>
  );
};

export default AddPicture;
