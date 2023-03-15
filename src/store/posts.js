import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getAllPostsApi,
  createPostApi,
  updatePostApi,
  deletePostApi,
} from '@/services/api/blog.api';

export const getAllPosts = createAsyncThunk(
  'posts/getAllPosts',
  async (_, { rejectWithValue }) => {
    try {
      const allPosts = await getAllPostsApi();
      return allPosts;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const onCreatePost = createAsyncThunk(
  'posts/createPost',
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const posts = state.posts.posts;
      const newPost = posts.find((post) => post.id === 0);

      const newPosts = await createPostApi(newPost);
      return newPosts;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const onUpdatePost = createAsyncThunk(
  'posts/updatePost',
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const posts = state.posts.posts;
      const updPost = await updatePostApi(posts);
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
  async (delPost, { rejectWithValue }) => {
    try {
      const newPosts = await deletePostApi(delPost.id);
      return newPosts;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

let postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    status: '',
    error: '',
    actionPosts: 'POSTS',
    message: null,
  },
  reducers: {
    setActionPosts: (state, { payload }) => {
      state.actionPosts = payload.action;
    },
    setNewPost: (state, { payload }) => {
      state.posts = [...state.posts, payload.post];
      state.actionPosts = 'NEW';
    },
    changePost: (state, { payload }) => {
      const newPosts = state.posts.map((post) =>
        post.id === payload.id
          ? { ...post, [payload.name]: payload.value, updated: true }
          : post
      );
      state.posts = newPosts;
    },
    delError: (state) => {
      state.error = '';
      state.message = null;
    },
  },
  extraReducers: {
    [getAllPosts.pending]: (state) => {
      state.status = 'loading';
      state.error = '';
      state.posts = [];
      state.message = null;
    },
    [getAllPosts.fulfilled]: (state, action) => {
      state.posts = action.payload;
      state.status = 'success';
      state.error = '';
      state.actionPosts = 'POSTS';
    },
    [getAllPosts.rejected]: (state, action) => {
      state.posts = [];
      state.status = 'failed';
      state.error = action.payload;
      state.message = 'Error obteniendo los Posts';
    },
    [onCreatePost.pending]: (state) => {
      state.status = 'loading';
      state.error = '';
      // state.editPost = initialPost;
    },
    [onCreatePost.fulfilled]: (state, action) => {
      state.posts = action.payload;
      state.status = 'success';
      state.error = '';
      state.actionPosts = 'POSTS';
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
      state.posts = action.payload;
      state.status = 'success';
      state.error = '';
      state.actionPosts = 'POSTS';
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
      state.posts = action.payload;
      state.status = 'success';
      state.error = '';
      state.actionPosts = 'POSTS';
      state.message = 'Post modificado!';
    },
    [onUpdatePost.rejected]: (state, action) => {
      state.settings = null;
      state.status = 'failed';
      state.error = action.payload;
      state.message = 'Error modificando post';
    },
  },
});

export const { setActionPosts, changePost, setNewPost, delError } =
  postsSlice.actions;

export default postsSlice.reducer;
