import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "../../services/productService";
import { API_STATUS } from "../../helper/constant";

export const fetchProductsByCategory = createAsyncThunk(
  "products/fetchByCategory",
  async (category, thunkAPI) => {
    try {
      const response = await productService.getProductsByCategory(category);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchProductDetails = createAsyncThunk(
  "products/fetchDetails",
  async (productId, thunkAPI) => {
    try {
      const response = await productService.getProductDetails(productId);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    currentProduct: null,
    status: "idle",
    error: null,
  },
  reducers: {
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.status = API_STATUS.LOADING;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.status = API_STATUS.SUCCEEDED;
        state.products = action.payload;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.status = API_STATUS.FAILED;
        state.error = action.payload.message;
      })
      .addCase(fetchProductDetails.pending, (state) => {
        state.status = API_STATUS.LOADING;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.status = API_STATUS.SUCCEEDED;
        state.currentProduct = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.status = API_STATUS.FAILED;
        state.error = action.payload.message;
      });
  },
});

export const { clearCurrentProduct } = productSlice.actions;
export default productSlice.reducer;
