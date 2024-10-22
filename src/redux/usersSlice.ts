import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  isShowModalForm: boolean;
}
const initialState: InitialState = {
  isShowModalForm: false,
};
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setShowModalForm(state, action: PayloadAction<boolean>) {
      state.isShowModalForm = action.payload;
    },
  },
});
export const { setShowModalForm } = userSlice.actions;
export default userSlice.reducer;
