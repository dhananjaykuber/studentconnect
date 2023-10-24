import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blogs: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setBlogs: (state, action) => {
      state.blogs = action.payload;
    },
    deleteBlog: (state, action) => {
      state.blogs = state.blogs.filter(
        (blog) => blog.blog_id !== action.payload,
      );
    },
  },
});

export const { setBlogs, deleteBlog } = dashboardSlice.actions;

export default dashboardSlice.reducer;
