import { useState } from 'react';
import {
  FaRegListAlt,
  FaBlogger,
  FaRegHospital,
  FaHospitalUser,
} from 'react-icons/fa';
import ClinicsSection from '../ClinicsSection/ClinicsSection';
import AboutSection from '../AboutSection/AboutSection';
import BlogSection from '../BlogSection/BlogSection';
import ServicesSection from '../ServicesSection/ServicesSection';

const Tabs = () => {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <>
      <div className="tabs__container">
        <div className="tabs__bloc">
          <div
            onClick={() => toggleTab(1)}
            className={toggleState === 1 ? 'tabs active__tabs' : 'tabs'}
          >
            <FaHospitalUser color="teal" size={20} />
            <span>Sobre Mi</span>
          </div>

          <div
            onClick={() => toggleTab(2)}
            className={toggleState === 2 ? 'tabs active__tabs' : 'tabs'}
          >
            <FaRegListAlt color="teal" size={20} />
            <span>Servicios</span>
          </div>

          <div
            onClick={() => toggleTab(3)}
            className={toggleState === 3 ? 'tabs active__tabs' : 'tabs'}
          >
            <FaBlogger color="teal" size={20} />
            <span>Blog</span>
          </div>

          <div
            onClick={() => toggleTab(4)}
            className={toggleState === 4 ? 'tabs active__tabs' : 'tabs'}
          >
            <FaRegHospital color="teal" size={20} />
            <span>Consultorios</span>
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
            <AboutSection />
          </div>
          <div
            className={
              toggleState === 2
                ? 'tab__content active__content'
                : 'tab__content'
            }
          >
            <ServicesSection />
          </div>
          <div
            className={
              toggleState === 3
                ? 'tab__content active__content'
                : 'tab__content'
            }
          >
            <BlogSection />
          </div>
          <div
            className={
              toggleState === 4
                ? 'tab__content active__content'
                : 'tab__content'
            }
          >
            <ClinicsSection />
          </div>
        </div>
      </div>

      {/* <div className="actions">
        <button
          onClick={onCancel}
          className="mt-8 btn__secondary"
          type="button"
        >
          Cancelar
        </button>

        <button onClick={onSubmit} className="my-8 btn__primary" type="button">
          {actionSections === 'SECTIONS' &&
            actionPosts === 'POSTS' &&
            actionClinics === 'CLINICS' &&
            'Modificar'}
          {actionSections === 'NEW' && 'Crear'}
          {actionSections === 'EDIT' && 'Modificar'}
          {actionPosts === 'NEW' && 'Crear'}
          {actionPosts === 'EDIT' && 'Modificar'}
          {actionClinics === 'NEW' && 'Crear'}
          {actionClinics === 'EDIT' && 'Modificar'}
        </button>
      </div> */}
    </>
  );
};

export default Tabs;
