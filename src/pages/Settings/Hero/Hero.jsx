import { useDispatch, useSelector } from 'react-redux';
import { changeSettings } from '@/store/settings';
import ReactQuill from 'react-quill';
import { quillSimpleModules } from '@/config/constants';
import { useModal } from '@/hooks/useModal';
import { Modal } from '@/commons/Modal/Modal';
import Media from '@/components/Media/Media';
import WaveSettings from '@/commons/WaveSettings/WaveSettings';

const Hero = () => {
  const [isOpenModal, openModal, closeModal] = useModal(false);
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

  if (heroOpacity) {
    document.documentElement.style.setProperty(
      '--heroOpacity',
      heroOpacity.value
    );
    document.documentElement.style.setProperty('--heroTop', heroTop.value);
    document.documentElement.style.setProperty(
      '--aboutBgColor',
      aboutBgColor.value
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
            <div className="absolute hero__top text-center left-1/2 w-full p-10 -translate-x-2/4 -translate-y-2/4">
              <div
                className="relative ql-editor"
                dangerouslySetInnerHTML={{ __html: heroText.value }}
              />
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

          <WaveSettings
            waveShow={waveHeroShow}
            wave={waveHero}
            onChangeWave={onChangeSetting}
          />

          <div className="mt-10 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
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
            <div>
              <input
                type="range"
                id="heroTop"
                name="heroTop"
                min="5"
                max="95"
                value={heroTop.value.replace('%', '')}
                onChange={(e) =>
                  onChangeSetting(e.target.name, e.target.value + '%')
                }
              />
              <label className="ml-4" htmlFor="heroTop">
                Altura
              </label>
            </div>

            <button onClick={openModal} type="button" className="btn__primary">
              Seleccionar {firstCapital(heroImage.feature)}
            </button>
          </div>

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
        </>
      )}
    </div>
  );
};

export default Hero;
