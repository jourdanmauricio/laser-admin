import Layout from '@/components/Layout/layout';
import Tabs from './Tabs/Tabs';
import { useDispatch, useSelector } from 'react-redux';
import { useNotification } from '@/commons/Notifications/NotificationProvider';
import { useEffect } from 'react';
import Spinner from '@/commons/Spinner/Spinner';
import { getAllPosts } from '@/store/posts';
import { getAllClinics } from '@/store/clinics';
import { getAllTestimonials } from '@/store/testimonials';
import { getAllServices } from '@/store/services';
import { delMessage } from '@/store/settings';

const Sections = () => {
  const dispatch = useDispatch();
  const dispatchNotif = useNotification();

  // Data
  const statusClinics = useSelector((state) => state.clinics.status);
  const statusPosts = useSelector((state) => state.posts.status);
  const { statusSettings, message } = useSelector((state) => state.settings);
  const statusTestimonials = useSelector((state) => state.testimonials.status);
  const statusServices = useSelector((state) => state.services.status);

  // Methods
  useEffect(() => {
    dispatch(getAllPosts());
    dispatch(getAllClinics());
    dispatch(getAllTestimonials());
    dispatch(getAllServices());
  }, []);

  useEffect(() => {
    if (message) {
      dispatchNotif({
        type: `${statusSettings === 'success' ? 'SUCCESS' : 'ERROR'}`,
        message: message,
      });
      dispatch(delMessage());
    }
  }, [message]);

  return (
    <Layout>
      {(statusClinics === 'loading' ||
        statusPosts === 'loading' ||
        statusTestimonials === 'loading' ||
        statusSettings === 'loading' ||
        statusServices === 'loading') && <Spinner />}
      <Tabs />
    </Layout>
  );
};

export default Sections;
