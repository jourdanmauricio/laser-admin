import { useSelector } from 'react-redux';
import Accordion from './Accordion/Accordion';

const PagesSettings = () => {
  const bodyBgColor = useSelector((state) =>
    state.settings.settings.find((setting) => setting.feature === 'bodyBgColor')
  );

  if (bodyBgColor)
    document.documentElement.style.setProperty(
      '--bodyBgColor',
      bodyBgColor.value
    );

  return (
    <>
      {bodyBgColor && (
        <>
          <div className="py-10">
            <Accordion />
          </div>
        </>
      )}
    </>
  );
};

export default PagesSettings;
