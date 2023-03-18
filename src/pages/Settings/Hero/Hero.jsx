import { useDispatch, useSelector } from 'react-redux';
import { changeSettings, changeSettings2 } from '@/store/settings';
import ReactQuill from 'react-quill';
import { quillSimpleModules } from '@/config/constants';
import { useModal } from '@/hooks/useModal';
import { Modal } from '@/commons/Modal/Modal';
import Media from '@/components/Media/Media';
import WaveStyles from '@/components/WaveStyles/WaveStyles';
import ButtonStyles from '@/components/ButtonStyles/ButtonStyles';

const Hero = () => {
  const [isOpenModal, openModal, closeModal] = useModal(false);
  const [isOpenModalWave, openModalWave, closeModalWave] = useModal(false);
  const [isOpenModalBtnHero, openModalBtnHero, closeModalBtnHero] =
    useModal(false);
  const dispatch = useDispatch();

  const heroText = useSelector((state) =>
    state.settings.settings.find((setting) => setting.feature === 'heroText')
  );
  const heroOpacity = useSelector((state) =>
    state.settings.settings.find((setting) => setting.feature === 'heroOpacity')
  );
  const heroImage = useSelector((state) =>
    state.settings.settings.find((setting) => setting.feature === 'heroImage')
  );
  const heroTop = useSelector((state) =>
    state.settings.settings.find((setting) => setting.feature === 'heroTop')
  );
  const heroPosX = useSelector((state) =>
    state.settings.settings.find((setting) => setting.feature === 'heroPosX')
  );

  const heroBtn = useSelector((state) =>
    state.settings.settings.filter((setting) => setting.type === 'heroBtn')
  );
  const button = heroBtn.reduce(
    (obj, cur) => ({ ...obj, [cur.feature]: cur }),
    {}
  );

  const waveHeroShow = useSelector((state) =>
    state.settings.settings.find(
      (setting) => setting.feature === 'waveHeroShow'
    )
  );
  const aboutBgColor = useSelector((state) =>
    state.settings.settings.find(
      (setting) => setting.feature === 'aboutBgColor'
    )
  );

  const waveHero = useSelector((state) =>
    state.settings.settings.find((setting) => setting.feature === 'waveHero')
  );

  const onChangeSetting2 = (feature, value, type) => {
    dispatch(changeSettings2({ feature, value, type }));
  };

  if (heroOpacity) {
    document.documentElement.style.setProperty(
      '--heroOpacity',
      heroOpacity.value
    );
    document.documentElement.style.setProperty('--heroPosX', heroPosX.value);
    document.documentElement.style.setProperty('--heroTop', heroTop.value);
    document.documentElement.style.setProperty(
      '--aboutBgColor',
      aboutBgColor.value
    );
  }

  if (Object.keys(button).length > 0) {
    document.documentElement.style.setProperty(
      '--btnTextColorHero',
      `${button.textColor.value}`
    );
    document.documentElement.style.setProperty(
      '--btnTextColorHoverHero',
      `${button.textColorHover.value}`
    );
    document.documentElement.style.setProperty(
      '--btnBgColorHero',
      `${button.bgColor.value}`
    );
    document.documentElement.style.setProperty(
      '--btnBgColorHoverHero',
      `${button.bgColorHover.value}`
    );
    document.documentElement.style.setProperty(
      '--btnTlRadiusHero',
      `${button.tlRadius.value}`
    );
    document.documentElement.style.setProperty(
      '--btnTrRadiusHero',
      `${button.trRadius.value}`
    );
    document.documentElement.style.setProperty(
      '--btnBlRadiusHero',
      `${button.blRadius.value}`
    );
    document.documentElement.style.setProperty(
      '--btnBrRadiusHero',
      `${button.brRadius.value}`
    );
    document.documentElement.style.setProperty(
      '--btnBorderColorHero',
      `${button.borderColor.value}`
    );
    document.documentElement.style.setProperty(
      '--btnBorderColorHoverHero',
      `${button.borderColorHover.value}`
    );
    document.documentElement.style.setProperty(
      '--btnShadowHero',
      `${button.shadow.value}`
    );
    document.documentElement.style.setProperty(
      '--btnHeightHero',
      `${button.height.value}`
    );
    document.documentElement.style.setProperty(
      '--btnWidthHero',
      `${button.width.value}`
    );
    document.documentElement.style.setProperty(
      '--btnBorderHero',
      `${button.border.value}`
    );
  }

  function firstCapital(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const onChangeSetting = (feature, value) => {
    dispatch(changeSettings({ feature, value }));
  };

  const handleSelect = (image) => {
    closeModal();
    dispatch(changeSettings({ feature: 'heroImage', value: image }));
  };

  return (
    <div className="form__group w-full">
      {heroImage && (
        <>
          <section className="relative w-full max-h-[85vh] overflow-hidden">
            <div className="-z-10">
              <img
                src={heroImage.value}
                alt={heroImage.feature}
                className="w-full h-auto object-cover object-center"
              />
            </div>
            <div className="absolute top-0 bg-black w-full h-full hero__opacity"></div>

            <div
              className={`z-10 absolute hero__pos text-center w-max ${
                heroPosX.value === 'right'
                  ? 'right-0'
                  : heroPosX.value === 'left'
                  ? 'left-0'
                  : 'left-1/2 -translate-x-2/4'
              } `}
            >
              <div
                className="relative ql-editor"
                dangerouslySetInnerHTML={{ __html: heroText.value }}
              />
              {button.show.value === 'true' && (
                <button
                  type="button"
                  className="border border-solid transition ease-in-out delay-100  hover:cursor-pointer btn__hero mx-auto"
                >
                  {button.text.value}
                </button>
              )}
            </div>

            {waveHeroShow.value === 'true' && (
              <div className="absolute bottom-0 h-[100px] left-0 w-full overflow-hidden">
                <svg
                  viewBox="0 0 500 150"
                  preserveAspectRatio="none"
                  className="h-full w-full"
                >
                  <path
                    d={waveHero.value}
                    className="stroke-none fill-aboutBgColor"
                  ></path>
                </svg>
              </div>
            )}
          </section>

          <div className="flex">
            {/* opacidad */}
            <div className="form__group w-full">
              <input
                type="range"
                id="heroOpacity"
                name="heroOpacity"
                min="0"
                max="1"
                value={heroOpacity.value}
                onChange={(e) => onChangeSetting(e.target.name, e.target.value)}
                step="0.01"
              />
              <label className="ml-4" htmlFor="heroOpacity">
                Opacidad
              </label>
            </div>
            {/*  imagen */}
            <div className="form__group w-full">
              <button
                onClick={openModal}
                type="button"
                className="btn__primary"
              >
                Seleccionar {firstCapital(heroImage.feature)}
              </button>
            </div>
          </div>

          <div className="flex">
            {/*  eje X */}
            <div className="form__group w-full">
              <div className="flex justify-start gap-4">
                <div>
                  <input
                    type="radio"
                    value="left"
                    name="heroPosX"
                    id="left"
                    onChange={(e) =>
                      onChangeSetting(e.target.name, e.target.value)
                    }
                    checked={heroPosX.value === 'left'}
                  />
                  <label className="ml-2" htmlFor="left">
                    Izquierda
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    value="center"
                    name="heroPosX"
                    id="center"
                    onChange={(e) =>
                      onChangeSetting(e.target.name, e.target.value)
                    }
                    checked={heroPosX.value === 'center'}
                  />
                  <label className="ml-2" htmlFor="center">
                    Centro
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    value="right"
                    name="heroPosX"
                    id="right"
                    onChange={(e) =>
                      onChangeSetting(e.target.name, e.target.value)
                    }
                    checked={heroPosX.value === 'right'}
                  />
                  <label className="ml-2" htmlFor="right">
                    Derecha
                  </label>
                </div>
              </div>
            </div>
            {/*  eje Y */}
            <div className="form__group w-full">
              <input
                type="range"
                id="heroTop"
                name="heroTop"
                min="0"
                max="95"
                value={heroTop.value.replace('%', '')}
                onChange={(e) =>
                  onChangeSetting(e.target.name, e.target.value + '%')
                }
              />
              <label className="ml-4" htmlFor="heroTop">
                Posición Y
              </label>
            </div>
          </div>

          {/* BOTON - WAVE */}
          <div className="flex flex-col sm:flex-row sm:gap-10">
            <div className="form__group w-full">
              <input
                checked={button.show.value === 'false' ? false : true}
                type="checkbox"
                value=""
                name={button.show.feature}
                onChange={(e) =>
                  onChangeSetting(e.target.name, e.target.checked.toString())
                }
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="main"
                className="ml-2 text-sm font-medium text-gray-700 text"
              >
                Botón CTA
              </label>
              <button
                disabled={button.show.value === 'false'}
                type="button"
                onClick={() => openModalBtnHero()}
                className="btn__primary ml-4 disabled:bg-slate-400 disabled:cursor-default"
              >
                Modificar botón
              </button>
            </div>

            <div className="flex items-center gap-4 w-full">
              <div className="form__group w-full">
                <input
                  checked={waveHeroShow?.value === 'false' ? false : true}
                  type="checkbox"
                  value=""
                  id={waveHeroShow.feature}
                  name={waveHeroShow.feature}
                  onChange={(e) =>
                    onChangeSetting(e.target.name, e.target.checked.toString())
                  }
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor={waveHeroShow.feature}
                  className="ml-2 text-sm font-medium text-gray-700 text"
                >
                  Wave
                </label>
                <button
                  disabled={waveHeroShow.value === 'false'}
                  type="button"
                  onClick={() => openModalWave()}
                  className="btn__primary ml-4 disabled:bg-slate-400 disabled:cursor-default"
                >
                  Modificar wave
                </button>
              </div>
            </div>
          </div>
          {/* WAVE */}
          {/* <div className="flex">
            <div className="form__group w-full">
              <input
                checked={waveHeroShow?.value === 'false' ? false : true}
                type="checkbox"
                value=""
                name={waveHeroShow.feature}
                onChange={(e) =>
                  onChangeSetting(e.target.name, e.target.checked.toString())
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
            <div className="form__group w-full">
              <button
                type="button"
                onClick={() => openModalWave()}
                className="btn__primary"
              >
                Modificar wave
              </button>
            </div>
          </div> */}

          <div className="form__group w-full editor">
            <label className="form__label">Contenido</label>
            <ReactQuill
              className="bg-gray-300"
              theme="snow"
              value={heroText.value}
              name="heroText"
              onChange={(e) => onChangeSetting('heroText', e)}
              placeholder={'Write something awesome...'}
              modules={quillSimpleModules}
            />
          </div>

          <Modal isOpenModal={isOpenModal} closeModal={closeModal}>
            <Media handleSelect={handleSelect} />
          </Modal>

          <Modal isOpenModal={isOpenModalWave} closeModal={closeModalWave}>
            <WaveStyles
              wave={waveHero}
              onChangeSetting={onChangeSetting}
              closeModalWave={closeModalWave}
              bg="#FFFFFF" // Color seccion actual
              waveColor={aboutBgColor} // Color siguiente seccion
              section="Imagen Hero"
              nextSection="Sobre mi"
            />
          </Modal>

          {isOpenModalBtnHero && (
            <Modal
              isOpenModal={isOpenModalBtnHero}
              closeModal={closeModalBtnHero}
            >
              <ButtonStyles
                button={button}
                onChangeSetting2={onChangeSetting2}
                closeModal={closeModalBtnHero}
              />
            </Modal>
          )}
        </>
      )}
    </div>
  );
};

export default Hero;
