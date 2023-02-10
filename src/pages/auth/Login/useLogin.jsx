import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '@/commons/Notifications/NotificationProvider';
import { signIn } from '@/store/user';
import { getSettings } from '@/store/settings';

const useLogin = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [credentials, setCredentials] = useState({
    email: null,
    password: null,
  });

  const [error, setError] = useState({
    name: null,
    email: null,
  });
  const [hasError, setHasError] = useState(false);

  let dispatch = useDispatch();
  // let user = useSelector((state) => state.user.user);
  let statusUser = useSelector((state) => state.user.status);
  let navigate = useNavigate();

  const dispatchNotif = useNotification();

  useEffect(() => {
    console.log('statusUser', statusUser);
    if (statusUser === 'failed') setHasError(true);
    if (statusUser === 'success') {
      dispatchNotif({
        type: 'SUCCESS',
        message: 'Bievenido!!! 💙',
      });

      navigate('/dashboard');
    }
  }, [statusUser]);

  function handleChange(name, value) {
    setCredentials({
      ...credentials,
      [name]: value,
    });

    if (name === 'email') {
      const pattern =
        '^[a-z0-9]+(.[_a-z0-9]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,15})$';

      let regex = new RegExp(pattern);
      regex.exec(value) === null
        ? setError({
            ...error,
            [name]: 'Ingresa un email válido',
          })
        : setError({
            ...error,
            [name]: null,
          });
    }
    if (name === 'password') {
      if (value.length < 8) {
        setError({
          ...error,
          [name]: 'Mínimo 8 caracteres',
        });

        return;
      }
      setError({
        ...error,
        [name]: null,
      });
    }
  }

  async function isMatch() {
    // Login
    await dispatch(signIn(credentials));
    dispatch(getSettings());
  }

  function handleSubmit(e) {
    e.preventDefault();

    let formError = false;
    if (credentials.email.length === 0) {
      setError({
        ...error,
        email: 'Obligatorio',
      });
      formError = true;
    }
    if (credentials.password.length === 0) {
      setError({
        ...error,
        password: 'Obligatorio',
      });
      formError = true;
    }

    if (formError || error.email !== null || error.password !== null) return;

    isMatch();
  }

  return {
    statusUser,
    hasError,
    credentials,
    error,
    passwordShown,
    setPasswordShown,
    handleSubmit,
    handleChange,
  };
};

export default useLogin;
