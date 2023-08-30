import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="mx-auto max-w-screen-xl px-5 py-10 font-montserrat">
      {children}
    </div>
  );
};

export default Layout;
