import { useEffect, useState } from 'react';
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
} from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createSubscriber } from '@/services/api/newsletter.api';
import SpinnerComp from '@/commons/Spinner/SpinnerComp';

const FooterPreview = () => {
  const [action, setAction] = useState('form');
  const [formMsg, setFormMsg] = useState(null);

  const [suscribe, setSuscribe] = useState({
    name: '',
    email: '',
    status: 'Activo',
  });
  const [error, setError] = useState({
    name: null,
    email: null,
  });

  const footerBgColor = useSelector((state) =>
    state.settings.settings.find(
      (setting) => setting.feature === 'footerBgColor'
    )
  );
  const footerTextColor = useSelector((state) =>
    state.settings.settings.find(
      (setting) => setting.feature === 'footerTextColor'
    )
  );
  const footerButtonsColor = useSelector((state) =>
    state.settings.settings.find(
      (setting) => setting.feature === 'footerButtonsColor'
    )
  );
  const footerButtonsHoverColor = useSelector((state) =>
    state.settings.settings.find(
      (setting) => setting.feature === 'footerButtonsHoverColor'
    )
  );
  const footerLinksColor = useSelector((state) =>
    state.settings.settings.find(
      (setting) => setting.feature === 'footerLinksColor'
    )
  );
  const footerLinksHoverColor = useSelector((state) =>
    state.settings.settings.find(
      (setting) => setting.feature === 'footerLinksHoverColor'
    )
  );
  const footer2BgColor = useSelector((state) =>
    state.settings.settings.find(
      (setting) => setting.feature === 'footer2BgColor'
    )
  );
  const footer2TextColor = useSelector((state) =>
    state.settings.settings.find(
      (setting) => setting.feature === 'footer2TextColor'
    )
  );

  if (footerBgColor) {
    document.documentElement.style.setProperty(
      '--footerBgColor',
      footerBgColor.value
    );
    document.documentElement.style.setProperty(
      '--footerTextColor',
      footerTextColor.value
    );
    document.documentElement.style.setProperty(
      '--footerButtonsColor',
      footerButtonsColor.value
    );
    document.documentElement.style.setProperty(
      '--footerButtonsHoverColor',
      footerButtonsHoverColor.value
    );
    document.documentElement.style.setProperty(
      '--footerLinksColor',
      footerLinksColor.value
    );
    document.documentElement.style.setProperty(
      '--footerLinksHoverColor',
      footerLinksHoverColor.value
    );
    document.documentElement.style.setProperty(
      '--footer2BgColor',
      footer2BgColor.value
    );
    document.documentElement.style.setProperty(
      '--footer2TextColor',
      footer2TextColor.value
    );
  }

  const facebook = useSelector((state) =>
    state.settings.settings.find((setting) => setting.feature === 'facebook')
  );
  const instagram = useSelector((state) =>
    state.settings.settings.find((setting) => setting.feature === 'instagram')
  );
  const twitter = useSelector((state) =>
    state.settings.settings.find((setting) => setting.feature === 'twitter')
  );
  const whatsapp = useSelector((state) =>
    state.settings.settings.find((setting) => setting.feature === 'whatsapp')
  );

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const pattern = e.target.pattern || e.target.dataset.pattern;
    const textError = e.target.title;

    setSuscribe({
      ...suscribe,
      [name]: value,
    });

    if (!e.target.required && !pattern) {
      setError({
        ...error,
        [name]: null,
      });
      return;
    }

    if (e.target.required && value === '') {
      setError({
        ...error,
        [name]: 'Requerido',
      });
      return;
    }

    let regex = new RegExp(pattern);
    if (regex.exec(value) === null) {
      setError({
        ...error,
        [name]: textError,
      });
      console.log('textError', textError);
    } else {
      setError({
        ...error,
        [name]: null,
      });
    }
  };

  useEffect(() => {
    if (formMsg) {
      const timeout = setTimeout(() => {
        setFormMsg(null);
        setAction('form');
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [formMsg]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formError = false;
    let fieldsErrors = Object.assign({}, error);
    const fields = ['name', 'email'];
    for (let field of fields) {
      if (suscribe[field].trim() === '') {
        formError = true;
        console.log('nulo', field);
        fieldsErrors = {
          ...fieldsErrors,
          [field]: 'Requerido',
        };
      }
      if (error[field]) {
        formError = true;
      }
    }

    if (formError === true) {
      setError(fieldsErrors);
      return;
    }

    try {
      console.log('TRY');
      setAction('loading');
      const suscriber = await createSubscriber(suscribe);

      setFormMsg('Formulario enviado!. Pronto recibirás novedades.');
    } catch (error) {
      setFormMsg('Error enviando el formulario');
    } finally {
      setAction('msg');
    }
  };

  return (
    <footer className="bg-footerBgColor text-center text-footerTextColor">
      <div className="container px-6 pt-6">
        <div className="mb-6 flex justify-center">
          {facebook?.value.length > 0 && (
            <Link
              className="m-2 h-9 w-9 rounded-full border-2 border-footerButtonsColor uppercase leading-normal text-footerButtonsColor transition duration-150 ease-in-out hover:bg-footerButtonsHoverColor hover:bg-opacity-50 outline-none focus:ring-0 flex justify-center items-center"
              href="#"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF className="mx-auto text-footerButtonsColor text-lg active:text-neutral-200" />
            </Link>
          )}
          {instagram?.value.length > 0 && (
            <Link
              className="m-2 h-9 w-9 rounded-full border-2 border-footerButtonsColor uppercase leading-normal text-footerButtonsColor transition duration-150 ease-in-out hover:bg-footerButtonsHoverColor hover:bg-opacity-50 outline-none focus:ring-0 flex justify-center items-center "
              href="#"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="mx-auto text-footerButtonsColor text-lg" />
            </Link>
          )}
          {twitter?.value.length > 0 && (
            <Link
              className="m-2 h-9 w-9 rounded-full border-2 border-footerButtonsColor uppercase leading-normal text-footerButtonsColor transition duration-150 ease-in-out hover:bg-footerButtonsHoverColor hover:bg-opacity-50 outline-none focus:ring-0 flex justify-center items-center"
              href="#"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="mx-auto text-footerButtonsColor text-lg" />
            </Link>
          )}
          {whatsapp?.value.length > 0 && (
            <Link
              className="m-2 h-9 w-9 rounded-full border-2 border-footerButtonsColor uppercase leading-normal text-footerButtonsColor transition duration-150 ease-in-out hover:bg-footerButtonsHoverColor hover:bg-opacity-50 outline-none focus:ring-0 flex justify-center items-center"
              href="#"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp className="mx-auto text-footerButtonsColor text-lg" />
            </Link>
          )}
        </div>

        <div className="mb-6">
          <p>
            ¡Suscríbete a nuestro boletín informativo y mantente actualizado con
            las últimas noticias, promociones y eventos! Recibirás contenido
            exclusivo directamente en tu bandeja de entrada, incluyendo
            artículos interesantes, consejos y ofertas especiales.{' '}
          </p>
          <p className="pt-8">
            Para suscribirte, simplemente ingresa tu dirección de correo
            electrónico en el campo provisto y haz clic en el botón Suscribir.
            No te pierdas la oportunidad de ser parte de nuestra comunidad y
            obtener acceso a contenido exclusivo. ¡Suscríbete hoy mismo!
          </p>
        </div>

        <div className="mb-6 mt-8">
          <h4>
            <strong>Suscríbite a nuestro newsletter</strong>
          </h4>
          {action === 'loading' && <SpinnerComp />}
          {action === 'msg' && (
            <h4
              id="form-rta"
              className="text-teal-500 text-2xl w-5/6 h-4/6 mx-auto text-center"
            >
              {formMsg}
            </h4>
          )}
          {action === 'form' && (
            <form onSubmit={handleSubmit} noValidate>
              <div className="pt-10 flex flex-col sm:flex-row items-center justify-center gap-10 sm:gap-4">
                <div className="relative">
                  <input
                    type="text"
                    className="min-h-[auto] w-full rounded border border-footerTextColor bg-transparent py-[0.32rem] px-3 leading-[1.6] text-footerTextColor outline-none block dark:focus:border-footerLinksHoverColor focus:outline-none focus:ring-0 focus:border-footerLinksHoverColor peer"
                    id="name"
                    name="name"
                    title="Ingresa solo letras"
                    pattern="^[A-Za-zÑñÁáÉéÍíÓóÚú\s]+$"
                    placeholder=" "
                    required
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="name"
                    className="absolute text-footerLinksHoverColor  duration-300 transform -translate-y-7 scale-90 top-1.5 z-10 origin-[0_0] left-3 mb-0 peer-focus:text-footerLinksHoverColor peer-focus:dark:text-footerLinksHoverColor peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-7"
                  >
                    Nombre
                  </label>
                  <span
                    className={`form__error text-base scale-90 ${
                      error.name ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    {error.name}
                  </span>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    className="min-h-[auto] w-full rounded border border-footerTextColor bg-transparent py-[0.32rem] px-3 leading-[1.6] text-footerTextColor outline-none block dark:focus:border-footerLinksHoverColor focus:outline-none focus:ring-0 focus:border-footerLinksHoverColor peer"
                    id="email"
                    name="email"
                    title="Ingresa un email válido"
                    pattern="^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$"
                    placeholder=" "
                    required
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="email"
                    className="absolute text-footerLinksHoverColor  duration-300 transform -translate-y-7 scale-90 top-1.5 z-10 origin-[0_0] left-3 mb-0 peer-focus:text-footerLinksHoverColor peer-focus:dark:text-footerLinksHoverColor peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-7"
                  >
                    Email address
                  </label>
                  <span
                    className={`form__error text-base scale-90 ${
                      error.email ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    {error.email}
                  </span>
                </div>

                <button
                  type="submit"
                  className="inline-block rounded border-2 border-footerButtonsColor px-6 pt-2 pb-[6px] text-xs font-medium uppercase leading-normal text-footerButtonsColor transition duration-150 ease-in-out bg-transparent hover:bg-footerButtonsHoverColor focus:ring-0 active:border-neutral-200 active:text-neutral-200"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                >
                  Suscribir
                </button>
              </div>
            </form>
          )}
        </div>
        <h4 className="mb-2.5 pt-10 font-bold uppercase">Links</h4>
        <div className="grid sm:grid-cols-1 md:grid-cols-2">
          <div className="mb-6">
            <ul className="mb-0 list-none w-fit m-auto text-left">
              <li>
                <Link
                  href="/"
                  className="text-footerLinksColor hover:underline hover:text-footerLinksHoverColor"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-footerLinksColor hover:underline hover:text-footerLinksHoverColor"
                >
                  Sobre mi
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-footerLinksColor hover:underline hover:text-footerLinksHoverColor"
                >
                  Servicios
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-footerLinksColor hover:underline hover:text-footerLinksHoverColor"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-footerLinksColor hover:underline hover:text-footerLinksHoverColor"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div className="mb-6">
            <ul className="mb-0 list-none w-fit m-auto text-left">
              <li>
                <Link
                  href="/proteccion-datos"
                  className="text-footerLinksColor hover:underline hover:text-footerLinksHoverColor"
                >
                  Protección de datos
                </Link>
              </li>
              <li>
                <Link
                  href="/politicas-privacidad"
                  className="text-footerLinksColor hover:underline hover:text-footerLinksHoverColor"
                >
                  Política de privacidad
                </Link>
              </li>
              <li>
                <Link
                  href="/politicas-cookies"
                  className="text-footerLinksColor hover:underline hover:text-footerLinksHoverColor"
                >
                  Política de cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="p-4 text-center bg-footer2BgColor text-footer2TextColor">
        © 2023 Copyright: Derechos reservados
      </div>
    </footer>
  );
};

export default FooterPreview;
