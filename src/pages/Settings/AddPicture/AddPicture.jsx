import { useNavigate } from 'react-router-dom';

const AddPicture = ({ logoImage }) => {
  let navigate = useNavigate();

  const onClickSelImage = () => {
    navigate(`/media?type=${logoImage.feature}`);
  };

  function firstCapital(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="form__group p-0 mt-8">
          <label className="form__label">
            {firstCapital(logoImage.feature)}
          </label>
          <img
            className="inline-block min-w-[250px] w-[300px] h-[50px] max-h-[60px] rounded bg-cover bg-center border border-solid border-gray-300 shadow-[0_0_10px_rgba(0,0,0,0.1)]"
            src={logoImage.value}
            alt={logoImage.feature}
          />
        </div>

        <button
          onClick={onClickSelImage}
          type="button"
          className="btn__primary"
        >
          Seleccionar {firstCapital(logoImage.feature)}
        </button>
      </div>
    </>
  );
};

export default AddPicture;
