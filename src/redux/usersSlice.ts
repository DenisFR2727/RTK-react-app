import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUsers } from "./type";

interface InitialState {
  users: IUsers[];
}
const initialState: InitialState = {
  users: [],
};
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setGetUsers: (state, action: PayloadAction<IUsers[]>) => {
      state.users = action.payload;
    },
    setDeleteUser: (state, action: PayloadAction<number>) => {},
  },
});

export const { setDeleteUser, setGetUsers } = userSlice.actions;
export default userSlice.reducer;
