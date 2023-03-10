import { useState } from 'react';
import { FaImages } from 'react-icons/fa';
import About from '../About/About';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllSections,
  updateSections,
  updateSubsections,
  createSubsection,
  setAction,
} from '@/store/sections';
import Services from '../Services/Services';
import { useNotification } from '@/commons/Notifications/NotificationProvider';
import { updateSettings } from '@/store/settings';
import Blog from '../Blog/Blog';

const Tabs = () => {
  const dispatch = useDispatch();
  const dispatchNotif = useNotification();
  const { action } = useSelector((state) => state.sections);
  const [newSubsection, setNewSubsection] = useState({});

  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const onCancel = () => {
    dispatch(getAllSections());
    dispatch(setAction({ action: 'SECTIONS' }));
  };

  const onChangeNewSubsection = (newSub) => {
    setNewSubsection(newSub);
  };

  const onSubmit = async () => {
    try {
      dispatch(updateSettings());
      if (action === 'NEW') {
        dispatch(createSubsection(newSubsection));
        dispatchNotif({
          type: 'SUCCESS',
          message: 'Servicio creado!',
        });
      } else {
        dispatch(updateSubsections());
        dispatchNotif({
          type: 'SUCCESS',
          message: 'Servicio modificado!',
        });
      }

      dispatch(setAction({ action: 'SECTIONS' }));
    } catch (error) {
      dispatchNotif({
        type: 'ERROR',
        message: error,
      });
    }
  };

  return (
    <>
      <div className="tabs__container">
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
            <span>Servicios</span>
          </div>

          <div
            onClick={() => toggleTab(3)}
            className={toggleState === 3 ? 'tabs active__tabs' : 'tabs'}
          >
            <FaImages color="teal" size={20} />
            <span>Entradas</span>
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
            <Services onChangeNewSubsection={onChangeNewSubsection} />
          </div>
          <div
            className={
              toggleState === 3
                ? 'tab__content active__content'
                : 'tab__content'
            }
          >
            <Blog onChangeNewSubsection={onChangeNewSubsection} />
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

        <button onClick={onSubmit} className="my-8 btn__primary" type="button">
          {action === 'NEW' ? 'Crear' : 'Modificar'}
        </button>
      </div>
    </>
  );
};

export default Tabs;
