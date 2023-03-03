import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { setSettings } from '@/store/settings';

const General = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState();

  const { editSettings } = useSelector((state) => state.settings);
  const bodyBgColor = editSettings.find(
    (setting) => setting.feature === 'bodyBgColor'
  );
  const h1Color = editSettings.find((setting) => setting.feature === 'h1Color');
  const h2Color = editSettings.find((setting) => setting.feature === 'h2Color');
  const h3Color = editSettings.find((setting) => setting.feature === 'h3Color');
  const paragraphColor = editSettings.find(
    (setting) => setting.feature === 'paragraphColor'
  );
  const h1Pos = editSettings.find((setting) => setting.feature === 'h1Pos');
  const h2Pos = editSettings.find((setting) => setting.feature === 'h2Pos');
  const h3Pos = editSettings.find((setting) => setting.feature === 'h3Pos');
  const paragraphPos = editSettings.find(
    (setting) => setting.feature === 'paragraphPos'
  );
  document.documentElement.style.setProperty(
    '--bodyBgColor',
    bodyBgColor.value
  );
  document.documentElement.style.setProperty('--h1Color', h1Color.value);
  document.documentElement.style.setProperty('--h2Color', h2Color.value);
  document.documentElement.style.setProperty('--h3Color', h3Color.value);
  document.documentElement.style.setProperty('--h1Pos', h1Pos.value);
  document.documentElement.style.setProperty('--h2Pos', h2Pos.value);
  document.documentElement.style.setProperty('--h3Pos', h3Pos.value);

  const handleChange = (feature, value) => {
    dispatch(setSettings({ feature, value }));
  };

  return (
    <>
      <div className="bg-bodyBgColor px-5 pb-5 mt-5 border border-gray-400">
        <h2 className={`text-h2Color`}>Título ejemplo</h2>
        {/* ${h2Pos.value} */}
        <p>
          Parrafo ejemplo... Lorem ipsum dolor sit amet consectetur, adipisicing
          elit. Nihil ipsam fuga beatae quo est temporibus quae quidem
          architecto minus vel. Vel, quo saepe debitis tempora nihil voluptas
          expedita ducimus perferendis!
        </p>
        <h3>Sub título ejemplo</h3>
        <p className="mt-5">
          Parrafo ejemplo... Lorem ipsum dolor sit amet consectetur, adipisicing
          elit. Nihil ipsam fuga beatae quo est temporibus quae quidem
          architecto minus vel. Vel, quo saepe debitis tempora nihil voluptas
          expedita ducimus perferendis!
        </p>
        <p className="mt-5">
          Parrafo ejemplo... Lorem ipsum dolor sit amet consectetur, adipisicing
          elit. Nihil ipsam fuga beatae quo est temporibus quae quidem
          architecto minus vel. Vel, quo saepe debitis tempora nihil voluptas
          expedita ducimus perferendis!
        </p>
      </div>
      <hr className="mt-8" />
      <div className="mt-8 form__group">
        <label className="form__label">Color fondo página</label>
        <div className="flex items-center gap-4">
          <input
            className="form__input--color w-full border-gray-500"
            type="color"
            name="bodyBgColor"
            value={bodyBgColor.value}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
          />
          <input
            type="text"
            value={bodyBgColor.value}
            name="bodyBgColor"
            placeholder="#531253"
            className="form__input border-gray-500"
            onChange={(e) => handleChange(e.target.name, e.target.value)}
          />
        </div>
      </div>
      <hr />
      <p>Título</p>
      <div className="flex flex-col sm:flex-row sm:gap-20">
        <div className="form__group w-full">
          <label className="form__label">Color Título</label>
          <div className="flex items-center gap-4">
            <input
              className="form__input--color w-full border-gray-500"
              type="color"
              name="h2Color"
              value={h2Color.value}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
            <input
              type="text"
              value={h2Color.value}
              name="h2Color"
              placeholder="#531253"
              className="form__input border-gray-500"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
          </div>
        </div>
        <div className="form__group w-full">
          <label className="form__label">Posición Título</label>
          <select
            name="h2Pos"
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            className="form__input border-gray-500"
            value={h2Pos.value}
          >
            <option value="left">Izquierda</option>
            <option value="center">Centrado</option>
            <option value="right">Derecha</option>
          </select>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row sm:gap-20">
        <div className="form__group w-full">
          <label className="form__label">Decoración</label>
          <select
            name="h2Pos"
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            className="form__input border-gray-500"
            value={h2Pos.value}
          >
            <option value="normal">Normal</option>
            <option value="italic">Cursiva</option>
          </select>
        </div>

        <div className="form__group w-full">
          <label className="form__label">Posición Título</label>
          <select
            name="h2Pos"
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            className="form__input border-gray-500"
            value={h2Pos.value}
          >
            <option value="left">Izquierda</option>
            <option value="center">Centrado</option>
            <option value="right">Derecha</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default General;
