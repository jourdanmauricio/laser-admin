import { useDispatch, useSelector } from 'react-redux';
import { changeSettings } from '@/store/settings';
import FooterPreview from './FooterPreview';

const Footer = () => {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings.settings);
  console.log('settings', settings);

  const footerBgColor = useSelector((state) =>
    state.settings.settings.find(
      (setting) => setting.feature === 'footerBgColor'
    )
  );
  const footerTextColor = useSelector((state) =>
    state.settings.settings.find(
      (setting) => setting.feature === 'footerTextColor'
    )
  );
  const footerButtonsColor = useSelector((state) =>
    state.settings.settings.find(
      (setting) => setting.feature === 'footerButtonsColor'
    )
  );
  const footerButtonsHoverColor = useSelector((state) =>
    state.settings.settings.find(
      (setting) => setting.feature === 'footerButtonsHoverColor'
    )
  );
  const footerLinksColor = useSelector((state) =>
    state.settings.settings.find(
      (setting) => setting.feature === 'footerLinksColor'
    )
  );
  const footerLinksHoverColor = useSelector((state) =>
    state.settings.settings.find(
      (setting) => setting.feature === 'footerLinksHoverColor'
    )
  );
  const footer2BgColor = useSelector((state) =>
    state.settings.settings.find(
      (setting) => setting.feature === 'footer2BgColor'
    )
  );
  const footer2TextColor = useSelector((state) =>
    state.settings.settings.find(
      (setting) => setting.feature === 'footer2TextColor'
    )
  );

  const onChangeSetting = (feature, value) => {
    dispatch(changeSettings({ feature, value }));
  };

  return (
    <>
      <FooterPreview />
      {footerBgColor && (
        <>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-20">
            <div className="mt-8 form__group w-full">
              <label className="form__label">Color fondo sección</label>
              <div className="flex items-center gap-4">
                <input
                  className="form__input--color w-full border-gray-500"
                  type="color"
                  name="footerBgColor"
                  value={footerBgColor.value}
                  onChange={(e) =>
                    onChangeSetting(e.target.name, e.target.value)
                  }
                />
                <input
                  type="text"
                  value={footerBgColor.value}
                  name="footerBgColor"
                  placeholder="#531253"
                  className="form__input border-gray-500"
                  onChange={(e) =>
                    onChangeSetting(e.target.name, e.target.value)
                  }
                />
              </div>
            </div>
            <div className="mt-8 form__group w-full">
              <label className="form__label">Color texto</label>
              <div className="flex items-center gap-4">
                <input
                  className="form__input--color w-full border-gray-500"
                  type="color"
                  name="footerTextColor"
                  value={footerTextColor.value}
                  onChange={(e) =>
                    onChangeSetting(e.target.name, e.target.value)
                  }
                />
                <input
                  type="text"
                  value={footerTextColor.value}
                  name="footerTextColor"
                  placeholder="#531253"
                  className="form__input border-gray-500"
                  onChange={(e) =>
                    onChangeSetting(e.target.name, e.target.value)
                  }
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-20">
            <div className="mt-8 form__group w-full">
              <label className="form__label">Color de botones</label>
              <div className="flex items-center gap-4">
                <input
                  className="form__input--color w-full border-gray-500"
                  type="color"
                  name="footerButtonsColor"
                  value={footerButtonsColor.value}
                  onChange={(e) =>
                    onChangeSetting(e.target.name, e.target.value)
                  }
                />
                <input
                  type="text"
                  value={footerButtonsColor.value}
                  name="footerButtonsColor"
                  placeholder="#531253"
                  className="form__input border-gray-500"
                  onChange={(e) =>
                    onChangeSetting(e.target.name, e.target.value)
                  }
                />
              </div>
            </div>
            <div className="mt-8 form__group w-full">
              <label className="form__label">Color hover botones</label>
              <div className="flex items-center gap-4">
                <input
                  className="form__input--color w-full border-gray-500"
                  type="color"
                  name="footerButtonsHoverColor"
                  value={footerButtonsHoverColor.value}
                  onChange={(e) =>
                    onChangeSetting(e.target.name, e.target.value)
                  }
                />
                <input
                  type="text"
                  value={footerButtonsHoverColor.value}
                  name="footerButtonsHoverColor"
                  placeholder="#531253"
                  className="form__input border-gray-500"
                  onChange={(e) =>
                    onChangeSetting(e.target.name, e.target.value)
                  }
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-20">
            <div className="mt-8 form__group w-full">
              <label className="form__label">Color de links</label>
              <div className="flex items-center gap-4">
                <input
                  className="form__input--color w-full border-gray-500"
                  type="color"
                  name="footerLinksColor"
                  value={footerLinksColor.value}
                  onChange={(e) =>
                    onChangeSetting(e.target.name, e.target.value)
                  }
                />
                <input
                  type="text"
                  value={footerLinksColor.value}
                  name="footerLinksColor"
                  placeholder="#531253"
                  className="form__input border-gray-500"
                  onChange={(e) =>
                    onChangeSetting(e.target.name, e.target.value)
                  }
                />
              </div>
            </div>
            <div className="mt-8 form__group w-full">
              <label className="form__label">Color hover links</label>
              <div className="flex items-center gap-4">
                <input
                  className="form__input--color w-full border-gray-500"
                  type="color"
                  name="footerLinksHoverColor"
                  value={footerLinksHoverColor.value}
                  onChange={(e) =>
                    onChangeSetting(e.target.name, e.target.value)
                  }
                />
                <input
                  type="text"
                  value={footerLinksHoverColor.value}
                  name="footerLinksHoverColor"
                  placeholder="#531253"
                  className="form__input border-gray-500"
                  onChange={(e) =>
                    onChangeSetting(e.target.name, e.target.value)
                  }
                />
              </div>
            </div>
          </div>
          {/* FOOTER 2 */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-20">
            <div className="mt-8 form__group w-full">
              <label className="form__label">Color de fondo footer 2</label>
              <div className="flex items-center gap-4">
                <input
                  className="form__input--color w-full border-gray-500"
                  type="color"
                  name="footer2BgColor"
                  value={footer2BgColor.value}
                  onChange={(e) =>
                    onChangeSetting(e.target.name, e.target.value)
                  }
                />
                <input
                  type="text"
                  value={footer2BgColor.value}
                  name="footer2BgColor"
                  placeholder="#531253"
                  className="form__input border-gray-500"
                  onChange={(e) =>
                    onChangeSetting(e.target.name, e.target.value)
                  }
                />
              </div>
            </div>
            <div className="mt-8 form__group w-full">
              <label className="form__label">Color de texto footer2</label>
              <div className="flex items-center gap-4">
                <input
                  className="form__input--color w-full border-gray-500"
                  type="color"
                  name="footer2TextColor"
                  value={footer2TextColor.value}
                  onChange={(e) =>
                    onChangeSetting(e.target.name, e.target.value)
                  }
                />
                <input
                  type="text"
                  value={footer2TextColor.value}
                  name="footer2TextColor"
                  placeholder="#531253"
                  className="form__input border-gray-500"
                  onChange={(e) =>
                    onChangeSetting(e.target.name, e.target.value)
                  }
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Footer;
