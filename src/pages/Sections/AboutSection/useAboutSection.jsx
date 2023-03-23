import { useDispatch, useSelector } from 'react-redux';
import {
  getAllSettings,
  changeSettings,
  updateSettings,
} from '@/store/settings';
import { useNotification } from '@/commons/Notifications/NotificationProvider';

const useAboutSection = () => {
  const dispatch = useDispatch();
  const dispatchNotif = useNotification();

  // Data
  const sectionAbout = useSelector((state) =>
    state.settings.settings.filter((setting) => setting.type === 'sectionAbout')
  );
  const aboutSection = sectionAbout.reduce(
    (obj, cur) => ({ ...obj, [cur.feature]: cur }),
    {}
  );
  const sectionServices = useSelector((state) =>
    state.settings.settings.filter(
      (setting) => setting.type === 'sectionServices'
    )
  );
  const servicesSection = sectionServices.reduce(
    (obj, cur) => ({ ...obj, [cur.feature]: cur }),
    {}
  );
  const settings = useSelector((state) => state.settings.settings);

  // Methods
  const onCancel = () => {
    dispatch(getAllSettings());
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const updated = settings.findIndex((setting) => setting.updated === true);
    if (updated === -1) return;

    try {
      dispatch(updateSettings());
    } catch (error) {
      dispatchNotif({
        type: 'ERROR',
        message: error,
      });
    }
  };

  return {
    aboutSection,
    servicesSection,
    onSubmit,
    onCancel,
  };
};

export default useAboutSection;
