import { Edit } from "lucide-react";
import React from "react";
import { FaClock } from "react-icons/fa";
import { Link } from "react-router-dom";

const Task = () => {
  return (
    <div className="cursor-move rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-none dark:bg-gray-800">
      <div className="mb-2 flex justify-between text-base font-semibold text-gray-900 dark:text-white">
        <h2>How to quickly deploy a static website</h2>
        <Edit className="h-7 w-9 cursor-pointer rounded-lg p-[6px] text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-100" />
      </div>
      <img
        src="https://flowbite.com/application-ui/demo/images/kanban/task-3.jpg"
        className="mb-3 rounded-lg"
      />
      <p className="mb-5 text-sm text-gray-500 dark:text-gray-400">
        Static websites are now used to bootstrap lots of websites and are
        becoming the basis for a variety of tools that even influence both web
        designers and developers influence both web designers and developers.
      </p>
      <div className="flex items-center justify-between">
        <div className="flex">
          <Link to="#">
            <img
              src="https://flowbite.com/application-ui/demo/images/users/michael-gough.png"
              className="h-6 w-6 rounded-full border-[1px] border-gray-300 dark:border-gray-600"
            />
          </Link>
          <Link to="#" className="-ml-1">
            <img
              src="https://flowbite.com/application-ui/demo/images/users/bonnie-green.png"
              className="h-6 w-6 rounded-full border-[1px] border-gray-300 dark:border-gray-600"
            />
          </Link>
        </div>
        <div className="flex items-center justify-center gap-2 rounded-lg bg-purple-200 p-1 px-2">
          <FaClock className="h-3 w-3 text-purple-800" />
          <span className="text-xs font-semibold text-purple-800">
            5 days left
          </span>
        </div>
      </div>
    </div>
  );
};

export default Task;
