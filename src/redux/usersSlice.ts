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
  reducers: {},
});

export const {} = userSlice.actions;
export default userSlice.reducer;
