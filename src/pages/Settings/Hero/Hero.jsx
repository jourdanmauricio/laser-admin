import { useDispatch, useSelector } from 'react-redux';
import { changeSettings } from '@/store/settings';
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

  const data = useSelector((state) =>
    state.settings.settings.filter((setting) => setting.type === 'hero')
  );
  const hero = data.reduce((obj, cur) => ({ ...obj, [cur.feature]: cur }), {});

  const heroBtn = useSelector((state) =>
    state.settings.settings.filter((setting) => setting.type === 'heroBtn')
  );
  const button = heroBtn.reduce(
    (obj, cur) => ({ ...obj, [cur.feature]: cur }),
    {}
  );

  const sectionAbout = useSelector((state) =>
    state.settings.settings.filter((setting) => setting.type === 'sectionAbout')
  );
  const aboutSection = sectionAbout.reduce(
    (obj, cur) => ({ ...obj, [cur.feature]: cur }),
    {}
  );

  if (hero.opacity) {
    document.documentElement.style.setProperty(
      '--heroOpacity',
      hero.opacity.value
    );
    document.documentElement.style.setProperty('--heroPosX', hero.posX.value);
    document.documentElement.style.setProperty('--heroTop', hero.top.value);
    document.documentElement.style.setProperty(
      '--aboutBgColor',
      aboutSection.bgColor.value
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
    dispatch(changeSettings({ feature, value, type: 'hero' }));
  };

  const handleSelect = (image) => {
    closeModal();
    dispatch(changeSettings({ feature: 'image', value: image, type: 'hero' }));
  };

  return (
    <div className="form__group w-full">
      {hero.image && (
        <>
          <section className="relative w-full max-h-[85vh] overflow-hidden">
            <div className="-z-10">
              <img
                src={hero.image.value}
                alt={hero.image.feature}
                className="w-full h-auto object-cover object-center"
              />
            </div>
            <div className="absolute top-0 bg-black w-full h-full hero__opacity"></div>

            <div
              className={`z-10 absolute hero__pos text-center w-max ${
                hero.posX.value === 'right'
                  ? 'right-0'
                  : hero.posX.value === 'left'
                  ? 'left-0'
                  : 'left-1/2 -translate-x-2/4'
              } `}
            >
              <div
                className="relative ql-editor"
                dangerouslySetInnerHTML={{ __html: hero.text.value }}
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

            {hero.waveShow.value === 'true' && (
              <div className="absolute bottom-0 h-[100px] left-0 w-full overflow-hidden">
                <svg
                  viewBox="0 0 500 150"
                  preserveAspectRatio="none"
                  className="h-full w-full"
                >
                  <path
                    d={hero.wave.value}
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
                name={hero.opacity.feature}
                value={hero.opacity.value}
                min="0"
                max="1"
                onChange={(e) => onChangeSetting(e.target.name, e.target.value)}
                step="0.01"
              />
              <label className="ml-4" htmlFor={hero.opacity.feature}>
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
                Seleccionar {firstCapital(hero.image.feature)}
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
                    name={hero.posX.feature}
                    value="left"
                    id="left"
                    onChange={(e) =>
                      onChangeSetting(e.target.name, e.target.value)
                    }
                    checked={hero.posX.value === 'left'}
                  />
                  <label className="ml-2" htmlFor="left">
                    Izquierda
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    value="center"
                    name={hero.posX.feature}
                    id="center"
                    onChange={(e) =>
                      onChangeSetting(e.target.name, e.target.value)
                    }
                    checked={hero.posX.value === 'center'}
                  />
                  <label className="ml-2" htmlFor="center">
                    Centro
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    value="right"
                    name={hero.posX.feature}
                    id="right"
                    onChange={(e) =>
                      onChangeSetting(e.target.name, e.target.value)
                    }
                    checked={hero.posX.value === 'right'}
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
                id={hero.top.feature}
                name={hero.top.feature}
                min="0"
                max="95"
                value={hero.top.value.replace('%', '')}
                onChange={(e) =>
                  onChangeSetting(e.target.name, e.target.value + '%')
                }
              />
              <label className="ml-4" htmlFor={hero.top.feature}>
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
                  checked={hero.waveShow?.value === 'false' ? false : true}
                  type="checkbox"
                  value=""
                  id={hero.waveShow.feature}
                  name={hero.waveShow.feature}
                  onChange={(e) =>
                    onChangeSetting(e.target.name, e.target.checked.toString())
                  }
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor={hero.waveShow.feature}
                  className="ml-2 text-sm font-medium text-gray-700 text"
                >
                  Wave
                </label>
                <button
                  disabled={hero.waveShow.value === 'false'}
                  type="button"
                  onClick={() => openModalWave()}
                  className="btn__primary ml-4 disabled:bg-slate-400 disabled:cursor-default"
                >
                  Modificar wave
                </button>
              </div>
            </div>
          </div>

          <div className="form__group w-full editor">
            <label className="form__label">Contenido</label>
            <ReactQuill
              className="bg-gray-300"
              theme="snow"
              name={hero.text.feature}
              value={hero.text.value}
              onChange={(e) => onChangeSetting(hero.text.feature, e)}
              placeholder={'Write something awesome...'}
              modules={quillSimpleModules}
            />
          </div>

          <Modal isOpenModal={isOpenModal} closeModal={closeModal}>
            <Media handleSelect={handleSelect} />
          </Modal>

          <Modal isOpenModal={isOpenModalWave} closeModal={closeModalWave}>
            <WaveStyles
              wave={hero.wave}
              onChangeSetting={onChangeSetting}
              closeModalWave={closeModalWave}
              bg="#FFFFFF" // Color seccion actual
              waveColor={aboutSection.bgColor} // Color siguiente seccion
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
                onChangeSetting2={onChangeSetting}
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
