import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
} from '@/services/api/blog.api';
import PostsContext from './index';

const initialPost = {
  title: '',
  resume: '',
  image: '',
  alt_image: '',
  content: '',
  user_id: 0,
  order: 0,
};

export default function PostsProvider({ children }) {
  let user = useSelector((state) => state.user.user);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState([]);

  const [editPost, setEditPost] = useState(initialPost);
  const [action, setAction] = useState('POSTS');
  const [isLoading, setIsLoading] = useState(false);

  const getAllPosts = useCallback(async () => {
    try {
      setIsLoading(true);
      const allPosts = await getPosts();
      const orderPosts = allPosts.sort((a, b) => (a.order < b.order ? 1 : -1));
      console.log('orderPosts', orderPosts);
      setPosts(orderPosts);
    } catch (error) {
      console.log('ERORRRRRR', error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const onCreatePost = async () => {
    try {
      const data = { ...editPost, user_id: user.id, order: posts.length + 1 };
      console.log('CREATE', data);
      const newPost = await createPost(data);
      console.log('New Post', newPost);
      setPosts([newPost, ...posts]);
      setAction('POSTS');
    } catch (error) {
      console.log('Errorrrr', error);
    }
  };

  const onDeletePost = async (id) => {
    try {
      const delPost = await deletePost(id);
      console.log('Delete Post', delPost);
      const newData = posts.filter((post) => post.id !== parseInt(delPost.id));
      setPosts(newData);
      setAction('POSTS');
    } catch (error) {
      console.log('Errorrrr', error);
    }
  };

  const onUpdatePost = async () => {
    try {
      setEditPost({ ...editPost, user_id: user.id });
      const updPost = await updatePost(editPost);
      console.log('Upd Post', updPost);
      const newData = posts.map((post) =>
        post.id === updPost.id ? updPost : post
      );
      setPosts(newData);
      setEditPost(initialPost);
      setAction('POSTS');
    } catch (error) {
      console.log('Errorrrr', error);
    }
  };

  const onCancel = () => {
    setAction('POSTS');
    setEditPost(initialPost);
  };

  const handleEditPost = (post) => {
    console.log('Edit post', post);
    setEditPost(post);
    setAction('EDIT');
  };

  return (
    <PostsContext.Provider
      value={{
        action,
        setAction,
        isLoading,
        posts,
        editPost,
        setEditPost,
        getAllPosts,
        onCreatePost,
        onUpdatePost,
        handleEditPost,
        onDeletePost,
        onCancel,
        error,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
}
