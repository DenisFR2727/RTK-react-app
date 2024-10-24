import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  isShowModalForm: boolean;
  isShowDeleteModal: boolean;
  delId: number;
}
const initialState: InitialState = {
  isShowModalForm: false,
  isShowDeleteModal: false,
  delId: 0,
};
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setShowModalForm(state, action: PayloadAction<boolean>) {
      state.isShowModalForm = action.payload;
    },
    setShowDeleteModal(state, action: PayloadAction<boolean>) {
      state.isShowDeleteModal = action.payload;
    },
    setDeleteUserId(state, action: PayloadAction<number>) {
      state.delId = action.payload;
    },
  },
});
export const { setShowModalForm, setShowDeleteModal, setDeleteUserId } =
  userSlice.actions;
export default userSlice.reducer;
