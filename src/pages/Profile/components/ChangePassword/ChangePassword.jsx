import { useState } from 'react';
import { FaEyeSlash, FaEye } from 'react-icons/fa';

const ChangePassword = () => {
  const [shownPass, setPasswordShown] = useState({
    newPass: false,
    confirmPass: false,
  });
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [errorPass, setErrorPass] = useState(null);
  const [errorConfirmPass, setErrorConfirmPass] = useState(null);

  const handleChange = (name, value) => {
    if (name === 'newPass') {
      setNewPass(value);
      if (value.length < 8) {
        setErrorPass('Mínimo 8 caracteres');
      } else {
        setErrorPass(null);
      }
      if (confirmPass.length === 0) {
        setErrorConfirmPass(null);
      }
    }

    if (name === 'confirmPass') {
      setConfirmPass(value);
      if (newPass !== value) {
        setErrorConfirmPass('La confirmación no coindide');
      } else {
        setErrorConfirmPass(null);
      }
    }
  };

  return (
    <form className="bg-white p-5 flex justify-center items-center flex-col">
      <h2 className="form__title">Cambiar password</h2>
      <div className="form__group">
        <label className="form_label">Nueva contraseña</label>
        <i
          className="input__icon"
          onClick={() =>
            setPasswordShown({
              ...shownPass,
              newPass: !shownPass.newPass,
            })
          }
        >
          {shownPass.newPass ? <FaEye /> : <FaEyeSlash />}
        </i>
        <input
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          className={`form__input ${
            !errorPass ? 'border-gray-500' : 'border-red-500'
          }`}
          type={shownPass.newPass ? 'text' : 'password'}
          id="newPass"
          name="newPass"
          placeholder="Nueva contraseña"
        />
        <p
          className={`input__error ${errorPass ? 'opacity-100' : 'opacity-0'}`}
        >
          {errorPass}
        </p>
      </div>
      <div className="form__group">
        <label className="form_label">Confirmación contraseña</label>
        <i
          className="input__icon"
          onClick={() =>
            setPasswordShown({
              ...shownPass,
              confirmPass: !shownPass.confirmPass,
            })
          }
        >
          {shownPass.confirmPass ? <FaEye /> : <FaEyeSlash />}
        </i>

        <input
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          className={`form__input ${
            !errorConfirmPass ? 'border-gray-500 ' : 'border-red-500'
          }`}
          type={shownPass.confirmPass ? 'text' : 'password'}
          id="confirmPass"
          name="confirmPass"
          placeholder="Nueva contraseña"
        />
        <p
          className={`input__error ${
            errorConfirmPass ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {errorConfirmPass}
        </p>
      </div>

      <button className="mt-8 btn-primary" type="submit">
        Login
      </button>
    </form>
  );
};

export default ChangePassword;
