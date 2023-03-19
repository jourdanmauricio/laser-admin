import Layout from '@/components/Layout/layout';
import Tabs from './Tabs/Tabs';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSettings, setAction, delMessage } from '@/store/settings';
import Spinner from '@/commons/Spinner/Spinner';
import { useEffect } from 'react';
import { useNotification } from '@/commons/Notifications/NotificationProvider';

const Settings = () => {
  const dispatch = useDispatch();
  const dispatchNotif = useNotification();
  const { status, message } = useSelector((state) => state.settings);

  useEffect(() => {
    dispatch(getAllSettings());
    dispatch(setAction({ action: 'SETTINGS' }));
  }, []);

  useEffect(() => {
    if (message) {
      dispatchNotif({
        type: status === 'success' ? 'SUCCESS' : 'ERROR',
        message,
      });
      dispatch(delMessage());
    }
  }, [message]);

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
