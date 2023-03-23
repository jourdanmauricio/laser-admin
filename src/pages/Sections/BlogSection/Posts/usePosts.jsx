import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onDeletePost, setNewPost, setActionPosts } from '@/store/posts';
import { FaCheck, FaEdit, FaPlus, FaTimes, FaTrashAlt } from 'react-icons/fa';
import { useModal } from '@/hooks/useModal';
import Tooltip from '@/commons/Tooltip/Tooltip';

const usePosts = ({ setEditData, setDelError, editData }) => {
  const dispatch = useDispatch();
  const [isOpenModal, openModal, closeModal] = useModal(false);
  const { posts, actionPosts } = useSelector((state) => state.posts);
  const [orderPosts, setOrderPosts] = useState([]);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (posts)
      setOrderPosts(posts.slice().sort((a, b) => (a.order < b.order ? 1 : -1)));
  }, [posts]);

  const confirmDeletePost = (post) => {
    setEditData(post);
    openModal();
  };

  const onNew = () => {
    const order = posts.length + 1;
    const post = {
      id: 0,
      title: '',
      slug: '',
      resume: '',
      image: '',
      alt_image: '',
      content: '',
      order,
      main: false,
      user_id: user.id,
    };
    setEditData(post);
    setDelError();

    dispatch(setNewPost({ post }));
  };

  const onEdit = (post) => {
    setEditData(post);
    setDelError();
    dispatch(setActionPosts({ action: 'EDIT' }));
  };

  const handleCancelDelete = () => {
    setEditData({});
    closeModal();
  };

  const actionsMemo = useMemo(
    () => (
      <Tooltip content="Nuevo post" position="left">
        <button
          type="button"
          className="hover:bg-slate-200 p-2 rounded-full cursor-pointer"
          onClick={onNew}
        >
          <FaPlus className="text-teal-500 text-xl" />
        </button>
      </Tooltip>
    ),
    []
  );

  const handleDelete = () => {
    dispatch(onDeletePost(editData));
    closeModal();
  };

  const columns = [
    {
      name: 'Imagen',
      width: '100px',
      cell: (row) => <img src={row.image} alt={row.image_alt} />,
    },
    {
      name: 'Título',
      sortable: true,
      cell: (post) => (
        <div className="text-wrap">
          {post.title.replace(/(<([^>]+)>)/gi, '')}
        </div>
      ),
    },
    {
      name: 'Orden',
      width: '90px',
      center: true,
      sortable: true,
      selector: (post) => post.order,
    },
    {
      name: 'Pág Ppal',
      width: '100px',
      center: true,
      sortable: true,
      cell: (row) =>
        row.main === true ? (
          <FaCheck className="text-teal-500 text-xl" />
        ) : (
          <FaTimes className="text-red-500 text-xl" />
        ),
    },
    {
      name: 'Acciones',
      button: true,
      cell: (post) => (
        <>
          <button
            type="button"
            className="hover:bg-slate-200 p-2 rounded-full cursor-pointer disabled:text-gray-300"
            onClick={() => onEdit(post)}
          >
            <FaEdit className="text-blue-500 text-lg" />
          </button>
          <button
            type="button"
            className="hover:bg-slate-200 p-2 rounded-full cursor-pointer disabled:text-gray-300"
            onClick={() => confirmDeletePost(post)}
          >
            <FaTrashAlt className="text-red-500 text-lg" />
          </button>
        </>
      ),
    },
  ];

  return {
    actionPosts,
    columns,
    orderPosts,
    actionsMemo,
    isOpenModal,
    closeModal,
    handleCancelDelete,
    handleDelete,
  };
};

export default usePosts;
