import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  date: null,
};

const filterSlice = createSlice({
  name: "kanbanFilter",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    addUser: (state, action) => {
      if (!state.users.includes(action.payload)) {
        state.users.push(action.payload);
      }
    },
    removeUser: (state, action) => {
      state.users = state.users.filter((user) => user !== action.payload);
    },
    setDate: (state, action) => {
      state.date = action.payload;
    },
  },
});

export const { setUsers, addUser, removeUser, setDate } = filterSlice.actions;

export default filterSlice.reducer;
