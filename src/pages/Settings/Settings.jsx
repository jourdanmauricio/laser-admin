import Layout from '@/components/Layout/layout';
import Tabs from './Tabs/Tabs';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSettings, setAction } from '@/store/settings';
import Spinner from '@/commons/Spinner/Spinner';
import { useEffect } from 'react';

const Settings = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.settings);

  useEffect(() => {
    dispatch(getAllSettings());
    dispatch(setAction({ action: 'SETTINGS' }));
  }, []);
  return (
    <>
      <Layout>
        {status === 'loading' && <Spinner />}
        <Tabs />
      </Layout>
    </>
  );
};

export default Settings;
