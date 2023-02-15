import { useState, useEffect } from 'react';
import { useNotification } from '@/commons/Notifications/NotificationProvider';
import { getAllPosts, setMessage } from '@/store/posts';

import { useDispatch, useSelector } from 'react-redux';

const columns = [
  {
    name: 'Imagen',
    width: '90px',
    cell: (row) => <img src={row.image} alt={row.image_alt} />,
  },
  {
    name: 'Título',
    selector: (post) => post.title,
  },
  {
    name: 'Orden',
    selector: (post) => post.order,
  },
];

const paginationComponentOptions = {
  rowsPerPageText: 'Filas por página',
  rangeSeparatorText: 'de',
  selectAllRowsItem: true,
  selectAllRowsItemText: 'Todos',
};

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
    if (message)
      if (status === 'failed') {
        dispatchNotif({
          type: 'ERROR',
          message,
        });
      } else {
        console.log('Message', message, status);
        dispatchNotif({
          type: 'SUCCESS',
          message,
        });
      }
  }, [message]);

  useEffect(() => {
    dispatch(getAllPosts());
  }, []);

  const closeMessage = () => {
    dispatch(setMessage({ message: '' }));
  };
  return {
    orderPosts,
    columns,
    paginationComponentOptions,
    closeMessage,
  };
};

export default useBlog;
