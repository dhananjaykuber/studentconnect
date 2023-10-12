import React from "react";
import { twMerge } from "tailwind-merge";

const Tag = ({ color, icon, label }) => {
  return (
    <span
      className={twMerge(
        `flex w-fit items-center gap-1 rounded-full text-${color}-900 bg-${color}-100 px-2 py-1 text-[11px] font-bold`,
      )}
    >
      {icon && (
        <div
          className={twMerge(
            `flex items-center justify-center rounded-full bg-${color}-900 p-[2px] text-white`,
          )}
        >
          {icon}
        </div>
      )}
      {label}
    </span>
  );
};

export default Tag;
