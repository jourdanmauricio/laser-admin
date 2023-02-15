import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
} from '@/services/api/blog.api';

const initialPost = {
  title: '',
  resume: '',
  image: '',
  alt_image: '',
  content: '',
  order: 0,
  main: 0,
  user_id: 0,
};

export const getAllPosts = createAsyncThunk(
  'posts/getAllPosts',
  async (_, { rejectWithValue }) => {
    try {
      const allPosts = await getPosts();
      return allPosts;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const onCreatePost = createAsyncThunk(
  'posts/createPost',
  async (editPost, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const data = {
        ...editPost.post,
        user_id: state.user.user.id,
        order: state.posts.posts.length + 1,
      };
      const newPost = await createPost(data);
      return newPost;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const onUpdatePost = createAsyncThunk(
  'posts/updatePost',
  async (editPost, { rejectWithValue }) => {
    try {
      const updPost = await updatePost(editPost.post);
      return updPost;
    } catch (error) {
      console.log('ERRRRRRRRRRRRRRORRR', error);
      return rejectWithValue(error);
    }
  }
);

export const onChangeOrder = createAsyncThunk(
  'posts/changeOrder',
  async ({ editPost, position }, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      // find old element
      let otherPost = state.posts.posts.find(
        (post) => post.order === editPost.order
      );
      otherPost = { ...otherPost, order: position };
      const updPost = await updatePost(otherPost);
      const updPost2 = await updatePost(editPost);

      // Update store
      return { currentPost: updPost2, otherPost: updPost };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const onDeletePost = createAsyncThunk(
  'posts/deletePost',
  async (delPost, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      for (let post of state.posts.posts) {
        if (post.order > delPost.order) {
          const otherPost = { ...post, order: post.order - 1 };
          await updatePost(otherPost);
        }
      }

      await deletePost(delPost.id);
      return delPost;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

let postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: null,
    editPost: initialPost,
    status: '',
    error: '',
    action: 'POSTS',
    message: null,
  },
  reducers: {
    setAction: (state, { payload }) => {
      state.action = payload.action;
    },
    onCancel: (state) => {
      state.action = 'POSTS';
      state.editPost = initialPost;
    },
    handlePostEdit: (state, payload) => {
      state.action = 'EDIT';
      state.editPost = payload.payload;
    },
    setEditPost: (state, { payload }) => {
      state.editPost = {
        ...state.editPost,
        [payload.name]: payload.value,
      };
    },
    setMessage: (state, payload) => {
      state.message = payload.message;
    },
  },
  extraReducers: {
    [getAllPosts.pending]: (state) => {
      state.status = 'loading';
      state.error = '';
      state.posts = null;
      state.message = null;
    },
    [getAllPosts.fulfilled]: (state, action) => {
      state.posts = action.payload;
      state.status = 'success';
      state.error = '';
    },
    [getAllPosts.rejected]: (state, action) => {
      state.posts = null;
      state.status = 'failed';
      state.error = action.payload;
      state.message = 'Error obteniendo los Posts';
    },
    [onCreatePost.pending]: (state) => {
      state.status = 'loading';
      state.error = '';
      state.editPost = initialPost;
    },
    [onCreatePost.fulfilled]: (state, action) => {
      state.posts = [action.payload, ...state.posts];
      state.status = 'success';
      state.error = '';
      state.action = 'POSTS';
      state.message = 'Post creado!';
    },
    [onCreatePost.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error;
      state.message = 'Error creando post';
    },

    [onDeletePost.pending]: (state) => {
      state.status = 'loading';
      state.error = '';
    },
    [onDeletePost.fulfilled]: (state, action) => {
      const newData = state.posts.map((post) => {
        if (post.order > action.payload.order)
          return { ...post, order: post.order - 1 };
        return post;
      });
      state.posts = newData;
      state.posts = state.posts.filter(
        (post) => post.id !== parseInt(action.payload.id)
      );
      state.status = 'success';
      state.error = '';
      state.action = 'POSTS';
      state.message = 'Post eliminado!';
    },
    [onDeletePost.rejected]: (state, action) => {
      state.settings = null;
      state.status = 'failed';
      state.error = action.payload;
      state.message = 'Error eliminado post';
    },

    [onUpdatePost.pending]: (state) => {
      state.status = 'loading';
      state.error = '';
    },
    [onUpdatePost.fulfilled]: (state, action) => {
      const newData = state.posts.map((post) =>
        post.id === action.payload.id ? action.payload : post
      );

      state.posts = newData;
      state.status = 'success';
      state.error = '';
      state.action = 'POSTS';
      state.editPost = initialPost;
      state.message = 'Post modificado!';
    },

    [onUpdatePost.rejected]: (state, action) => {
      state.settings = null;
      state.status = 'failed';
      state.error = action.payload;
      state.message = 'Error modificando post';
    },
    // onChangeOrder
    [onChangeOrder.pending]: (state) => {
      state.status = 'loading';
      state.error = '';
    },
    [onChangeOrder.fulfilled]: (state, action) => {
      const { currentPost, otherPost } = action.payload;

      const newData = state.posts.map((post) => {
        if (post.id === currentPost.id) {
          return currentPost;
        }
        if (post.id === otherPost.id) {
          return otherPost;
        }
        return post;
      });

      state.posts = newData;
      state.status = 'success';
      state.error = '';
      state.action = 'POSTS';
      state.editPost = initialPost;
      // state.message = 'Post creado!';
    },
    [onChangeOrder.rejected]: (state, action) => {
      state.settings = null;
      state.status = 'failed';
      state.error = action.payload;
      // state.message = 'Post creado!';
    },
  },
});

export const { onCancel, setAction, handlePostEdit, setEditPost, setMessage } =
  postsSlice.actions;

export default postsSlice.reducer;
