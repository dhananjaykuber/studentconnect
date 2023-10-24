import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./features/theme/themeSlice";
import userReducer from "./features/user/userSlice";
import kanbanReducer from "./features/kanban/kanbanSlice";
import sidebarReducer from "./features/kanban/sidebarSlice";
import filterReducer from "./features/kanban/filterSlice";
import dashboardReducer from "./features/dashboard/dashboardSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    user: userReducer,
    kanban: kanbanReducer,
    kanbanSidebar: sidebarReducer,
    kanbanFilter: filterReducer,
    dashboard: dashboardReducer,
  },
});
