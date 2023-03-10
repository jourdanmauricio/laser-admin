import { useState, useEffect, useMemo } from 'react';
import { useNotification } from '@/commons/Notifications/NotificationProvider';
import { setAction, getAllPosts, setMessage } from '@/store/posts';
import { FaCheck, FaTimes, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { handlePostEdit, onDeletePost } from '@/store/posts';
import { useDispatch, useSelector } from 'react-redux';

const useBlog = () => {
  let [orderPosts, setOrderPosts] = useState([]);
  let { posts, message, status } = useSelector((state) => state.posts);
  const dispatchNotif = useNotification();
  const dispatch = useDispatch();

  useEffect(() => {
    if (posts)
      setOrderPosts(posts.slice().sort((a, b) => (a.order < b.order ? 1 : -1)));
  }, [posts]);

  useEffect(() => {
    if (message) {
      if (status === 'failed') {
        dispatchNotif({
          type: 'ERROR',
          message,
        });
      } else {
        dispatchNotif({
          type: 'SUCCESS',
          message,
        });
      }
      dispatch(setMessage({ message: '' }));
    }
  }, [message]);

  useEffect(() => {
    dispatch(getAllPosts());
  }, []);

  const columns = [
    {
      name: 'Imagen',
      width: '100px',
      cell: (row) => <img src={row.image} alt={row.image_alt} />,
    },
    {
      name: 'Título',
      sortable: true,
      cell: (post) => <div className="text-wrap">{post.title}</div>,
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
            onClick={() => onEditPost(post)}
          >
            <FaEdit className="text-blue-500 text-lg" />
          </button>
          <button
            type="button"
            className="hover:bg-slate-200 p-2 rounded-full cursor-pointer disabled:text-gray-300"
            onClick={() => dispatch(onDeletePost(post))}
          >
            <FaTrashAlt className="text-red-500 text-lg" />
          </button>
        </>
      ),
    },
  ];

  const onEditPost = (post) => {
    dispatch(handlePostEdit(post));
  };

  const closeMessage = () => {
    dispatch(setMessage({ message: '' }));
  };

  const actionsMemo = useMemo(
    () => (
      <button
        onClick={() => dispatch(setAction({ action: 'NEW' }))}
        className="btn__primary font-normal text-base"
      >
        Nuevo
      </button>
    ),
    []
  );

  return {
    orderPosts,
    columns,
    actionsMemo,
    closeMessage,
  };
};

export default useBlog;
