import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initEditSettings, putSettings } from '@/store/settings';
import { FaImages } from 'react-icons/fa';
import About from '../About/About';

const Tabs = () => {
  const [toggleState, setToggleState] = useState(1);
  const dispatch = useDispatch();
  const { status, editSettings } = useSelector((state) => state.settings);

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
            <span>Sobre Mi</span>
          </div>

          <div
            onClick={() => toggleTab(2)}
            className={toggleState === 2 ? 'tabs active__tabs' : 'tabs'}
          >
            <FaImages color="teal" size={20} />
            <span>Especilidades</span>
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
            <About />
          </div>
          <div
            className={
              toggleState === 2
                ? 'tab__content active__content'
                : 'tab__content'
            }
          >
            Especilidades
          </div>
        </div>
      </div>
    </>
  );
};

export default Tabs;
