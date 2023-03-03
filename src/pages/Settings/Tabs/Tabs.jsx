import { useEffect, useState } from 'react';
import { FaImages } from 'react-icons/fa';
import Spinner from '@/commons/Spinner/Spinner';
import Hero from '../Hero/Hero';
import { useDispatch, useSelector } from 'react-redux';
import { initEditSettings, putSettings } from '@/store/settings';
import Menu from '../Menu/Menu';
import General from '../General/General';

const Tabs = () => {
  const [toggleState, setToggleState] = useState(1);
  const { status, editSettings } = useSelector((state) => state.settings);
  const dispatch = useDispatch();

  useEffect(() => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const typeParam = params.get('type');
    if (typeParam) {
      if (typeParam === 'heroImage') setToggleState(2);
      if (typeParam === 'logoImage') setToggleState(1);
    } else {
      setToggleState(1);
    }
  }, []);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const onCancel = () => {
    dispatch(initEditSettings());
  };

  const onSubmit = () => {
    dispatch(putSettings(editSettings));
  };

  return (
    <>
      <div className="tabs__container">
        {status === 'loading' && <Spinner />}
        <div className="tabs__bloc">
          <div
            onClick={() => toggleTab(1)}
            className={toggleState === 1 ? 'tabs active__tabs' : 'tabs'}
          >
            <FaImages color="teal" size={20} />
            <span>Menú</span>
          </div>

          <div
            onClick={() => toggleTab(2)}
            className={toggleState === 2 ? 'tabs active__tabs' : 'tabs'}
          >
            <FaImages color="teal" size={20} />
            <span>Hero</span>
          </div>
          <div
            onClick={() => toggleTab(3)}
            className={toggleState === 3 ? 'tabs active__tabs' : 'tabs'}
          >
            <FaImages color="green" size={20} />
            <span>General</span>
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
            <General />
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
