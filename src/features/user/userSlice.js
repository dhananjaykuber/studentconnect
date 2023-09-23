import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    token: "435c8e226c86f7b62cf4db3a9ead49a90087e0b8",
    user_id: "650edbae0ca9033028b49a21",
    is_email_validated: false,
  },
};
//  650edbae0ca9033028b49a19 650edbae0ca9033028b49a21
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
