import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./features/theme/themeSlice";
import userReducer from "./features/user/userSlice";
import kanbanReducer from "./features/kanban/kanbanSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    user: userReducer,
    kanban: kanbanReducer,
  },
});
