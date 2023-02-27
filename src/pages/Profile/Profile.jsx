import axios from 'axios';
import { variables } from '@/config/variables';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '@/components/Layout/layout';
import { Modal } from '@/commons/Modal/Modal';
import { useModal } from '@/hooks/useModal';
import ChangePassword from './ChangePassword/ChangePassword';
import UploadImage from '@/commons/UploadImage/UploadImage';
import { useNotification } from '@/commons/Notifications/NotificationProvider';
import { delMessage, updProfile } from '../../store/user';
import Spinner from '@/commons/Spinner/Spinner';
import AddPicture from './AddPicture/AddPicture';

const Profile = () => {
  const [error, setError] = useState({ name: null });
  const [profile, setProfile] = useState({});
  const [picture, setPicture] = useState(null);
  const dispatch = useDispatch();
  const dispatchNotif = useNotification();
  const [isOpenModalPass, openModalPass, closeModalPass] = useModal(false);
  let { user, message, status } = useSelector((state) => state.user);

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
        <form onSubmit={handleSubmit}>
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

          <button type="submit" className="btn__primary block mt-10 ml-auto">
            Modificar
          </button>
        </form>
      </div>
      <Modal isOpenModal={isOpenModalPass} closeModal={closeModalPass}>
        <ChangePassword handleCancel={handleCancel} />
      </Modal>
    </Layout>
  );
};

export default Profile;
