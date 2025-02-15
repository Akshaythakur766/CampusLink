import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface DataParams {
  open: boolean;
  message: string;
}

export const confirmationDialog = createAsyncThunk(
  "confirmationDialog",
  async (params: DataParams) => {
    return params;
  }
);

const coreSlice = createSlice({
  name: "core",
  initialState: {
    confirmationDialog: {
      open: false,
      message: "",
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(confirmationDialog.fulfilled, (state, action) => {
      state.confirmationDialog = { ...action?.payload };
    });
  },
});
const appCoreSlice= coreSlice.reducer
export default appCoreSlice