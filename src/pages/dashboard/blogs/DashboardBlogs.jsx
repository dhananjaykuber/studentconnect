import React, { useEffect, useState } from "react";
import Dashboard from "../Dashboard";
import Blog from "../../../components/dashboard/blogs/Blog";
import getAPIData from "../../../hooks/getAPIData";
import { useDispatch, useSelector } from "react-redux";
import { FaSpinner } from "react-icons/fa";
import { setBlogs } from "../../../features/dashboard/dashboardSlice";

const DashboardBlogs = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((store) => store.user);
  const { blogs } = useSelector((store) => store.dashboard);

  const { data, loading, error } = getAPIData(
    `${import.meta.env.VITE_DJANGO_API}/blogs/user-blogs/`,
    {
      headers: {
        Authorization: `Token ${user?.token}`,
      },
    },
  );

  useEffect(() => {
    if (!loading && !error) {
      dispatch(setBlogs(data.blogs));
    }
  }, [data, loading, error]);

  return (
    <Dashboard>
      <div className="flex flex-wrap">
        {loading ? (
          <div className="flex items-center justify-center gap-2 text-sm font-medium dark:text-gray-300">
            <FaSpinner className="h-4 w-4 animate-spin text-gray-800 dark:text-gray-300" />
            Loading...
          </div>
        ) : !blogs || blogs?.length <= 0 ? (
          <div className="flex items-center justify-center gap-2 text-sm font-medium dark:text-gray-300">
            No Blogs
          </div>
        ) : (
          blogs && blogs.map((blog) => <Blog key={blog.blog_id} blog={blog} />)
        )}
      </div>
    </Dashboard>
  );
};

export default DashboardBlogs;
