import { useState } from 'react';
import Spinner from '@/commons/Spinner/Spinner';
import { Link } from 'react-router-dom';
import { variables } from '@/config/variables';

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(null);
  const [messageOk, setMessageOk] = useState(null);
  const [messageErr, setMessageErr] = useState(null);

  const URL = `${variables.basePath}/auth/recovery`;

  function handleChange(name, value) {
    if (name === 'email') {
      const pattern =
        '^[a-z0-9]+(.[_a-z0-9]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,15})$';
      setEmail(value);
      let regex = new RegExp(pattern);
      regex.exec(value) === null
        ? setEmailError('Ingresa un email válido')
        : setEmailError(null);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessageErr(null);

    let error = false;
    if (email.length === 0) {
      setEmailError('Obligatorio');
      error = true;
    }

    if (error || emailError !== null) return;

    setLoading(true);
    try {
      const options = {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch(URL, options);
      const resRecovery = await response.json();
      if (resRecovery.statusCode) throw resRecovery;
      setMessageOk(
        'Email enviado!. Sigue las instrucciones para generar la contraseña.'
      );
    } catch (error) {
      setMessageErr('Verifique la dirección de email');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex justify-center h-screen w-full bg-slate-900">
      {loading && <Spinner />}
      <form
        className="text-center mt-24 h-max pt-12 px-10 pb-5 max-w[320px] bg-slate-800 rounded border border-gray-700 animation"
        onSubmit={handleSubmit}
        noValidate
      >
        <label className="text-white text-2xl text-center font-medium">
          Bienvedido!!!
        </label>
        <span className="h-[50px] text-white">
          <p
            className={`pt-[3px] text-sm transition-opacity ${
              messageOk ? 'text-teal-500 opacity-100' : 'opacity-0'
            } `}
          >
            {messageOk}
          </p>
          <p
            className={`pt-[3px] text-sm transition-opacity  ${
              messageErr ? 'text-red-500 opacity-100' : 'opacity-0'
            }`}
          >
            {messageErr}
          </p>
        </span>

        <div className="relative py-4 px-0 text-left">
          <label className="block font-normal text-slate-300">Email</label>
          <input
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            className={`mt-0.5 py-2.5 px-2 w-full text-base border border-solid bg-slate-700 text-gray-300 rounded outline-none ${
              !emailError ? 'border-gray-500 ' : 'border-red-500'
            }`}
            type="email"
            id="email"
            name="email"
            placeholder="Ingrese su email"
          />
          <p
            className={`absolute block pt-[3px] text-xs text-red-500 transition-opacity duration-1000 ease-in-out ${
              emailError ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {emailError}
          </p>
        </div>

        <button
          className="mt-8 py-2.5 px-4 text-base bg-purple-800 w-full border-none rounded text-white transition ease-in-out delay-100 hover:bg-purple-900 hover:cursor-pointer"
          type="submit"
          disabled={messageOk}
        >
          Cambiar password
        </button>

        <Link
          to="/"
          className="block no-underline mt-10 w-fit ml-auto text-sm text-slate-300 hover:underline"
        >
          Posee una cuenta? Login
        </Link>
      </form>
    </main>
  );
};

export default ForgotPassword;
