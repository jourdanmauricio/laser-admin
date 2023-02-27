import { FaBars } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
const Nav = () => {
  const { editSettings } = useSelector((state) => state.settings);
  const logoImage = editSettings.find(
    (setting) => setting.feature === 'logoImage'
  );
  const navBgColor = editSettings.find(
    (setting) => setting.feature === 'navBgColor'
  );
  const navTextColor = editSettings.find(
    (setting) => setting.feature === 'navTextColor'
  );
  const navHoverColor = editSettings.find(
    (setting) => setting.feature === 'navHoverColor'
  );
  const navCurrentPageColor = editSettings.find(
    (setting) => setting.feature === 'navCurrentPageColor'
  );
  document.documentElement.style.setProperty('--navBgColor', navBgColor.value);
  document.documentElement.style.setProperty(
    '--navHoverColor',
    navHoverColor.value
  );
  document.documentElement.style.setProperty(
    '--navTextColor',
    navTextColor.value
  );
  document.documentElement.style.setProperty(
    '--navCurrentPageColor',
    navCurrentPageColor.value
  );

  return (
    <>
      <div className="h-10 bg-navBgColor flex items-center justify-end gap-4 text-navTextColor">
        <span className="text-sm">02262-45-4545</span>
        <span className="text-sm mr-4">laura@gmail.com</span>
      </div>
      <nav className="menu">
        <div>
          <FaBars className="text-blue-500 text-2xl menu__icon" />
        </div>
        <img
          className="hidden sm:block"
          width={300}
          height={40}
          // src="/images/logo_desktop.png"
          src={logoImage.value}
          alt="logo"
        />
        <div className="menu__desktop">
          <ul className="menu__ul">
            <li className="menu__link border-b border-solid border-navCurrentPageColor">
              <Link className="menu__item" href="#">
                Inicio
              </Link>
            </li>
            <li className="menu__link">
              <Link className="menu__item" href="#">
                Sobre mi
              </Link>
            </li>
            <li className="menu__link">
              <Link className="menu__item" href="#">
                Servicios
              </Link>
            </li>
            <li className="menu__link">
              <Link className="menu__item" href="#">
                Blog
              </Link>
            </li>
            <li className="menu__link">
              <Link className="menu__item" href="#">
                Contacto
              </Link>
            </li>
          </ul>
        </div>

        <button className="text-navTextColor hover:text-navHoverColor p-2">
          <p>Solicitar</p>
          <p>consulta</p>
        </button>
      </nav>
    </>
  );
};

export default Nav;
