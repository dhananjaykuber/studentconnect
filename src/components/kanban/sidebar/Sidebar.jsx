import React, { useState } from "react";
import {
  LucideKanbanSquare,
  Settings,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const Sidebar = ({ children }) => {
  const [collapse, setCollapse] = useState(false);

  return (
    <div
      className={twMerge(
        `min-h-screen min-w-[280px] border-r-2 border-gray-100 bg-white p-3 dark:border-gray-700 dark:bg-gray-900 ${
          collapse && "min-w-fit"
        }`,
      )}
    >
      <div className="flex justify-between">
        <div className={`${collapse && "hidden"}`}>
          <div className="text-md font-semibold text-gray-900 dark:text-white">
            Canteen Hub
          </div>
          <div className="text-xs font-medium text-gray-600 dark:text-gray-400">
            Software Project
          </div>
        </div>

        {collapse ? (
          <ChevronsRight
            className={twMerge(
              `h-5 w-5 cursor-pointer text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white ${
                collapse && "ml-2"
              }`,
            )}
            onClick={() => setCollapse(false)}
          />
        ) : (
          <ChevronsLeft
            className={twMerge(
              `h-5 w-5 cursor-pointer text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white ${
                collapse && "ml-2"
              }`,
            )}
            onClick={() => setCollapse(true)}
          />
        )}
      </div>
      <div className="mt-5">
        <ul>
          <li className="mb-2">
            <Link
              href="#"
              className="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              <LucideKanbanSquare className="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
              <span className={`ml-3 text-sm ${collapse && "hidden"}`}>
                Board
              </span>
            </Link>
          </li>
          <li className="mb-2">
            <Link
              href="#"
              className="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              <Settings className="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
              <span className={`ml-3 text-sm ${collapse && "hidden"}`}>
                Project Settings
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
