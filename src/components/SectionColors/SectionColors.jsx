import { useDispatch } from 'react-redux';
import { changeSettings } from '@/store/settings';

const SectionColors = ({ section }) => {
  const dispatch = useDispatch();

  const onChangeSetting = (feature, value) => {
    dispatch(
      changeSettings({
        feature,
        value,
        type: section.bgColor.type,
      })
    );
  };

  return (
    <div className="flex flex-col sm:flex-row sm:gap-10">
      <div className="form__group w-full">
        <label className="form__label">Background</label>
        <div className="flex items-center gap-4">
          <input
            className="form__input--color w-full border-gray-500"
            type="color"
            name={section.bgColor.feature}
            value={section.bgColor.value}
            onChange={(e) => onChangeSetting(e.target.name, e.target.value)}
          />
          <input
            type="text"
            name={section.bgColor.feature}
            value={section.bgColor.value}
            placeholder="#531253"
            className="form__input border-gray-500"
            onChange={(e) => onChangeSetting(e.target.name, e.target.value)}
          />
        </div>
      </div>

      <div className="form__group w-full">
        <label className="form__label">Contenido</label>
        <div className="flex items-center gap-4">
          <input
            className="form__input--color w-full border-gray-500"
            type="color"
            name={section.textColor.feature}
            value={section.textColor.value}
            onChange={(e) => onChangeSetting(e.target.name, e.target.value)}
          />
          <input
            type="text"
            name={section.textColor.feature}
            value={section.textColor.value}
            placeholder="#531253"
            className="form__input border-gray-500"
            onChange={(e) => onChangeSetting(e.target.name, e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default SectionColors;
