import { useDispatch, useSelector } from 'react-redux';
import { changeSettings } from '@/store/settings';
import AddPicture from '../AddPicture/AddPicture';
import Nav from './Nav';

const Menu = () => {
  const dispatch = useDispatch();

  const logoImage = useSelector((state) =>
    state.settings.settings.find((setting) => setting.feature === 'logoImage')
  );

  const data = useSelector((state) =>
    state.settings.settings.filter((setting) => setting.type === 'menu')
  );
  const menu = data.reduce((obj, cur) => ({ ...obj, [cur.feature]: cur }), {});

  const onChangeSetting = (feature, value, type = 'menu') => {
    dispatch(changeSettings({ feature, value, type }));
  };

  return (
    <>
      {logoImage && (
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
                  name={menu.bgColor.feature}
                  value={menu.bgColor.value}
                  onChange={(e) =>
                    onChangeSetting(e.target.name, e.target.value)
                  }
                />
                <input
                  type="text"
                  name={menu.bgColor.feature}
                  value={menu.bgColor.value}
                  placeholder="#531253"
                  className="form__input border-gray-500"
                  onChange={(e) =>
                    onChangeSetting(e.target.name, e.target.value)
                  }
                />
              </div>
            </div>
            <div className="form__group w-full">
              <label className="form__label">Color texto</label>
              <div className="flex items-center gap-4">
                <input
                  className="form__input--color w-full border-gray-500"
                  type="color"
                  name={menu.textColor.feature}
                  value={menu.textColor.value}
                  onChange={(e) =>
                    onChangeSetting(e.target.name, e.target.value)
                  }
                />
                <input
                  type="text"
                  name={menu.textColor.feature}
                  value={menu.textColor.value}
                  placeholder="#531253"
                  className="form__input border-gray-500"
                  onChange={(e) =>
                    onChangeSetting(e.target.name, e.target.value)
                  }
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
                  name={menu.hoverColor.feature}
                  value={menu.hoverColor.value}
                  onChange={(e) =>
                    onChangeSetting(e.target.name, e.target.value)
                  }
                />
                <input
                  type="text"
                  name={menu.hoverColor.feature}
                  value={menu.hoverColor.value}
                  placeholder="#531253"
                  className="form__input border-gray-500"
                  onChange={(e) =>
                    onChangeSetting(e.target.name, e.target.value)
                  }
                />
              </div>
            </div>
            <div className="form__group w-full">
              <label className="form__label">Color página actual</label>
              <div className="flex items-center gap-4">
                <input
                  className="form__input--color w-full border-gray-500"
                  type="color"
                  name={menu.currentPageColor.feature}
                  value={menu.currentPageColor.value}
                  onChange={(e) =>
                    onChangeSetting(e.target.name, e.target.value)
                  }
                />
                <input
                  type="text"
                  name={menu.currentPageColor.feature}
                  value={menu.currentPageColor.value}
                  placeholder="#531253"
                  className="form__input border-gray-500"
                  onChange={(e) =>
                    onChangeSetting(e.target.name, e.target.value)
                  }
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Menu;
