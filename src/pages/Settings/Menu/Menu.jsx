import { useDispatch, useSelector } from 'react-redux';
import { changeSettings } from '@/store/settings';
import AddPicture from '../AddPicture/AddPicture';
import Nav from './Nav';

const Menu = () => {
  const dispatch = useDispatch();

  const logoImage = useSelector((state) =>
    state.settings.settings.find((setting) => setting.feature === 'logoImage')
  );
  const navBgColor = useSelector((state) =>
    state.settings.settings.find((setting) => setting.feature === 'navBgColor')
  );
  const navTextColor = useSelector((state) =>
    state.settings.settings.find(
      (setting) => setting.feature === 'navTextColor'
    )
  );
  const navHoverColor = useSelector((state) =>
    state.settings.settings.find(
      (setting) => setting.feature === 'navHoverColor'
    )
  );
  const navCurrentPageColor = useSelector((state) =>
    state.settings.settings.find(
      (setting) => setting.feature === 'navCurrentPageColor'
    )
  );

  const onChangeSetting = (feature, value) => {
    dispatch(changeSettings({ feature, value }));
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
                  name="navBgColor"
                  value={navBgColor.value}
                  onChange={(e) =>
                    onChangeSetting(e.target.name, e.target.value)
                  }
                />
                <input
                  type="text"
                  value={navBgColor.value}
                  name="navBgColor"
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
                  name="navTextColor"
                  value={navTextColor.value}
                  onChange={(e) =>
                    onChangeSetting(e.target.name, e.target.value)
                  }
                />
                <input
                  type="text"
                  value={navTextColor.value}
                  name="navTextColor"
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
                  name="navHoverColor"
                  value={navHoverColor.value}
                  onChange={(e) =>
                    onChangeSetting(e.target.name, e.target.value)
                  }
                />
                <input
                  type="text"
                  value={navHoverColor.value}
                  name="navHoverColor"
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
                  name="navCurrentPageColor"
                  value={navCurrentPageColor.value}
                  onChange={(e) =>
                    onChangeSetting(e.target.name, e.target.value)
                  }
                />
                <input
                  type="text"
                  value={navCurrentPageColor.value}
                  name="navCurrentPageColor"
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
