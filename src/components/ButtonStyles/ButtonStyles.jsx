import SelectOptions from '@/commons/SelectOptions/SelectOptions';

import { Link } from 'react-router-dom';
import { FaPaintBrush } from 'react-icons/fa';

const ButtonStyles = ({
  text,
  textColor,
  textColorHover,
  bg,
  bgHover,
  borderColor,
  borderColorHover,
  tlRadius,
  trRadius,
  blRadius,
  brRadius,
  shadow,
  link,
  onChangeSetting,
  closeModalButton,
}) => {
  document.documentElement.style.setProperty(
    '--btnTextColor',
    `${textColor.value}`
  );
  document.documentElement.style.setProperty(
    '--btnTextColorHover',
    `${textColorHover.value}`
  );
  document.documentElement.style.setProperty('--btnBg', `${bg.value}`);
  document.documentElement.style.setProperty(
    '--btnBgHover',
    `${bgHover.value}`
  );
  document.documentElement.style.setProperty(
    '--btnTlRadius',
    `${tlRadius.value}`
  );
  document.documentElement.style.setProperty(
    '--btnTrRadius',
    `${trRadius.value}`
  );
  document.documentElement.style.setProperty(
    '--btnBlRadius',
    `${blRadius.value}`
  );
  document.documentElement.style.setProperty(
    '--btnBrRadius',
    `${brRadius.value}`
  );
  document.documentElement.style.setProperty(
    '--btnBorderColor',
    `${borderColor.value}`
  );
  document.documentElement.style.setProperty(
    '--btnBorderColorHover',
    `${borderColorHover.value}`
  );
  document.documentElement.style.setProperty('--btnShadow', `${shadow.value}`);

  return (
    <div className="p-10">
      <div className="bg-clinicBgColor h-20 w-full flex items-center justify-center">
        <div className="border border-solid px-4 py-2 transition ease-in-out delay-100  hover:cursor-pointer btn__settings">
          {text.value}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row sm:gap-10">
        <div className="form__group w-full">
          <label className="form__label">Texto</label>
          <input
            className="form__input border-gray-500 text-sm"
            type="text"
            name={text.feature}
            onChange={(e) => onChangeSetting(e.target.name, e.target.value)}
            placeholder="Texto del botón"
            value={text.value}
          />
        </div>
        <div className="form__group w-full">
          <SelectOptions
            label={'Link'}
            name={link.feature}
            onHandleChange={onChangeSetting}
            value={link.value}
          />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row sm:gap-10">
        <div className="mt-1 form__group w-full">
          <label className="form__label">Color de fondo</label>
          <div className="flex items-center gap-4">
            <input
              className="form__input--color w-full border-gray-500"
              type="color"
              name={bg.feature}
              value={bg.value}
              onChange={(e) => onChangeSetting(e.target.name, e.target.value)}
            />
            <input
              type="text"
              value={bg.value}
              name={bg.feature}
              placeholder="#531253"
              className="form__input border-gray-500"
              onChange={(e) => onChangeSetting(e.target.name, e.target.value)}
            />
          </div>
        </div>
        <div className="mt-1 form__group w-full">
          <label className="form__label">Color hover de fondo</label>
          <div className="flex items-center gap-4">
            <input
              className="form__input--color w-full border-gray-500"
              type="color"
              name={bgHover.feature}
              value={bgHover.value}
              onChange={(e) => onChangeSetting(e.target.name, e.target.value)}
            />
            <input
              type="text"
              name={bgHover.feature}
              placeholder="#531253"
              value={bgHover.value}
              className="form__input border-gray-500"
              onChange={(e) => onChangeSetting(e.target.name, e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row sm:gap-10">
        <div className="mt-1 form__group w-full">
          <label className="form__label">Color del texto</label>
          <div className="flex items-center gap-4">
            <input
              className="form__input--color w-full border-gray-500"
              type="color"
              name={textColor.feature}
              value={textColor.value}
              onChange={(e) => onChangeSetting(e.target.name, e.target.value)}
            />
            <input
              type="text"
              name={textColor.feature}
              placeholder="#531253"
              value={textColor.value}
              className="form__input border-gray-500"
              onChange={(e) => onChangeSetting(e.target.name, e.target.value)}
            />
          </div>
        </div>
        <div className="mt-1 form__group w-full">
          <label className="form__label">Color hover del texto</label>
          <div className="flex items-center gap-4">
            <input
              className="form__input--color w-full border-gray-500"
              type="color"
              name={textColorHover.feature}
              value={textColorHover.value}
              onChange={(e) => onChangeSetting(e.target.name, e.target.value)}
            />
            <input
              type="text"
              name={textColorHover.feature}
              placeholder="#531253"
              value={textColorHover.value}
              className="form__input border-gray-500"
              onChange={(e) => onChangeSetting(e.target.name, e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row sm:gap-10">
        <div className="mt-1 form__group w-full">
          <label className="form__label">Color del borde</label>
          <div className="flex items-center gap-4">
            <input
              className="form__input--color w-full border-gray-500"
              type="color"
              name={borderColor.feature}
              value={borderColor.value}
              onChange={(e) => onChangeSetting(e.target.name, e.target.value)}
            />
            <input
              type="text"
              name={borderColor.feature}
              placeholder="#531253"
              value={borderColor.value}
              className="form__input border-gray-500"
              onChange={(e) => onChangeSetting(e.target.name, e.target.value)}
            />
          </div>
        </div>
        <div className="mt-1 form__group w-full">
          <label className="form__label">Color hover del borde</label>
          <div className="flex items-center gap-4">
            <input
              className="form__input--color w-full border-gray-500"
              type="color"
              name={borderColor.feature}
              value={borderColor.value}
              onChange={(e) => onChangeSetting(e.target.name, e.target.value)}
            />
            <input
              type="text"
              name={borderColor.feature}
              placeholder="#531253"
              value={borderColor.value}
              className="form__input border-gray-500"
              onChange={(e) => onChangeSetting(e.target.name, e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row sm:gap-10">
        <div className="mt-1 form__group w-full">
          <label className="form__label">
            Border Radius sup izq / inf izq / inf der / sup der
          </label>
          <div className="flex items-center gap-4">
            <input
              className="form__input w-16 border-gray-500 text-sm"
              type="number"
              name={trRadius.feature}
              onChange={(e) =>
                onChangeSetting(e.target.name, e.target.value + 'px')
              }
              min="0"
              placeholder="Forma de la wave"
              value={trRadius.value.replace('px', '')}
            />
            <input
              className="form__input w-16 border-gray-500 text-sm"
              type="number"
              name={brRadius.feature}
              onChange={(e) =>
                onChangeSetting(e.target.name, e.target.value + 'px')
              }
              min="0"
              placeholder="Forma de la wave"
              value={brRadius.value.replace('px', '')}
            />
            <input
              className="form__input w-16 border-gray-500 text-sm"
              type="number"
              name={blRadius.feature}
              onChange={(e) =>
                onChangeSetting(e.target.name, e.target.value + 'px')
              }
              min="0"
              placeholder="Forma de la wave"
              value={blRadius.value.replace('px', '')}
            />
            <input
              className="form__input w-16 border-gray-500 text-sm"
              type="number"
              name={tlRadius.feature}
              onChange={(e) =>
                onChangeSetting(e.target.name, e.target.value + 'px')
              }
              min="0"
              placeholder="Forma de la wave"
              value={tlRadius.value.replace('px', '')}
            />
          </div>
        </div>
        <div className="mt-1 form__group w-full">
          <label className="form__label">Sombra del botón</label>
          <Link
            className="input__icon top-6"
            to="https://cssgenerator.org/box-shadow-css-generator.html"
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <FaPaintBrush />
          </Link>

          <input
            className="form__input border-gray-500 text-sm"
            type="text"
            name={shadow.feature}
            onChange={(e) => onChangeSetting(e.target.name, e.target.value)}
            placeholder="Forma de la wave"
            value={shadow.value}
          />
        </div>
      </div>
      <button
        onClick={closeModalButton}
        type="button"
        className="mt-4 btn__primary block ml-auto"
      >
        Cerrar
      </button>
    </div>
  );
};

export default ButtonStyles;
