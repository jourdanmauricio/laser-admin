import Layout from '@/components/Layout/layout';
import Tabs from './Tabs/Tabs';

const Dashboard = () => {
  return (
    <>
      <Layout>
        <h1 className="title">Dashborad</h1>
        <Tabs />
      </Layout>
    </>
  );
};

export default Dashboard;
