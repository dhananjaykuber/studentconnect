import React from "react";
import Layout from "../../components/Layout";
import { twMerge } from "tailwind-merge";
import {
  BellIcon,
  LightbulbIcon,
  PenBoxIcon,
  UserCircle2Icon,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import Sidebar from "./Sidebar";
import { FaBlog } from "react-icons/fa";

const navigations = [
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: UserCircle2Icon,
  },
  {
    title: "Projects",
    url: "/dashboard/projects",
    icon: LightbulbIcon,
  },
  {
    title: "Blogs",
    url: "/dashboard/blogs",
    icon: PenBoxIcon,
  },
];

const Dashboard = ({ children }) => {
  return (
    <Layout classes={"relative"}>
      <div className="flex">
        <Sidebar navigations={navigations} />
        <div className=" w-full">{children}</div>
      </div>
    </Layout>
  );
};

export default Dashboard;
