import { useDispatch, useSelector } from 'react-redux';
import { changeSettings } from '@/store/settings';
import FooterPreview from './FooterPreview';

const Footer = () => {
  const dispatch = useDispatch();

  const data = useSelector((state) =>
    state.settings.settings.filter((setting) => setting.type === 'footer')
  );
  const footer = data.reduce(
    (obj, cur) => ({ ...obj, [cur.feature]: cur }),
    {}
  );
  const onChangeSetting = (feature, value) => {
    dispatch(changeSettings({ feature, value, type: 'footer' }));
  };

  return (
    <>
      <FooterPreview />
      {footer.bgColor && (
        <>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-20">
            <div className="mt-8 form__group w-full">
              <label className="form__label">Color fondo sección</label>
              <div className="flex items-center gap-4">
                <input
                  className="form__input--color w-full border-gray-500"
                  type="color"
                  name={footer.bgColor.feature}
                  value={footer.bgColor.value}
                  onChange={(e) =>
                    onChangeSetting(e.target.name, e.target.value)
                  }
                />
                <input
                  type="text"
                  name={footer.bgColor.feature}
                  value={footer.bgColor.value}
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
                  name={footer.textColor.feature}
                  value={footer.textColor.value}
                  onChange={(e) =>
                    onChangeSetting(e.target.name, e.target.value)
                  }
                />
                <input
                  type="text"
                  name={footer.textColor.feature}
                  value={footer.textColor.value}
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
                  name={footer.buttonsColor.feature}
                  value={footer.buttonsColor.value}
                  onChange={(e) =>
                    onChangeSetting(e.target.name, e.target.value)
                  }
                />
                <input
                  type="text"
                  name={footer.buttonsColor.feature}
                  value={footer.buttonsColor.value}
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
                  name={footer.buttonsHoverColor.feature}
                  value={footer.buttonsHoverColor.value}
                  onChange={(e) =>
                    onChangeSetting(e.target.name, e.target.value)
                  }
                />
                <input
                  type="text"
                  name={footer.buttonsHoverColor.feature}
                  value={footer.buttonsHoverColor.value}
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
                  name={footer.linksColor.feature}
                  value={footer.linksColor.value}
                  onChange={(e) =>
                    onChangeSetting(e.target.name, e.target.value)
                  }
                />
                <input
                  type="text"
                  name={footer.linksColor.feature}
                  value={footer.linksColor.value}
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
                  name={footer.linksHoverColor.feature}
                  value={footer.linksHoverColor.value}
                  onChange={(e) =>
                    onChangeSetting(e.target.name, e.target.value)
                  }
                />
                <input
                  type="text"
                  name={footer.linksHoverColor.feature}
                  value={footer.linksHoverColor.value}
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
                  name={footer.footer2BgColor.feature}
                  value={footer.footer2BgColor.value}
                  onChange={(e) =>
                    onChangeSetting(e.target.name, e.target.value)
                  }
                />
                <input
                  type="text"
                  name={footer.footer2BgColor.feature}
                  value={footer.footer2BgColor.value}
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
                  name={footer.footer2TextColor.feature}
                  value={footer.footer2TextColor.value}
                  onChange={(e) =>
                    onChangeSetting(e.target.name, e.target.value)
                  }
                />
                <input
                  type="text"
                  name={footer.footer2TextColor.feature}
                  value={footer.footer2TextColor.value}
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
