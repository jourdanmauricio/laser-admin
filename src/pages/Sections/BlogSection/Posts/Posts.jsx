import DataTable from 'react-data-table-component';
import { paginationComponentOptions } from '@/config/constants';
import DeletePost from '../DeletePost/DeletePost';
import { Modal } from '@/commons/Modal/Modal';
import usePosts from './usePosts';
import Post from '../Post/Post';

const Posts = ({
  errorField,
  setDelError,
  onChangePost,
  editData,
  setEditData,
}) => {
  const {
    actionPosts,
    columns,
    orderPosts,
    actionsMemo,
    isOpenModal,
    closeModal,
    handleCancelDelete,
    handleDelete,
  } = usePosts({ setEditData, setDelError, editData });
  return (
    <>
      {actionPosts === 'POSTS' && (
        <DataTable
          title={<h1 className="title text-left">Posts</h1>}
          columns={columns}
          data={orderPosts}
          actions={actionsMemo}
          pagination
          paginationComponentOptions={paginationComponentOptions}
        />
      )}
      {actionPosts !== 'POSTS' && (
        <Post
          editData={editData}
          errorField={errorField}
          onChangePost={onChangePost}
        />
      )}
      <Modal isOpenModal={isOpenModal} closeModal={closeModal}>
        <DeletePost
          post={editData}
          handleCancelDelete={handleCancelDelete}
          handleDelete={handleDelete}
        />
      </Modal>
    </>
  );
};
export default Posts;
