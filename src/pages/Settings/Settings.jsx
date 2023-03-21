import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSettings, setAction, delMessage } from '@/store/settings';
import { useNotification } from '@/commons/Notifications/NotificationProvider';
import Layout from '@/components/Layout/layout';
import Tabs from './Tabs/Tabs';
import Spinner from '@/commons/Spinner/Spinner';

const Settings = () => {
  const dispatch = useDispatch();
  const dispatchNotif = useNotification();

  // data
  const { statusSettings, message } = useSelector((state) => state.settings);

  // Methods
  useEffect(() => {
    dispatch(getAllSettings());
    dispatch(setAction({ action: 'SETTINGS' }));
  }, []);
  useEffect(() => {
    if (message) {
      dispatchNotif({
        type: statusSettings === 'success' ? 'SUCCESS' : 'ERROR',
        message,
      });
      dispatch(delMessage());
    }
  }, [message]);

  return (
    <>
      <Layout>
        {statusSettings === 'loading' && <Spinner />}
        <Tabs />
      </Layout>
    </>
  );
};

export default Settings;
