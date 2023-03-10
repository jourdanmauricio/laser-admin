import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '@/components/Layout/layout';
import { Modal } from '@/commons/Modal/Modal';
import { useModal } from '@/hooks/useModal';
import ChangePassword from './ChangePassword/ChangePassword';
import { useNotification } from '@/commons/Notifications/NotificationProvider';
import { delMessage, updProfile } from '@/store/user';
import Spinner from '@/commons/Spinner/Spinner';
import AddPicture from './AddPicture/AddPicture';
import { changeSettings, updateSettings } from '@/store/settings';

const Profile = () => {
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

  return (
    <Layout>
      {status === 'loading' && <Spinner />}
      <h1 className="text-2xl text-teal-800 text-center font-medium">Perfil</h1>
      <div className="w-full bg-slate-200 min-w-[300px] mt-4 p-4 rounded shadow-[0_1px_4px_rgba(0,0,0,0.16)]">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <p>
              Email: <span>{user.email}</span>
            </p>
            <p>
              Role: <span>{user.role}</span>
            </p>
          </div>
          <button onClick={() => openModalPass()} className="btn__primary">
            Cambiar password
          </button>
        </div>
      </div>

      <div className="w-full bg-slate-200 min-w-[300px] mt-4 p-4 rounded shadow-[0_1px_4px_rgba(0,0,0,0.16)]">
        <div className="flex flex-col sm:flex-row gap-10">
          <div className="w-full sm:w-1/2">
            <div className="form__group w-full">
              <label className="form__label">Nombre</label>
              <input
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                className={`form__input ${
                  !error.name ? 'border-gray-500' : 'border-red-500'
                }`}
                type="text"
                id="name"
                name="name"
                placeholder="Nombre completo"
                value={profile.name || ''}
              />
              <p
                className={`input__error ${
                  error.name ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {error.name}
              </p>
            </div>

            <AddPicture profile={profile} error={error} />
          </div>
          <div className="w-full sm:w-1/2">
            <div className="form__group w-full">
              <label className="form__label">Facebook</label>
              <input
                onChange={(e) => onChangeSttings(e.target.name, e.target.value)}
                className={`form__input ${
                  !error.name ? 'border-gray-500' : 'border-red-500'
                }`}
                type="text"
                name="facebook"
                placeholder="Nombre completo"
                value={facebook.value || ''}
              />
              <p
                className={`input__error ${
                  error.name ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {error.name}
              </p>
            </div>
            <div className="form__group w-full">
              <label className="form__label">Instagram</label>
              <input
                onChange={(e) => onChangeSttings(e.target.name, e.target.value)}
                className={`form__input ${
                  !error.name ? 'border-gray-500' : 'border-red-500'
                }`}
                type="text"
                name="instagram"
                placeholder="Nombre completo"
                value={instagram.value || ''}
              />
              <p
                className={`input__error ${
                  error.name ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {error.name}
              </p>
            </div>
            <div className="form__group w-full">
              <label className="form__label">Twitter</label>
              <input
                onChange={(e) => onChangeSttings(e.target.name, e.target.value)}
                className={`form__input ${
                  !error.name ? 'border-gray-500' : 'border-red-500'
                }`}
                type="text"
                name="twitter"
                placeholder="Nombre completo"
                value={twitter.value || ''}
              />
              <p
                className={`input__error ${
                  error.name ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {error.name}
              </p>
            </div>
            <div className="form__group w-full">
              <label className="form__label">Whatsapp</label>
              <input
                onChange={(e) => onChangeSttings(e.target.name, e.target.value)}
                className={`form__input ${
                  !error.name ? 'border-gray-500' : 'border-red-500'
                }`}
                type="text"
                name="whatsapp"
                placeholder="Nombre completo"
                value={whatsapp.value || ''}
              />
              <p
                className={`input__error ${
                  error.name ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {error.name}
              </p>
            </div>
            <div className="form__group w-full">
              <label className="form__label">Email</label>
              <input
                onChange={(e) => onChangeSttings(e.target.name, e.target.value)}
                className={`form__input ${
                  !error.name ? 'border-gray-500' : 'border-red-500'
                }`}
                type="text"
                name="email"
                placeholder="Nombre completo"
                value={email.value || ''}
              />
              <p
                className={`input__error ${
                  error.name ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {error.name}
              </p>
            </div>
            <div className="form__group w-full">
              <label className="form__label">Teléfono</label>
              <input
                onChange={(e) => onChangeSttings(e.target.name, e.target.value)}
                className={`form__input ${
                  !error.name ? 'border-gray-500' : 'border-red-500'
                }`}
                type="text"
                name="phone"
                placeholder="Teléfono"
                value={phone.value || ''}
              />
              <p
                className={`input__error ${
                  error.name ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {error.name}
              </p>
            </div>
          </div>
        </div>
        <button
          onClick={handleSubmit}
          type="button"
          className="btn__primary block mt-10 ml-auto"
        >
          Modificar
        </button>
      </div>

      <Modal isOpenModal={isOpenModalPass} closeModal={closeModalPass}>
        <ChangePassword handleCancel={handleCancel} />
      </Modal>
    </Layout>
  );
};

export default Profile;
