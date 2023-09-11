import React from "react";
import Task from "../task/Task";

const Stage = ({ title }) => {
  return (
    <div className="min-w-[350px]">
      <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">
        {title}
      </div>

      <div className="mt-3">
        <Task />
      </div>
    </div>
  );
};

export default Stage;
