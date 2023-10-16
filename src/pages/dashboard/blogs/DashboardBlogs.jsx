import React from "react";
import Dashboard from "../Dashboard";
import Blog from "./Blog";

const DashboardBlogs = () => {
  return (
    <Dashboard>
      <div className="flex flex-wrap">
        <Blog />
        <Blog />
        <Blog />
        <Blog />
        <Blog />
        <Blog />
        <Blog />
        <Blog />
        <Blog />
      </div>
    </Dashboard>
  );
};

export default DashboardBlogs;
