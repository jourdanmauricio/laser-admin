import { useSelector } from 'react-redux';
import AddPictureHero from '../AddPicture/AddPictureHero';

const Hero = () => {
  const { editSettings } = useSelector((state) => state.settings);
  const heroImage = editSettings.find(
    (setting) => setting.feature === 'heroImage'
  );

  return (
    <div className="form__group w-full">
      <AddPictureHero heroImage={heroImage} />
    </div>
  );
};

export default Hero;
