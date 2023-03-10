import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
} from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const FooterPreview = () => {
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
          <p>
            Para suscribirte, simplemente ingresa tu dirección de correo
            electrónico en el campo provisto y haz clic en el botón Suscribir.
            No te pierdas la oportunidad de ser parte de nuestra comunidad y
            obtener acceso a contenido exclusivo. ¡Suscríbete hoy mismo!
          </p>
        </div>

        <div>
          <form action="">
            <div className="gird-cols-1 grid items-center justify-center gap-4 md:grid-cols-3">
              <div className="md:ml-auto md:mb-6">
                <p className="">
                  <strong>Suscríbite a nuestro newsletter</strong>
                </p>
              </div>

              <div className="relative md:mb-6" data-te-input-wrapper-init>
                <input
                  type="text"
                  className="peer block min-h-[auto] w-full rounded border border-footerTextColor bg-transparent py-[0.32rem] px-3 leading-[1.6] text-footerTextColor outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                  id="email"
                  placeholder="Email address"
                />
                <label
                  htmlFor="email"
                  className="pointer-events-none bg-footerBgColor absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate mt-[0.37rem] px-1 leading-[1.6] text-footerTextColor transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-footerTextColor peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none"
                >
                  Email address
                </label>
              </div>

              <div className="mb-6 md:mr-auto">
                <button
                  type="submit"
                  className="inline-block rounded border-2 border-footerButtonsColor px-6 pt-2 pb-[6px] text-xs font-medium uppercase leading-normal text-footerButtonsColor transition duration-150 ease-in-out bg-transparent hover:bg-footerButtonsHoverColor focus:ring-0 active:border-neutral-200 active:text-neutral-200"
                  // dark:hover:bg-neutral-100 dark:hover:bg-opacity-10
                  data-te-ripple-init
                  data-te-ripple-color="light"
                >
                  Suscribir
                </button>
              </div>
            </div>
          </form>
        </div>

        <h5 className="mb-2.5 font-bold uppercase">Links</h5>
        <div className="grid sm:grid-cols-1 md:grid-cols-2">
          <div className="mb-6">
            <ul className="mb-0 list-none">
              <li>
                <Link
                  href="#"
                  className="text-white text-footerLinksColor hover:underline hover:text-footerLinksHoverColor"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-white text-footerLinksColor hover:underline hover:text-footerLinksHoverColor"
                >
                  Sobre mi
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-white text-footerLinksColor hover:underline hover:text-footerLinksHoverColor"
                >
                  Servicios
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-white text-footerLinksColor hover:underline hover:text-footerLinksHoverColor"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-white text-footerLinksColor hover:underline hover:text-footerLinksHoverColor"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div className="mb-6">
            <ul className="mb-0 list-none">
              <li>
                <Link
                  href="/proteccion-datos"
                  className="text-white text-footerLinksColor hover:underline hover:text-footerLinksHoverColor"
                >
                  Protección de datos
                </Link>
              </li>
              <li>
                <Link
                  href="/politicas-privacidad"
                  className="text-white text-footerLinksColor hover:underline hover:text-footerLinksHoverColor"
                >
                  Política de privacidad
                </Link>
              </li>
              <li>
                <Link
                  href="/politicas-cookies"
                  className="text-white text-footerLinksColor hover:underline hover:text-footerLinksHoverColor"
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
