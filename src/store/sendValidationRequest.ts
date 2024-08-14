import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SaleData {
  productId: string;
  quantity: number;
}

interface formState {
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected' | null;
  error: string | null;
}

export const postRequest = createAsyncThunk<void, SaleData, { rejectValue: string }>(
  'validation/validationForm/',
  async (data:any, { rejectWithValue }) => {
    try {
      await fetch('https://jsonplaceholder.typicode.com/todos/1', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      });
    } catch (error) {

      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

const initialState: formState = {
  status: null,
  error: null,
};

export const validationForm = createSlice({
  name: 'validation',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postRequest.pending, (state) => {
        state.status = 'pending';
        state.error = null; 
      })
      .addCase(postRequest.fulfilled, (state) => {
        state.status = 'fulfilled';
      })
      .addCase(postRequest.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.status = 'rejected';
        state.error = action.payload || 'An unknown error occurred'; 
      });
  }
});

export default validationForm.reducer