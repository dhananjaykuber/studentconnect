import React from 'react';

const Button = ({ label, leftIcon, rightIcon, onclick }) => {
  return (
    <button
      type="button"
      className="px-5 py-2.5 text-sm font-semibold text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 gap-2"
      onClick={onclick}
    >
      {leftIcon && leftIcon}
      {label}
      {rightIcon && rightIcon}
    </button>
  );
};

export default Button;
