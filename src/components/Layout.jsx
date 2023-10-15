import React from "react";
import { twMerge } from "tailwind-merge";
import ThemeSwitcher from "./ThemeSwitcher";

const Layout = ({ children, classes }) => {
  return (
    <div className="min-h-[89vh] dark:bg-gray-900">
      <div
        className={twMerge(
          `mx-auto max-w-screen-xl px-5 py-10 font-montserrat transition duration-1000 ease-in-out ${classes}`,
        )}
      >
        {children}
        <ThemeSwitcher />
      </div>
    </div>
  );
};

export default Layout;
