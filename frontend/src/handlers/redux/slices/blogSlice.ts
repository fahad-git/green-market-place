// handlers/redux/slices/blogSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import BLOG_APIs from '../../apis/blog-apis';
import { IBlog, IBlogState } from '../../interfaces/blogs';

// Define types for the blog data and state

// Define the initial state with proper types
const initialState: IBlogState = {
  blogs: [],
  selectedBlog: null,
  isLoading: false,
  error: null,
};

// Thunks for async actions

// Fetch list of all blogs
export const getBlogs = createAsyncThunk<IBlog[], void, { rejectValue: any }>(
  'blogs/getBlogs',
  async (_, { rejectWithValue }) => {
    try {
      //Get all blogs
      const response = await BLOG_APIs.getBlogs();

      const blogs = response.data.map((blog: any) => {
        if(blog?.imageFile){
          blog.imageFile = JSON.parse(blog.imageFile + "");
          blog.imageFile.imageUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/file/${blog.imageFile?.filename}`;
        }
        return blog;
      });
      
      return blogs;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to get blogs.');
    }
  }
);

// Fetch individual blog by ID
export const getBlog = createAsyncThunk<IBlog, string, { rejectValue: any }>(
  'blogs/getBlog',
  async (id, { rejectWithValue }) => {
    try {
      //Get blog by id
      const response = await BLOG_APIs.getBlog(id);
      const blog: any = response.data;      
      if(blog?.imageFile){
        blog.imageFile = JSON.parse(blog.imageFile);
        blog.imageFile.imageUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/file/${blog.imageFile?.filename}`;
      }
      return blog;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to get blog.');
    }
  }
);

// Create a new blog
export const createBlog = createAsyncThunk<IBlog, IBlog, { rejectValue: any }>(
  'blogs/createBlog',
  async (blogData, { rejectWithValue }) => {
    try {
      const response = await BLOG_APIs.createBlog(blogData);
      return response.data; // Assumed response.data is of type Blog
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create blog.');
    }
  }
);

// Delete a blog by ID
export const deleteBlog = createAsyncThunk<string, string, { rejectValue: any }>(
  'blogs/deleteBlog',
  async (id, { rejectWithValue }) => {
    try {
      await BLOG_APIs.deleteBlog(id);
      return id; // Return the ID of the deleted blog
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete blog.');
    }
  }
);

// Update an existing blog by ID
export const updateBlog = createAsyncThunk<IBlog, { id: string; updatedData: IBlog }, { rejectValue: any }>(
  'blogs/updateBlog',
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await BLOG_APIs.updateBlog(id, updatedData);
      return response.data; // Assumed response.data is of type Blog
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update blog.');
    }
  }
);

// Blog slice
const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    // You can add additional synchronous actions if needed
  },
  extraReducers: (builder) => {
    builder
      // Get all blogs
      .addCase(getBlogs.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getBlogs.fulfilled, (state, action: PayloadAction<IBlog[]>) => {
        state.isLoading = false;
        state.blogs = action.payload;
      })
      .addCase(getBlogs.rejected, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Get individual blog
      .addCase(getBlog.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getBlog.fulfilled, (state, action: PayloadAction<IBlog>) => {
        state.isLoading = false;
        state.selectedBlog = action.payload;
      })
      .addCase(getBlog.rejected, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Create a new blog
      .addCase(createBlog.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createBlog.fulfilled, (state, action: PayloadAction<IBlog>) => {
        state.isLoading = false;
        state.blogs.push(action.payload); // Add the new blog to the list
      })
      .addCase(createBlog.rejected, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Delete a blog
      .addCase(deleteBlog.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteBlog.fulfilled, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.blogs = state.blogs.filter(blog => blog.id !== action.payload); // Remove the deleted blog
      })
      .addCase(deleteBlog.rejected, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Update a blog
      .addCase(updateBlog.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateBlog.fulfilled, (state, action: PayloadAction<IBlog>) => {
        state.isLoading = false;
        const index = state.blogs.findIndex(blog => blog.id === action.payload.id);
        if (index !== -1) {
          state.blogs[index] = action.payload; // Update the existing blog
        }
      })
      .addCase(updateBlog.rejected, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default blogSlice.reducer;
