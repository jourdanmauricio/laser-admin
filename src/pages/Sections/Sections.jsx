import Layout from '@/components/Layout/layout';
import Tabs from './Tabs/Tabs';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSections } from '@/store/sections';
import { useEffect } from 'react';
import { setAction } from '@/store/sections';
import Spinner from '@/commons/Spinner/Spinner';

const Sections = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.sections);

  useEffect(() => {
    dispatch(getAllSections());
    dispatch(setAction({ action: 'SECTIONS' }));
  }, []);

  return (
    <Layout>
      {status === 'loading' && <Spinner />}
      <h1 className="title">Secciones</h1>

      <Tabs />
    </Layout>
  );
};

export default Sections;
