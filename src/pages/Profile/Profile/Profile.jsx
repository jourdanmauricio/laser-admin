import { Modal } from '@/commons/Modal/Modal';
import ChangePassword from '../Profile/ChangePassword/ChangePassword';
import Spinner from '@/commons/Spinner/Spinner';
import AddPicture from '../Profile/AddPicture/AddPicture';
import useProfile from './useProfile';

const Profile = () => {
  const {
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
    closeModalPass,
    handleChange,
    handleCancel,
    handleSubmit,
    onChangeSttings,
  } = useProfile();
  return (
    <div className="mb-4">
      {status === 'loading' && <Spinner />}
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
                placeholder="Perfil en facebook"
                value={facebook?.value || ''}
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
                placeholder="Perfil en Instagram"
                value={instagram?.value || ''}
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
                placeholder="Perfil en Twitter"
                value={twitter?.value || ''}
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
                placeholder="Perfil en Whatsapp"
                value={whatsapp?.value || ''}
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
                placeholder="Email"
                value={email?.value || ''}
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
                value={phone?.value || ''}
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
    </div>
  );
};

export default Profile;
