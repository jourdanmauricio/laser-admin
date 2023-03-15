import { useState } from 'react';
import { FaCloudUploadAlt, FaImages } from 'react-icons/fa';

import Profile from './Profile/Profile';
import Layout from '../../components/Layout/layout';
import Metadata from './Metadata/Metadata';

const Tabs = () => {
  const [toggleState, setToggleState] = useState(2);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <Layout>
      <div className="tabs__container">
        <div className="tabs__bloc">
          <div
            onClick={() => toggleTab(1)}
            className={toggleState === 1 ? 'tabs active__tabs' : 'tabs'}
          >
            <FaCloudUploadAlt color="teal" size={20} />
            <span>Perfil</span>
          </div>
          <div
            onClick={() => toggleTab(2)}
            className={toggleState === 2 ? 'tabs active__tabs' : 'tabs'}
          >
            <FaImages color="green" size={20} />
            <span>Meta Data</span>
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
            <Profile />
          </div>
          <div
            className={
              toggleState === 2
                ? 'tab__content active__content'
                : 'tab__content'
            }
          >
            <Metadata />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Tabs;
