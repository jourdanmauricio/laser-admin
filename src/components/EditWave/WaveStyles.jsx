import { FaPaintBrush } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const WaveStyles = ({
  wave,
  onChangeSetting,
  closeModalWave,
  waveColor,
  bg,
  section,
  nextSection,
}) => {
  document.documentElement.style.setProperty(
    '--waveColor',
    `${waveColor?.value}`
  );
  document.documentElement.style.setProperty('--waveBgColor', `${bg?.value}`);

  return (
    <>
      {wave && (
        <>
          <div className="relative mt-10 min-h-[250px] wave__settings w-full">
            <div className="absolute bottom-0 h-[100px] left-0 w-full overflow-hidden">
              <svg
                viewBox="0 0 500 150"
                preserveAspectRatio="none"
                className="h-full w-full"
              >
                <path d={wave.value} className="wave__settings--path"></path>
              </svg>
            </div>

            <span className="bg-white p-1 text-black absolute left-2 top-2">
              {section}
            </span>

            <span className="bg-white p-1 text-black absolute left-2 bottom-2">
              {nextSection}
            </span>
          </div>
          <div className="p-10">
            <div className="mt-1 form__group w-full">
              <label className="form__label">Forma</label>
              <Link
                className="input__icon top-6"
                to="https://smooth.ie/blogs/news/svg-wavey-transitions-between-sections"
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                <FaPaintBrush />
              </Link>

              <input
                className="form__input border-gray-500 text-sm"
                type="text"
                name={wave.feature}
                onChange={(e) => onChangeSetting(e.target.name, e.target.value)}
                placeholder="Forma de la wave"
                value={wave.value}
              />
            </div>
            <button
              onClick={closeModalWave}
              type="button"
              className="mt-4 btn__primary block ml-auto"
            >
              Cerrar
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default WaveStyles;
