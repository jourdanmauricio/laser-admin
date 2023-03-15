import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '@/hooks/useModal';
import { useNotification } from '@/commons/Notifications/NotificationProvider';
import { delMessage, updProfile } from '@/store/user';
import { changeSettings, updateSettings } from '@/store/settings';

const useProfile = () => {
  const [error, setError] = useState({ name: null });
  const [profile, setProfile] = useState({});
  const dispatch = useDispatch();
  const dispatchNotif = useNotification();
  const [isOpenModalPass, openModalPass, closeModalPass] = useModal(false);
  let { user, message, status } = useSelector((state) => state.user);

  const instagram = useSelector((state) =>
    state.settings.settings.find((setting) => setting.feature === 'instagram')
  );
  const facebook = useSelector((state) =>
    state.settings.settings.find((setting) => setting.feature === 'facebook')
  );
  const twitter = useSelector((state) =>
    state.settings.settings.find((setting) => setting.feature === 'twitter')
  );
  const whatsapp = useSelector((state) =>
    state.settings.settings.find((setting) => setting.feature === 'whatsapp')
  );
  const email = useSelector((state) =>
    state.settings.settings.find((setting) => setting.feature === 'email')
  );
  const phone = useSelector((state) =>
    state.settings.settings.find((setting) => setting.feature === 'phone')
  );

  useEffect(() => {
    console.log('User', user);
    if (user) setProfile({ id: user.id, name: user.name, image: user.image });
  }, [user]);

  useEffect(() => {
    if (message) {
      dispatchNotif({
        type: status === 'success' ? 'SUCCESS' : 'ERROR',
        message,
      });
      dispatch(delMessage());
    }
  }, [message]);

  const handleChange = (name, value) => {
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const handleCancel = () => {
    closeModalPass();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updProfile({ id: profile.id, name: profile.name, image: profile.image })
    );
    dispatch(updateSettings());
  };

  const onChangeSttings = (feature, value) => {
    dispatch(changeSettings({ feature, value }));
  };
  return {
    error,
    profile,
    isOpenModalPass,
    openModalPass,
    user,
    status,
    instagram,
    facebook,
    twitter,
    whatsapp,
    email,
    phone,
    handleChange,
    handleCancel,
    handleSubmit,
    onChangeSttings,
    closeModalPass,
  };
};

export default useProfile;
