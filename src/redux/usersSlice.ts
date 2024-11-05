import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  isShowModalForm: boolean;
  isShowDeleteModal: boolean;
  currentIdUser: number;
  isShowEditUser: boolean;
  editUserId: number | null;
}
const initialState: InitialState = {
  isShowModalForm: false,
  isShowDeleteModal: false,
  currentIdUser: 0,
  isShowEditUser: false,
  editUserId: null,
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
    setCurrentIdUser(state, action: PayloadAction<number>) {
      state.currentIdUser = action.payload;
    },
    setShowEditUser(state, action: PayloadAction<boolean>) {
      state.isShowEditUser = action.payload;
    },
    setEditIdIser(state, action: PayloadAction<number | null>) {
      state.editUserId = action.payload;
    },
  },
});
export const {
  setShowModalForm,
  setShowDeleteModal,
  setCurrentIdUser,
  setShowEditUser,
  setEditIdIser,
} = userSlice.actions;
export default userSlice.reducer;
