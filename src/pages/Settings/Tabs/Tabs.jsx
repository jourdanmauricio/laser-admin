import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSettings, setAction, updateSettings } from '@/store/settings';
import PagesSettings from '../PagesSettings/PagesSettings';
import Hero from '../Hero/Hero';
import Menu from '../Menu/Menu';
import Footer from '../Footer/Footer';
import {
  FaBars,
  FaRegFilePowerpoint,
  FaRegImage,
  FaRegWindowMinimize,
} from 'react-icons/fa';

const Tabs = () => {
  const dispatch = useDispatch();
  const [toggleState, setToggleState] = useState(1);

  // Data
  const settings = useSelector((state) => state.settings.settings);

  // Methods
  const toggleTab = (index) => {
    setToggleState(index);
  };
  const onCancel = () => {
    dispatch(getAllSettings());
    dispatch(setAction({ action: 'SETTINGS' }));
  };
  const onSubmit = () => {
    const updated = settings.findIndex((setting) => setting.updated === true);
    if (updated === -1) return;

    dispatch(updateSettings());
  };

  return (
    <>
      <div className="tabs__container">
        <div className="tabs__bloc">
          <div
            onClick={() => toggleTab(1)}
            className={toggleState === 1 ? 'tabs active__tabs' : 'tabs'}
          >
            <FaBars color="teal" size={20} />
            <span>Menú</span>
          </div>

          <div
            onClick={() => toggleTab(2)}
            className={toggleState === 2 ? 'tabs active__tabs' : 'tabs'}
          >
            <FaRegImage color="teal" size={20} />
            <span>Hero</span>
          </div>
          <div
            onClick={() => toggleTab(3)}
            className={toggleState === 3 ? 'tabs active__tabs' : 'tabs'}
          >
            <FaRegFilePowerpoint color="green" size={20} />
            <span>Páginas</span>
          </div>
          <div
            onClick={() => toggleTab(4)}
            className={toggleState === 4 ? 'tabs active__tabs' : 'tabs'}
          >
            <FaRegWindowMinimize color="green" size={20} />
            <span>Footer</span>
          </div>
        </div>
        <div className="tabs__content">
          <div
            className={
              toggleState === 1
                ? 'tab__content active__content'
                : 'tab__content'
            }
          >
            <Menu />
          </div>
          <div
            className={
              toggleState === 2
                ? 'tab__content active__content'
                : 'tab__content'
            }
          >
            <Hero />
          </div>
          <div
            className={
              toggleState === 3
                ? 'tab__content active__content'
                : 'tab__content'
            }
          >
            <PagesSettings />
          </div>
          <div
            className={
              toggleState === 4
                ? 'tab__content active__content'
                : 'tab__content'
            }
          >
            <Footer />
          </div>
        </div>
      </div>
      <div className="actions">
        <button
          onClick={onCancel}
          className="mt-8 btn__secondary"
          type="button"
        >
          Cancelar
        </button>

        <button onClick={onSubmit} className="mt-8 btn__primary" type="button">
          Modificar
        </button>
      </div>
    </>
  );
};

export default Tabs;
