import { useDispatch, useSelector } from 'react-redux';
import { setAction } from '@/store/posts';
import useBlog from './useBlog';

import DataTable from 'react-data-table-component';
import Layout from '@/components/Layout/layout';
import Message from '@/commons/Message/Message';
import Post from './Post/Post';
import PostDetail from './PostDetail/PostDetail';
import Spinner from '@/commons/Spinner/Spinner';

const Blog = () => {
  const dispatch = useDispatch();
  const { orderPosts, columns, paginationComponentOptions, closeMessage } =
    useBlog();
  let { action, error, status } = useSelector((state) => state.posts);

  return (
    <Layout>
      {status === 'loading' && <Spinner />}
      <h1 className="title">
        {action === 'NEW' && 'Nuevo post'}
        {action === 'EDIT' && 'Editar Post'}
        {action === 'POSTS' && 'Blog'}
      </h1>
      {error && <Message msg={error} closeMessage={closeMessage} />}
      {action === 'POSTS' && (
        <>
          <button
            onClick={() => dispatch(setAction({ action: 'NEW' }))}
            className="btn__primary"
          >
            Nuevo
          </button>
          <DataTable
            columns={columns}
            data={orderPosts}
            expandableRows
            expandableRowsComponent={PostDetail}
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
