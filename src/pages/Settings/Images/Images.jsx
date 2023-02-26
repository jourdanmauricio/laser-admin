import { useSelector } from 'react-redux';
import AddPicture from '../AddPicture/AddPicture';
import AddPictureHero from '../AddPicture/AddPictureHero';

const Images = () => {
  const { editSettings } = useSelector((state) => state.settings);
  const logo = editSettings.find((setting) => setting.feature === 'logo');
  const hero = editSettings.find((setting) => setting.feature === 'hero');

  return (
    <div className="form__group w-full">
      <AddPicture image={logo} />
      <AddPictureHero image={hero} />
    </div>
  );
};

export default Images;
