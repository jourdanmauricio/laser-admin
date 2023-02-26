import { useNavigate } from 'react-router-dom';

const AddPicture = ({ image }) => {
  let navigate = useNavigate();

  const onClickSelImage = () => {
    navigate(`/media?type=${image.feature}`);
  };

  function firstCapital(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <div className="flex justify-center">
      <div className="form__group">
        <label className="form__label">{firstCapital(image.feature)}</label>
        <img
          className="inline-block min-w-[250px] min-h-[60px] rounded bg-cover bg-center border border-solid border-gray-300 shadow-[0_0_10px_rgba(0,0,0,0.1)]"
          src={image.value}
          alt={image.feature}
        />
      </div>

      <button
        onClick={onClickSelImage}
        type="button"
        className="btn__primary block mx-auto"
      >
        Seleccionar {firstCapital(image.feature)}
      </button>
    </div>
  );
};

export default AddPicture;
