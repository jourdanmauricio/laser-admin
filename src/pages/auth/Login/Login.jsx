import { Link, useNavigate } from 'react-router-dom';
import Spinner from '@/commons/Spinner/Spinner';
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import useLogin from './useLogin';

const Login = () => {
  const {
    statusUser,
    hasError,
    error,
    passwordShown,
    setPasswordShown,
    handleSubmit,
    handleChange,
  } = useLogin();

  return (
    <main className="flex justify-center h-screen w-full bg-slate-900">
      {statusUser === 'loading' && <Spinner />}
      <form
        className="text-center mt-24 h-max pt-12 px-10 pb-5 max-w[320px] bg-slate-800 rounded border border-gray-700 animation"
        onSubmit={handleSubmit}
        noValidate
      >
        <label className="text-white text-2xl text-center font-medium">
          Bienvedido!!!
        </label>

        <p
          className={`pt-[3px] text-[14px] 
				text-red-500 transition-opacity duration-1000 ease-in-out ${
          hasError ? 'opacity-100' : 'opacity-0'
        }`}
        >
          Usuario o constraseña incorrecto
        </p>

        <div className="relative py-4 px-0 text-left">
          <label className="block font-normal text-slate-300">Email</label>
          <input
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            className={`mt-0.5 py-2.5 px-2 w-full text-base border border-solid bg-slate-700 text-gray-300 rounded outline-none ${
              !error.email ? 'border-gray-500 ' : 'border-red-500'
            }`}
            type="email"
            id="email"
            name="email"
            placeholder="Ingrese su email"
          />
          <p
            className={`absolute block pt-[3px] text-xs text-red-500 transition-opacity duration-1000 ease-in-out ${
              error.email ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {error.email}
          </p>
        </div>

        <div className="relative py-4 px-0 text-left">
          <label className="block font-normal text-slate-300">Password</label>
          <i
            className="absolute right-0 p-4 min-w-[40px] text-slate-300"
            onClick={() => setPasswordShown(!passwordShown)}
          >
            {passwordShown ? <FaEyeSlash /> : <FaEye />}
          </i>
          <input
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            className={`mt-0.5 py-2.5 px-2 w-full text-base border border-solid bg-slate-700 text-gray-300 rounded outline-none ${
              !error.password ? 'border-gray-500 ' : 'border-red-500'
            }`}
            type={passwordShown ? 'text' : 'password'}
            id="password"
            name="password"
            placeholder="Ingrese su contraseña"
          />

          <p
            className={`absolute block pt-[3px] text-xs text-red-500 transition-opacity duration-1000 ease-in-out ${
              error.password ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {error.password}
          </p>
        </div>

        <button
          className="mt-8 py-2.5 px-4 text-base bg-purple-800 w-full border-none rounded text-white transition ease-in-out delay-100 hover:bg-purple-900 hover:cursor-pointer"
          type="submit"
        >
          Login
        </button>

        <Link
          to="/forgot-password"
          className="block no-underline mt-10 w-fit ml-auto text-sm text-slate-300 hover:underline"
        >
          Olvidó su contraseña?
        </Link>
      </form>
    </main>
  );
};

export default Login;
