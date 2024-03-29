import { useState } from 'react';
import {
  FaRegListAlt,
  FaBlogger,
  FaRegHospital,
  FaHospitalUser,
  FaIdCard,
} from 'react-icons/fa';
import ClinicsSection from '../ClinicsSection/ClinicsSection';
import AboutSection from '../AboutSection/AboutSection';
import BlogSection from '../BlogSection/BlogSection';
import ServicesSection from '../ServicesSection/ServicesSection';
import TestimonialsSection from '../TestimonialsSection/TestimonialsSection';

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
            <span className="hidden sm:inline-block">Sobre Mi</span>
          </div>

          <div
            onClick={() => toggleTab(2)}
            className={toggleState === 2 ? 'tabs active__tabs' : 'tabs'}
          >
            <FaRegListAlt color="teal" size={20} />
            <span className="hidden sm:inline-block">Servicios</span>
          </div>

          <div
            onClick={() => toggleTab(3)}
            className={toggleState === 3 ? 'tabs active__tabs' : 'tabs'}
          >
            <FaBlogger color="teal" size={20} />
            <span className="hidden sm:inline-block">Blog</span>
          </div>

          <div
            onClick={() => toggleTab(4)}
            className={toggleState === 4 ? 'tabs active__tabs' : 'tabs'}
          >
            <FaRegHospital color="teal" size={20} />
            <span className="hidden sm:inline-block">Consultorios</span>
          </div>
          <div
            onClick={() => toggleTab(5)}
            className={toggleState === 5 ? 'tabs active__tabs' : 'tabs'}
          >
            <FaIdCard color="teal" size={20} />
            <span className="hidden sm:inline-block">Testimonios</span>
          </div>
        </div>

        <div className="tabs__content">
          {toggleState === 1 && (
            <div className="tab__content active__content">
              <AboutSection />
            </div>
          )}
          {toggleState === 2 && (
            <div className="tab__content active__content">
              <ServicesSection />
            </div>
          )}
          {toggleState === 3 && (
            <div className="tab__content active__content">
              <BlogSection />
            </div>
          )}
          {toggleState === 4 && (
            <div className="tab__content active__content">
              <ClinicsSection />
            </div>
          )}
          {toggleState === 5 && (
            <div className="tab__content active__content">
              <TestimonialsSection />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Tabs;
