import { useState } from 'react';
import { FaImages } from 'react-icons/fa';
import Spinner from '@/commons/Spinner/Spinner';
import Images from '../Images/Images';
import { useDispatch, useSelector } from 'react-redux';
import { initEditSettings, putSettings } from '../../../store/settings';

const Tabs = () => {
  const { status, editSettings } = useSelector((state) => state.settings);
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const dispatch = useDispatch();

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
            <span>Imágenes</span>
          </div>
          {/* <div
          onClick={() => toggleTab(2)}
          className={toggleState === 2 ? 'tabs active__tabs' : 'tabs'}
        >
          <FaImages color="green" size={20} />
          <span>Galería</span>
        </div>*/}
        </div>
        <div className="tabs__content">
          <div
            className={
              toggleState === 1
                ? 'tab__content active__content'
                : 'tab__content'
            }
          >
            <Images />
          </div>
          {/* <div
          className={
            toggleState === 2 ? 'tab__content active__content' : 'tab__content'
          }
        >
          <Gallery
            images={images}
            handleDelete={handleDelete}
            selected={selected}
            setSelected={setSelected}
            isOpenModalDelete={isOpenModalDelete}
            openModalDelete={openModalDelete}
            closeModalDelete={closeModalDelete}
            isOpenModalDetail={isOpenModalDetail}
            openModalDetail={openModalDetail}
            closeModalDetail={closeModalDetail}
          />
        </div> */}
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
