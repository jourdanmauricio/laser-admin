import { useSelector } from 'react-redux';
import Layout from '@/components/Layout/layout';
import { Modal } from '@/commons/Modal/Modal';
import { useModal } from '@/hooks/useModal';
import ChangePassword from './ChangePassword/ChangePassword';

const Profile = () => {
  let user = useSelector((state) => state.user.user);
  const [isOpenModalPass, openModalPass, closeModalPass] = useModal(false);

  const handleCancel = () => {
    closeModalPass();
  };

  return (
    <Layout>
      <h1 className="text-2xl text-teal-800 text-center font-medium">Perfil</h1>
      <div className="w-full bg-slate-200 min-w-[300px] mt-4 p-4 rounded shadow-[0_1px_4px_rgba(0,0,0,0.16)]">
        <div className="flex justify-between items-center">
          <div>
            <p>
              Email: <span>{user.email}</span>
            </p>
            <p>
              Role: <span>{user.role}</span>
            </p>
          </div>
          <button onClick={() => openModalPass()} className="btn-primary">
            Cambiar password
          </button>
        </div>
      </div>

      <Modal isOpenModal={isOpenModalPass} closeModal={closeModalPass}>
        <ChangePassword handleCancel={handleCancel} />
      </Modal>
    </Layout>
  );
};

export default Profile;
