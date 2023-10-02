import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Layout from "./components/Layout";
import Signup from "./pages/auth/signup/Signup";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import Blog from "./pages/blogs/blog/Blog";
import Blogs from "./pages/blogs/Blogs";
import Login from "./pages/auth/login/Login";
import KanbanHome from "./pages/kanban/home/KanbanHome";
import KanbanBoard from "./pages/kanban/board/KanbanBoard";
import Profile from "./pages/profile/Profile";
import AuthorizeCode from "./pages/auth/AuthorizeCode";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:id" element={<Blog />} />
        <Route path="/kanban" element={<KanbanHome />} />
        <Route path="/kanban/:id" element={<KanbanBoard />} />

        <Route path="/authorize/:provider" element={<AuthorizeCode />} />
      </Routes>
    </Router>
  );
}

export default App;
