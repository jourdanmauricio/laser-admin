import { useDispatch, useSelector } from 'react-redux';
import { setSettings } from '@/store/settings';
import AddPicture from '../AddPicture/AddPicture';
import Nav from './Nav';

const Menu = () => {
  const dispatch = useDispatch();
  const { editSettings } = useSelector((state) => state.settings);
  const logoImage = editSettings.find(
    (setting) => setting.feature === 'logoImage'
  );
  const navBgColor = editSettings.find(
    (setting) => setting.feature === 'navBgColor'
  );
  const navTextColor = editSettings.find(
    (setting) => setting.feature === 'navTextColor'
  );
  const navHoverColor = editSettings.find(
    (setting) => setting.feature === 'navHoverColor'
  );
  const navCurrentPageColor = editSettings.find(
    (setting) => setting.feature === 'navCurrentPageColor'
  );

  const handleChange = (feature, value) => {
    dispatch(setSettings({ feature, value }));
  };

  return (
    <div className="mt-4">
      <Nav />
      <hr className="mt-8" />
      <AddPicture logoImage={logoImage} />
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-20">
        <div className="form__group w-full">
          <label className="form__label">Color fondo</label>
          <div className="flex items-center gap-4">
            <input
              className="form__input--color w-full border-gray-500"
              type="color"
              name="navBgColor"
              value={navBgColor.value}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
            <input
              type="text"
              value={navBgColor.value}
              name="navBgColor"
              placeholder="#531253"
              className="form__input border-gray-500"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
          </div>
        </div>
        <div className="form__group w-full">
          <label className="form__label">Color texto</label>
          <div className="flex items-center gap-4">
            <input
              className="form__input--color w-full border-gray-500"
              type="color"
              name="navTextColor"
              value={navTextColor.value}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
            <input
              type="text"
              value={navTextColor.value}
              name="navTextColor"
              placeholder="#531253"
              className="form__input border-gray-500"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-20">
        <div className="form__group w-full">
          <label className="form__label">Color hover</label>
          <div className="flex items-center gap-4">
            <input
              className="form__input--color w-full border-gray-500"
              type="color"
              name="navHoverColor"
              value={navHoverColor.value}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
            <input
              type="text"
              value={navHoverColor.value}
              name="navHoverColor"
              placeholder="#531253"
              className="form__input border-gray-500"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
          </div>
        </div>
        <div className="form__group w-full">
          <label className="form__label">Color página actual</label>
          <div className="flex items-center gap-4">
            <input
              className="form__input--color w-full border-gray-500"
              type="color"
              name="navCurrentPageColor"
              value={navCurrentPageColor.value}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
            <input
              type="text"
              value={navCurrentPageColor.value}
              name="navCurrentPageColor"
              placeholder="#531253"
              className="form__input border-gray-500"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
