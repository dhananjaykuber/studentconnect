import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    token: "435c8e226c86f7b62cf4db3a9ead49a90087e0b8",
    user_id: "650065c02529d1b568f96f1d",
    is_email_validated: false,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
