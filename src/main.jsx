import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "react-loading-skeleton/dist/skeleton.css";

import { store } from "./store.js";
import { Provider } from "react-redux";

import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import Root from "./pages/Root.jsx";
import Home from "./pages/home/Home.jsx";
import About from "./pages/about/About.jsx";
import Contact from "./pages/contact/Contact.jsx";
import Signup from "./pages/auth/signup/Signup.jsx";
import Login from "./pages/auth/login/Login.jsx";
import Profile from "./pages/profile/Profile.jsx";
import KanbanHome from "./pages/kanban/home/KanbanHome.jsx";
import KanbanBoard from "./pages/kanban/board/KanbanBoard.jsx";
import OpenContributions from "./pages/open_contributions/OpenContributions.jsx";
import AuthorizeCode from "./pages/auth/AuthorizeCode.jsx";
import Blogs from "./pages/blogs/Blogs.jsx";
import Blog from "./pages/blogs/blog/Blog.jsx";
import _404 from "./pages/error/_404";
import ProfileById from "./pages/profile/ProfileById";
import GenerateQuiz from "./pages/automatic_quiz/GenerateQuiz";
import AutomaticQuiz from "./pages/automatic_quiz/AutomaticQuiz";
import AutomaticOpenEnded from "./pages/automatic_quiz/AutomaticOpenEnded";
import Settings from "./pages/dashboard/settings/Settings";
import Dashboard from "./pages/dashboard/Dashboard";
import AddProject from "./pages/dashboard/projects/AddProject";
import AddBlog from "./pages/dashboard/blogs/AddBlog";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path="" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />

      {/* Login Signup */}
      <Route path="signup" element={<Signup />} />
      <Route path="login" element={<Login />} />

      <Route path="authorize/" element={<AuthorizeCode />}>
        <Route path=":provider" element={<AuthorizeCode />} />
      </Route>

      {/* Profile */}
      <Route path="profile" element={<Profile />} />
      <Route path="profile/:id" element={<ProfileById />} />

      {/* Blog */}
      <Route path="blogs/" element={<Blogs />}>
        <Route path=":id" element={<Blog />} />
      </Route>

      {/* Kanban */}
      <Route path="kanban" element={<KanbanHome />} />
      <Route path="kanban/:id" element={<KanbanBoard />} />

      {/* Open Contributions */}
      <Route path="open-contributions" element={<OpenContributions />} />

      {/* Automatic Quiz */}
      <Route path="automatic-quiz" element={<GenerateQuiz />} />
      <Route path="automatic-quiz/mcq/:id" element={<AutomaticQuiz />} />
      <Route
        path="automatic-quiz/open-ended/:id"
        element={<AutomaticOpenEnded />}
      />

      {/* User Dashboard (Settings, Blogs, Projects)*/}
      <Route path="dashboard" element={<Settings />} />
      <Route path="dashboard/settings" element={<Settings />} />
      <Route path="dashboard/projects" element={<AddProject />} />
      <Route path="dashboard/blogs" element={<AddBlog />} />

      {/* Error */}
      <Route path="*" element={<_404 />} />
    </Route>,
  ),
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
    <ToastContainer />
  </Provider>,
);
