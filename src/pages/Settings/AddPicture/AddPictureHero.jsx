import ReactQuill from 'react-quill';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { quillSimpleModules } from '../../../config/constants';
import { setSettings } from '../../../store/settings';
import { useDispatch, useSelector } from 'react-redux';

const AddPictureHero = ({ image }) => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { editSettings } = useSelector((state) => state.settings);
  const textHero = editSettings.find(
    (setting) => setting.feature === 'textHero'
  );
  const posHero = editSettings.find((setting) => setting.feature === 'posHero');

  const onClickSelImage = () => {
    navigate(`/media?type=${image.feature}`);
  };

  function firstCapital(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const handleChange = (value) => {
    console.log('value', value);
    dispatch(setSettings({ feature: 'textHero', value: value }));
  };

  const onMove = (position) => {
    dispatch(setSettings({ feature: 'posHero', value: position }));
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="form__group">
          <label className="form__label">{firstCapital(image.feature)}</label>
          <img
            className="inline-block min-w-[250px] min-h-[60px] rounded bg-cover bg-center border border-solid border-gray-300 shadow-[0_0_10px_rgba(0,0,0,0.1)] w-full max-h-screen"
            src={image.value}
            alt={image.feature}
          />
          <div
            className={`absolute text-center ${posHero.value} left-1/2 -translate-x-2/4 -translate-y-2/4 w-full p-10`}
          >
            <div
              className="relative ql-editor"
              dangerouslySetInnerHTML={{ __html: textHero.value }}
            />
          </div>
        </div>
      </div>

      <button
        onClick={onClickSelImage}
        type="button"
        className="btn__primary block mx-auto"
      >
        Seleccionar {firstCapital(image.feature)}
      </button>

      <div className="form__group w-full editor">
        <label className="form__label">Contenido</label>
        <ReactQuill
          theme="snow"
          value={textHero.value}
          onChange={handleChange}
          placeholder={'Write something awesome...'}
          modules={quillSimpleModules}
          // formats={formats}
        />
      </div>

      <button onClick={() => onMove('top-1/4')} className="btn__primary m-4">
        Arriba
      </button>
      <button onClick={() => onMove('top-1/2')} className="btn__primary m-4">
        centro
      </button>
      <button onClick={() => onMove('top-3/4')} className="btn__primary m-4">
        Abajo
      </button>
    </>
  );
};

export default AddPictureHero;
