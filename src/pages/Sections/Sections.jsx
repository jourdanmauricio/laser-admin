import Layout from '@/components/Layout/layout';
import Tabs from './Tabs/Tabs';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSections } from '@/store/sections';
import { useNotification } from '@/commons/Notifications/NotificationProvider';
import { useEffect } from 'react';
import Spinner from '@/commons/Spinner/Spinner';
import { getAllPosts } from '@/store/posts';
import { getAllClinics } from '@/store/clinics';
import { getAllTestimonials } from '@/store/testimonials';

const Sections = () => {
  const dispatch = useDispatch();
  const statusSections = useSelector((state) => state.sections.status);
  const statusClinics = useSelector((state) => state.clinics.status);
  const statusPosts = useSelector((state) => state.posts.status);
  const statusSettings = useSelector((state) => state.settings.status);
  const statusTestimonials = useSelector((state) => state.testimonials.status);
  const { message, status } = useSelector((state) => state.sections);
  const dispatchNotif = useNotification();

  useEffect(() => {
    dispatch(getAllSections());
    dispatch(getAllPosts());
    dispatch(getAllClinics());
    dispatch(getAllTestimonials());
  }, []);

  useEffect(() => {
    if (message) {
      dispatchNotif({
        type: `${status === 'success' ? 'SUCCESS' : 'ERROR'}`,
        message: message,
      });
      // dispatch(delMessage());
    }
  }, [message]);

  return (
    <Layout>
      {(statusSections === 'loading' ||
        statusClinics === 'loading' ||
        statusPosts === 'loading' ||
        statusTestimonials === 'loading' ||
        statusSettings === 'loading') && <Spinner />}
      <Tabs />
    </Layout>
  );
};

export default Sections;
