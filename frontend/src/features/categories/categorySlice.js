// src/features/categories/categorySlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import categoryService from "../../services/categoryService";
import { API_STATUS } from "../../helper/constant";

export const fetchCategories = createAsyncThunk(
  "categories/fetchAll",
  async (withRelations, thunkAPI) => {
    try {
      const response = await categoryService.getAllCategories(withRelations);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    status: API_STATUS.IDLE, // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    clearCategories: (state) => {
      state.categories = [];
      state.status = API_STATUS.IDLE;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = API_STATUS.LOADING;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = API_STATUS.SUCCEEDED;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = API_STATUS.FAILED;
        state.error = action.payload?.message || "Failed to fetch categories";
      });
  },
});

export const { clearCategories } = categorySlice.actions;
export default categorySlice.reducer;
