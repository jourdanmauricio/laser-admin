import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import { quillSimpleModules } from '@/config/constants';
import { setSettings } from '@/store/settings';

const AddPictureHero = ({ heroImage }) => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { editSettings } = useSelector((state) => state.settings);
  const heroText = editSettings.find(
    (setting) => setting.feature === 'heroText'
  );
  const heroPos = editSettings.find((setting) => setting.feature === 'heroPos');
  const heroOpacity = editSettings.find(
    (setting) => setting.feature === 'heroOpacity'
  );

  const onClickSelImage = () => {
    navigate(`/media?type=${heroImage.feature}`);
  };

  function firstCapital(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const handleChange = (feature, value) => {
    dispatch(setSettings({ feature, value }));
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="form__group">
          <label className="form__label">
            {firstCapital(heroImage.feature)}
          </label>
          <img
            className="inline-block min-w-[250px] min-h-[60px] rounded bg-cover bg-center border border-solid border-gray-300 shadow-[0_0_10px_rgba(0,0,0,0.1)] w-full max-h-screen"
            src={heroImage.value}
            alt={heroImage.feature}
          />
          <div
            className={`absolute w-full top-8 bottom-4 bg-black rounded
          ${
            heroOpacity.value === '10'
              ? 'opacity-10'
              : heroOpacity.value === '20'
              ? 'opacity-20'
              : heroOpacity.value === '30'
              ? 'opacity-30'
              : heroOpacity.value === '40'
              ? 'opacity-40'
              : heroOpacity.value === '50'
              ? 'opacity-50'
              : heroOpacity.value === '60'
              ? 'opacity-60'
              : heroOpacity.value === '70'
              ? 'opacity-70'
              : heroOpacity.value === '80'
              ? 'opacity-80'
              : heroOpacity.value === '90'
              ? 'opacity-90'
              : heroOpacity.value === '100'
              ? 'opacity-100'
              : 'opacity-0'
          }`}
          ></div>
          <div
            className={`absolute text-center ${heroPos.value} left-1/2 -translate-x-2/4 -translate-y-2/4 w-full p-10`}
          >
            <div
              className="relative ql-editor"
              dangerouslySetInnerHTML={{ __html: heroText.value }}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <input
            type="range"
            id="heroOpacity"
            name="heroOpacity"
            min="0"
            max="100"
            value={heroOpacity.value}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            step="10"
          />
          <label className="ml-4" htmlFor="heroOpacity">
            Opacidad
          </label>
        </div>
        <button
          onClick={onClickSelImage}
          type="button"
          className="btn__primary"
        >
          Seleccionar {firstCapital(heroImage.feature)}
        </button>
      </div>

      <div className="form__group w-full editor">
        <label className="form__label">Contenido</label>
        <ReactQuill
          className="bg-gray-800"
          theme="snow"
          value={heroText.value}
          name="heroText"
          onChange={(e) => handleChange('heroText', e)}
          placeholder={'Write something awesome...'}
          modules={quillSimpleModules}
          // formats={formats}
        />
      </div>

      <button
        onClick={() => handleChange('heroPos', 'top-1/4')}
        className="btn__primary m-4"
      >
        Texto Arriba
      </button>
      <button
        onClick={() => handleChange('heroPos', 'top-1/2')}
        className="btn__primary m-4"
      >
        Texo centrado
      </button>
      <button
        onClick={() => handleChange('heroPos', 'top-3/4')}
        className="btn__primary m-4"
      >
        Texto Abajo
      </button>
    </>
  );
};

export default AddPictureHero;
