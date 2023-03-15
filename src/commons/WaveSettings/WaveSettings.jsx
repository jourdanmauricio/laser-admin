import { Link } from 'react-router-dom';

const WaveSettings = ({ waveShow, wave, onChangeWave }) => {
  return (
    <div className="flex flex-col sm:flex-row w-full items-center justify-between">
      <div className="flex items-center justify-left gap-4 w-full md:w-1/3">
        <div className="form__group">
          <input
            checked={waveShow?.value === 'false' ? false : true}
            type="checkbox"
            value=""
            name={waveShow.feature}
            onChange={(e) =>
              onChangeWave(e.target.name, e.target.checked.toString())
            }
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="main"
            className="ml-2 text-sm font-medium text-gray-700 text"
          >
            Wave
          </label>
        </div>
        <Link
          className="text-sm hover:underline"
          to="https://smooth.ie/blogs/news/svg-wavey-transitions-between-sections"
          target="_blank"
          rel="noopener noreferrer"
        >
          Generador Wave
        </Link>
      </div>
      <div className="form__group w-full md:w-2/3">
        <label className="form__label">Path Wave Generator</label>
        <input
          className="form__input border-gray-500 text-sm"
          disabled={waveShow?.value === 'true' ? false : true}
          type="text"
          name={wave.feature}
          onChange={(e) => onChangeWave(e.target.name, e.target.value)}
          placeholder="Forma de la wave"
          value={wave?.value || ''}
        />
      </div>
    </div>
  );
};

export default WaveSettings;
