import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="max-w-screen-xl mx-auto py-10 px-5 font-montserrat">
      {children}
    </div>
  );
};

export default Layout;
