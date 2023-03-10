import DataTable from 'react-data-table-component';
import Layout from '@/components/Layout/layout';
import Message from '@/commons/Message/Message';
import Post from './Post/Post';
import Spinner from '@/commons/Spinner/Spinner';
import useBlog from './useBlog';
import { useSelector } from 'react-redux';
import { paginationComponentOptions } from '@/config/constants';

const Blog = () => {
  const {
    orderPosts,
    columns,
    // paginationComponentOptions,
    actionsMemo,
    closeMessage,
  } = useBlog();
  let { action, error, status } = useSelector((state) => state.posts);

  return (
    <Layout>
      {status === 'loading' && <Spinner />}
      <h1 className="title">
        {action === 'NEW' && 'Nuevo post'}
        {action === 'EDIT' && 'Editar Post'}
      </h1>
      {error && <Message msg={error} closeMessage={closeMessage} />}
      {action === 'POSTS' && (
        <>
          <DataTable
            title={<h1 className="title text-left">Posts</h1>}
            columns={columns}
            data={orderPosts}
            actions={actionsMemo}
            pagination
            paginationComponentOptions={paginationComponentOptions}
            progressPending={status === 'loading'}
          />
        </>
      )}
      {(action === 'NEW' || action === 'EDIT') && <Post />}
    </Layout>
  );
};

export default Blog;
