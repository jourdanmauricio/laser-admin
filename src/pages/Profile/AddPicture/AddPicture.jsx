import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setEditPost } from '../../../store/posts';

const AddPicture = ({ profile, error }) => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const onClickSelImage = () => {
    console.log('Sel Image');
    navigate('/media?type=profile');
  };

  const handleEditPost = (name, value) => {
    dispatch(setEditPost({ name, value }));
  };

  return (
    <div className="flex flex-col w-full gap-8">
      <div
        className="mt-5 inline-block mx-auto w-40 h-40 rounded-full bg-cover bg-center border border-solid border-gray-300 shadow-[0_0_10px_rgba(0,0,0,0.1)]"
        style={{ backgroundImage: `url('${profile.image}')` }}
      />

      <button
        onClick={onClickSelImage}
        type="button"
        className="btn__primary block mx-auto"
      >
        Seleccionar imagen
      </button>
    </div>
  );
};

export default AddPicture;
