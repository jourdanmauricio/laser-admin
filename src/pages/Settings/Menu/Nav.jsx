import { FaBars } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
const Nav = () => {
  const data = useSelector((state) =>
    state.settings.settings.filter((setting) => setting.type === 'menu')
  );
  const menu = data.reduce((obj, cur) => ({ ...obj, [cur.feature]: cur }), {});

  const logoImage = useSelector((state) =>
    state.settings.settings.find((setting) => setting.feature === 'logoImage')
  );

  if (menu.bgColor) {
    document.documentElement.style.setProperty(
      '--navBgColor',
      menu.bgColor.value
    );
    document.documentElement.style.setProperty(
      '--navHoverColor',
      menu.hoverColor.value
    );
    document.documentElement.style.setProperty(
      '--navTextColor',
      menu.textColor.value
    );
    document.documentElement.style.setProperty(
      '--navCurrentPageColor',
      menu.currentPageColor.value
    );
  }

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
