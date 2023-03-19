import SelectOptions from '@/commons/SelectOptions/SelectOptions';

import { Link } from 'react-router-dom';
import { FaPaintBrush } from 'react-icons/fa';

const ButtonStyles = ({ button, onChangeSetting2, closeModal }) => {
  if (Object.keys(button).length > 0) {
    document.documentElement.style.setProperty(
      '--btnTextColor',
      `${button.textColor.value}`
    );
    document.documentElement.style.setProperty(
      '--btnTextColorHover',
      `${button.textColorHover.value}`
    );
    document.documentElement.style.setProperty(
      '--btnBgColor',
      `${button.bgColor.value}`
    );
    document.documentElement.style.setProperty(
      '--btnBgColorHover',
      `${button.bgColorHover.value}`
    );
    document.documentElement.style.setProperty(
      '--btnTlRadius',
      `${button.tlRadius.value}`
    );
    document.documentElement.style.setProperty(
      '--btnTrRadius',
      `${button.trRadius.value}`
    );
    document.documentElement.style.setProperty(
      '--btnBlRadius',
      `${button.blRadius.value}`
    );
    document.documentElement.style.setProperty(
      '--btnBrRadius',
      `${button.brRadius.value}`
    );
    document.documentElement.style.setProperty(
      '--btnBorderColor',
      `${button.borderColor.value}`
    );
    document.documentElement.style.setProperty(
      '--btnBorderColorHover',
      `${button.borderColorHover.value}`
    );
    document.documentElement.style.setProperty(
      '--btnShadow',
      `${button.shadow.value}`
    );
    document.documentElement.style.setProperty(
      '--btnHeight',
      `${button.height.value}`
    );
    document.documentElement.style.setProperty(
      '--btnWidth',
      `${button.width.value}`
    );
    document.documentElement.style.setProperty(
      '--btnBorder',
      `${button.border.value}`
    );
  }
  return (
    <>
      {Object.keys(button).length > 0 && (
        <>
          <div className="p-10">
            <div className="bg-clinicBgColor h-20 w-full flex items-center justify-center">
              <div className="border border-solid transition ease-in-out delay-100  hover:cursor-pointer btn__settings">
                {button.text.value}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:gap-10">
              <div className="form__group w-full">
                <label className="form__label">Texto</label>
                <input
                  className="form__input border-gray-500 text-sm"
                  type="text"
                  name={button.text.feature}
                  onChange={(e) =>
                    onChangeSetting2(
                      e.target.name,
                      e.target.value,
                      button.text.type
                    )
                  }
                  placeholder="Texto del botón"
                  value={button.text.value}
                />
              </div>
              <div className="form__group w-full">
                <SelectOptions
                  label={'Link'}
                  button={button}
                  onHandleChange={onChangeSetting2}
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:gap-10">
              <div className="mt-1 form__group w-full">
                <label className="form__label">
                  Color de fondo - Transparente: agregar 00
                </label>
                <div className="flex items-center gap-4">
                  <input
                    className="form__input--color w-full border-gray-500"
                    type="color"
                    name={button.bgColor.feature}
                    value={button.bgColor.value}
                    onChange={(e) =>
                      onChangeSetting2(
                        e.target.name,
                        e.target.value,
                        button.bgColor.type
                      )
                    }
                  />
                  <input
                    type="text"
                    value={button.bgColor.value}
                    name={button.bgColor.feature}
                    placeholder="#531253"
                    className="form__input border-gray-500"
                    onChange={(e) =>
                      onChangeSetting2(
                        e.target.name,
                        e.target.value,
                        button.bgColor.type
                      )
                    }
                  />
                </div>
              </div>
              <div className="mt-1 form__group w-full">
                <label className="form__label">Color hover de fondo</label>
                <div className="flex items-center gap-4">
                  <input
                    className="form__input--color w-full border-gray-500"
                    type="color"
                    name={button.bgColorHover.feature}
                    value={button.bgColorHover.value}
                    onChange={(e) =>
                      onChangeSetting2(
                        e.target.name,
                        e.target.value,
                        button.bgColorHover.type
                      )
                    }
                  />
                  <input
                    type="text"
                    name={button.bgColorHover.feature}
                    placeholder="#531253"
                    value={button.bgColorHover.value}
                    className="form__input border-gray-500"
                    onChange={(e) =>
                      onChangeSetting2(
                        e.target.name,
                        e.target.value,
                        button.bgColorHover.type
                      )
                    }
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
                    name={button.textColor.feature}
                    value={button.textColor.value}
                    onChange={(e) =>
                      onChangeSetting2(
                        e.target.name,
                        e.target.value,
                        button.textColor.type
                      )
                    }
                  />
                  <input
                    type="text"
                    name={button.textColor.feature}
                    placeholder="#531253"
                    value={button.textColor.value}
                    className="form__input border-gray-500"
                    onChange={(e) =>
                      onChangeSetting2(
                        e.target.name,
                        e.target.value,
                        button.textColor.type
                      )
                    }
                  />
                </div>
              </div>
              <div className="mt-1 form__group w-full">
                <label className="form__label">Color hover del texto</label>
                <div className="flex items-center gap-4">
                  <input
                    className="form__input--color w-full border-gray-500"
                    type="color"
                    name={button.textColorHover.feature}
                    value={button.textColorHover.value}
                    onChange={(e) =>
                      onChangeSetting2(
                        e.target.name,
                        e.target.value,
                        button.textColorHover.type
                      )
                    }
                  />
                  <input
                    type="text"
                    name={button.textColorHover.feature}
                    placeholder="#531253"
                    value={button.textColorHover.value}
                    className="form__input border-gray-500"
                    onChange={(e) =>
                      onChangeSetting2(
                        e.target.name,
                        e.target.value,
                        button.textColorHover.type
                      )
                    }
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
                    name={button.borderColor.feature}
                    value={button.borderColor.value}
                    onChange={(e) =>
                      onChangeSetting2(
                        e.target.name,
                        e.target.value,
                        button.borderColor.type
                      )
                    }
                  />
                  <input
                    type="text"
                    name={button.borderColor.feature}
                    placeholder="#531253"
                    value={button.borderColor.value}
                    className="form__input border-gray-500"
                    onChange={(e) =>
                      onChangeSetting2(
                        e.target.name,
                        e.target.value,
                        button.borderColor.type
                      )
                    }
                  />
                </div>
              </div>
              <div className="mt-1 form__group w-full">
                <label className="form__label">Color hover del borde</label>
                <div className="flex items-center gap-4">
                  <input
                    className="form__input--color w-full border-gray-500"
                    type="color"
                    name={button.borderColorHover.feature}
                    value={button.borderColorHover.value}
                    onChange={(e) =>
                      onChangeSetting2(
                        e.target.name,
                        e.target.value,
                        button.borderColorHover.type
                      )
                    }
                  />
                  <input
                    type="text"
                    name={button.borderColorHover.feature}
                    placeholder="#531253"
                    value={button.borderColorHover.value}
                    className="form__input border-gray-500"
                    onChange={(e) =>
                      onChangeSetting2(
                        e.target.name,
                        e.target.value,
                        button.borderColorHover.type
                      )
                    }
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:gap-10">
              <div className="mt-1 form__group w-full">
                <label className="form__label">
                  Border Radius: sup-der / inf-der / inf-izq / sup-izq
                </label>
                <div className="flex items-center gap-4">
                  <input
                    className="form__input w-16 border-gray-500 text-sm"
                    type="number"
                    name={button.trRadius.feature}
                    onChange={(e) =>
                      onChangeSetting2(
                        e.target.name,
                        e.target.value + 'px',
                        button.trRadius.type
                      )
                    }
                    min="0"
                    max="50"
                    placeholder="Forma de la wave"
                    value={button.trRadius.value.replace('px', '')}
                  />
                  <input
                    className="form__input w-16 border-gray-500 text-sm"
                    type="number"
                    name={button.blRadius.feature}
                    onChange={(e) =>
                      onChangeSetting2(
                        e.target.name,
                        e.target.value + 'px',
                        button.blRadius.type
                      )
                    }
                    min="0"
                    max="50"
                    placeholder="Forma de la wave"
                    value={button.blRadius.value.replace('px', '')}
                  />
                  <input
                    className="form__input w-16 border-gray-500 text-sm"
                    type="number"
                    name={button.brRadius.feature}
                    onChange={(e) =>
                      onChangeSetting2(
                        e.target.name,
                        e.target.value + 'px',
                        button.brRadius.type
                      )
                    }
                    min="0"
                    max="50"
                    placeholder="Forma de la wave"
                    value={button.brRadius.value.replace('px', '')}
                  />
                  <input
                    className="form__input w-16 border-gray-500 text-sm"
                    type="number"
                    name={button.tlRadius.feature}
                    onChange={(e) =>
                      onChangeSetting2(
                        e.target.name,
                        e.target.value + 'px',
                        button.tlRadius.type
                      )
                    }
                    min="0"
                    max="50"
                    placeholder="Forma de la wave"
                    value={button.tlRadius.value.replace('px', '')}
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
                  name={button.shadow.feature}
                  onChange={(e) =>
                    onChangeSetting2(
                      e.target.name,
                      e.target.value,
                      button.shadow.type
                    )
                  }
                  placeholder="Forma de la wave"
                  value={button.shadow.value}
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:gap-10">
              <div className="mt-1 form__group w-full">
                <label className="form__label">Ancho Alto Borde</label>
                <div className="flex items-center gap-4">
                  <input
                    className="form__input w-16 border-gray-500 text-sm"
                    type="number"
                    name={button.width.feature}
                    onChange={(e) =>
                      onChangeSetting2(
                        e.target.name,
                        e.target.value + 'px',
                        button.width.type
                      )
                    }
                    min="0"
                    placeholder="Forma de la wave"
                    value={button.width.value.replace('px', '')}
                  />
                  <input
                    className="form__input w-16 border-gray-500 text-sm"
                    type="number"
                    name={button.height.feature}
                    onChange={(e) =>
                      onChangeSetting2(
                        e.target.name,
                        e.target.value + 'px',
                        button.height.type
                      )
                    }
                    min="0"
                    placeholder="Forma de la wave"
                    value={button.height.value.replace('px', '')}
                  />
                  <input
                    className="form__input w-16 border-gray-500 text-sm"
                    type="number"
                    name={button.border.feature}
                    onChange={(e) =>
                      onChangeSetting2(
                        e.target.name,
                        e.target.value + 'px',
                        button.border.type
                      )
                    }
                    min="0"
                    placeholder="Forma de la wave"
                    value={button.border.value.replace('px', '')}
                  />
                </div>
              </div>
            </div>
            <button
              onClick={closeModal}
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

export default ButtonStyles;
