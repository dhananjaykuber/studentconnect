import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-5 py-10 font-montserrat">
        {children}
      </div>
    </div>
  );
};

export default Layout;
