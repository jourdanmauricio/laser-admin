import { useDispatch, useSelector } from 'react-redux';
import { changeSettings } from '@/store/settings';

const General = () => {
  const dispatch = useDispatch();

  const bodyBgColor = useSelector((state) =>
    state.settings.settings.find((setting) => setting.feature === 'bodyBgColor')
  );

  if (bodyBgColor)
    document.documentElement.style.setProperty(
      '--bodyBgColor',
      bodyBgColor.value
    );

  const onChangeSetting = (feature, value) => {
    dispatch(changeSettings({ feature, value }));
  };

  return (
    <>
      {bodyBgColor && (
        <>
          <div className="bg-bodyBgColor px-5 pb-5 mt-5 border border-gray-400">
            <h2 className={`text-h2Color`}>Título ejemplo</h2>
            {/* ${h2Pos.value} */}
            <p>
              Parrafo ejemplo... Lorem ipsum dolor sit amet consectetur,
              adipisicing elit. Nihil ipsam fuga beatae quo est temporibus quae
              quidem architecto minus vel. Vel, quo saepe debitis tempora nihil
              voluptas expedita ducimus perferendis!
            </p>
            <h3>Sub título ejemplo</h3>
            <p className="mt-5">
              Parrafo ejemplo... Lorem ipsum dolor sit amet consectetur,
              adipisicing elit. Nihil ipsam fuga beatae quo est temporibus quae
              quidem architecto minus vel. Vel, quo saepe debitis tempora nihil
              voluptas expedita ducimus perferendis!
            </p>
            <p className="mt-5">
              Parrafo ejemplo... Lorem ipsum dolor sit amet consectetur,
              adipisicing elit. Nihil ipsam fuga beatae quo est temporibus quae
              quidem architecto minus vel. Vel, quo saepe debitis tempora nihil
              voluptas expedita ducimus perferendis!
            </p>
          </div>
          <hr className="mt-8" />
          <div className="mt-8 form__group">
            <label className="form__label">Color fondo página</label>
            <div className="flex items-center gap-4">
              <input
                className="form__input--color w-full border-gray-500"
                type="color"
                name="bodyBgColor"
                value={bodyBgColor.value}
                onChange={(e) => onChangeSetting(e.target.name, e.target.value)}
              />
              <input
                type="text"
                value={bodyBgColor.value}
                name="bodyBgColor"
                placeholder="#531253"
                className="form__input border-gray-500"
                onChange={(e) => onChangeSetting(e.target.name, e.target.value)}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default General;
