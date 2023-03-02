import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com/posts";

export const fetchPost = createAsyncThunk("posts/fetchPost", async () => {
  const response = await axios.get(BASE_URL);
  console.log(response.data);
  return response.data;
});

const initialState = {
  posts: [],
  status: "idle",
  error: null,
};

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: {
      reducer(state, action) {
        state.posts.push({ ...action.payload, id: nanoid() });
      },
  
    },
  },
  extraReducers(builder){
      builder
        .addCase(fetchPost.pending, (state, action) => {
          state.status = "loading";
        })
        .addCase(fetchPost.fulfilled, (state, action) => {
          console.log("inside the succeeded");
          state.status = "succeeded";
          const loadedPosts = action.payload;
          state.posts = state.posts.concat(loadedPosts);
        })
        .addCase(fetchPost.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        });
    },
});

export const getAllPosts = (state) => state.posts.posts;
export const getPostStatus = (state) => state.posts.status;
export const getPostError = (state) => state.posts.error;
export const { addPost } = postSlice.actions;
export default postSlice.reducer;
