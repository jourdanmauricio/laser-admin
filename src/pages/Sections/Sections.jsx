import Layout from '@/components/Layout/layout';
import Tabs from './Tabs/Tabs';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSections } from '@/store/sections';
import { useEffect } from 'react';
import Spinner from '@/commons/Spinner/Spinner';
import { getAllPosts } from '@/store/posts';
import { getAllClinics } from '@/store/clinics';

const Sections = () => {
  const dispatch = useDispatch();
  const statusSections = useSelector((state) => state.sections.status);
  const statusClinics = useSelector((state) => state.clinics.status);
  const statusPosts = useSelector((state) => state.posts.status);
  const statusSettings = useSelector((state) => state.settings.status);

  useEffect(() => {
    dispatch(getAllSections());
    dispatch(getAllPosts());
    dispatch(getAllClinics());
  }, []);

  return (
    <Layout>
      {(statusSections === 'loading' ||
        statusClinics === 'loading' ||
        statusPosts === 'loading' ||
        statusSettings === 'loading') && <Spinner />}
      <Tabs />
    </Layout>
  );
};

export default Sections;
