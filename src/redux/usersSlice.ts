import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUsers } from "./type";

interface InitialState {
  isShowModalForm: boolean;
  isShowDeleteModal: boolean;
  currentIdUser: number;
  isShowEditUser: boolean;
  editUserId: number | null;
  editUserValues: { [key: number]: Partial<IUsers> };
}

const initialState: InitialState = {
  isShowModalForm: false,
  isShowDeleteModal: false,
  currentIdUser: 0,
  isShowEditUser: false,
  editUserId: null,
  editUserValues: {},
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
    setEditIdUser(state, action: PayloadAction<number | null>) {
      state.editUserId = action.payload;
    },
    setEditUserValues(
      state,
      action: PayloadAction<{
        userId: number;
        field: keyof IUsers | "address";
        value: string;
        addressField?: keyof IUsers["address"];
      }>
    ) {
      const { userId, field, value, addressField } = action.payload;
      state.editUserValues[userId] = {
        ...state.editUserValues[userId],
        [field]:
          field === "address" && addressField
            ? {
                ...state.editUserValues[userId]?.address,
                [addressField]: value,
              }
            : value,
      };
    },
  },
});
export const {
  setShowModalForm,
  setShowDeleteModal,
  setCurrentIdUser,
  setShowEditUser,
  setEditIdUser,
  setEditUserValues,
} = userSlice.actions;
export default userSlice.reducer;
