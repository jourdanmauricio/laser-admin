import ReactQuill from 'react-quill';
import { quillSimpleModules } from '@/config/constants';
import { useDispatch } from 'react-redux';
import { changeSettings } from '@/store/settings';

const PageSetting = ({ page }) => {
  const dispatch = useDispatch();

  const onChangeSetting2 = (feature, value) => {
    dispatch(changeSettings({ feature, value, type: page.h1.type }));
  };

  return (
    <div>
      <div className="form__group w-full editor">
        <label className="form__label">Título</label>
        <ReactQuill
          style={{ backgroundColor: `${page.heroBgColor.value}` }}
          theme="snow"
          value={page.h1.value}
          name={page.h1.feature}
          onChange={(e) => onChangeSetting2(page.h1.feature, e)}
          placeholder={'Write something awesome...'}
          modules={quillSimpleModules}
        />
      </div>

      <div className="form__group w-full">
        <label className="form__label">Background Título</label>
        <div className="flex items-center gap-4">
          <input
            className="form__input--color w-full border-gray-500"
            type="color"
            name={page.heroBgColor.feature}
            value={page.heroBgColor.value}
            onChange={(e) => onChangeSetting2(e.target.name, e.target.value)}
          />
          <input
            type="text"
            value={page.heroBgColor.value}
            name={page.heroBgColor.feature}
            placeholder="#531253"
            className="form__input border-gray-500"
            onChange={(e) => onChangeSetting2(e.target.name, e.target.value)}
          />
        </div>
      </div>

      <div className="form__group w-full editor">
        <label className="form__label">Contenido</label>
        <ReactQuill
          style={{ backgroundColor: `${page.bgColor.value}` }}
          theme="snow"
          value={page.text.value}
          name={page.text.feature}
          onChange={(e) => onChangeSetting2(page.text.feature, e)}
          placeholder={'Write something awesome...'}
          modules={quillSimpleModules}
        />
      </div>

      <div className="form__group w-full">
        <label className="form__label">Background Contenido</label>
        <div className="flex items-center gap-4">
          <input
            className="form__input--color w-full border-gray-500"
            type="color"
            name={page.bgColor.feature}
            value={page.bgColor.value}
            onChange={(e) => onChangeSetting2(e.target.name, e.target.value)}
          />
          <input
            type="text"
            value={page.bgColor.value}
            name={page.bgColor.feature}
            placeholder="#531253"
            className="form__input border-gray-500"
            onChange={(e) => onChangeSetting2(e.target.name, e.target.value)}
          />
        </div>
      </div>

      <div className="form__group w-full">
        <label className="form__label">Color decoraciones</label>
        <div className="flex items-center gap-4">
          <input
            className="form__input--color w-full border-gray-500"
            type="color"
            name={page.decorationColor.feature}
            value={page.decorationColor.value}
            onChange={(e) => onChangeSetting2(e.target.name, e.target.value)}
          />
          <input
            type="text"
            value={page.decorationColor.value}
            name={page.decorationColor.feature}
            placeholder="#531253"
            className="form__input border-gray-500"
            onChange={(e) => onChangeSetting2(e.target.name, e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default PageSetting;
