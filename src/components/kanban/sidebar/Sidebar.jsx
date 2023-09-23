import React, { useState } from "react";
import {
  LucideKanbanSquare,
  Settings,
  ChevronsLeft,
  ChevronsRight,
  BellIcon,
} from "lucide-react";
import { twMerge } from "tailwind-merge";
import { useSelector } from "react-redux";

const links = [
  {
    id: 1,
    label: "Board",
    icon: (
      <LucideKanbanSquare className="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
    ),
  },
  {
    id: 2,
    label: "Project Settings",
    icon: (
      <Settings className="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
    ),
  },
];

const Sidebar = ({ setScreen }) => {
  const { details } = useSelector((store) => store.kanban);
  const { notifications } = useSelector((store) => store.kanban);

  const [collapse, setCollapse] = useState(false);

  return (
    <div
      className={twMerge(
        `hidden min-h-screen min-w-[280px] border-r-2 border-gray-100 bg-white p-3 dark:border-gray-700 dark:bg-gray-900 lg:block ${
          collapse && "min-w-fit"
        }`,
      )}
    >
      <div className="flex justify-between">
        <div className={`${collapse && "hidden"}`}>
          <div className="text-md font-semibold text-gray-900 dark:text-white">
            {details?.name}
          </div>
          <div className="text-xs font-medium text-gray-600 dark:text-gray-400 ">
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
          {links.map((link) => (
            <li className="mb-2" key={link.id}>
              <div
                className="group flex cursor-pointer select-none items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                onClick={() => setScreen(link.label)}
              >
                {link.icon}
                <span className={`ml-3 text-sm ${collapse && "hidden"}`}>
                  {link.label}
                </span>
              </div>
            </li>
          ))}
          <li className="mb-2">
            <div
              className="group relative flex cursor-pointer select-none items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              onClick={() => setScreen("Notifications")}
            >
              <span className="absolute top-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white ">
                {
                  notifications.filter(
                    (notification) => notification.status === false,
                  ).length
                }
              </span>
              <BellIcon className="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
              <span className={`ml-3 text-sm ${collapse && "hidden"}`}>
                Notifications
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
