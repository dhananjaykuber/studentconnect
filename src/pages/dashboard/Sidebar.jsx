import React from "react";
import { NavLink } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const Sidebar = ({ navigations }) => {
  return (
    <div
      className={twMerge(
        `mr-5 min-h-[80vh] w-80 border-r pr-2 dark:border-gray-600`,
      )}
    >
      <ul>
        {navigations.map((navigation) => (
          <li className="mb-2" key={navigation.title}>
            <NavLink
              className={({ isActive }) =>
                twMerge(
                  `group flex cursor-pointer select-none items-center rounded-lg p-2 text-gray-900  hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800 ${
                    isActive && "bg-gray-200 dark:bg-gray-700"
                  }`,
                )
              }
              to={navigation.url}
            >
              <navigation.icon className="h-5 w-5" />
              <span className={`ml-3 text-sm`}>{navigation.title}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
