import { Edit } from "lucide-react";
import React, { useState } from "react";
import { FaClock } from "react-icons/fa";
import { Link } from "react-router-dom";
import EditTask from "./EditTask";

const Task = ({ task }) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="mb-4 cursor-move rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-none dark:bg-gray-800 lg:p-6">
      <div className="mb-2 flex justify-between text-base font-semibold text-gray-900 dark:text-white">
        <h2 className="select-none">{task.title}</h2>
        <Edit
          className="h-7 w-9 cursor-pointer rounded-lg p-[6px] text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-100"
          onClick={() => setOpenModal(true)}
        />
      </div>
      {/* <img
        src="https://flowbite.com/application-ui/demo/images/kanban/task-3.jpg"
        className="mb-3 select-none rounded-lg"
      /> */}
      <p className="mb-5 select-none text-sm text-gray-500 dark:text-gray-400">
        {task.description}
      </p>
      <div className="flex items-center justify-between">
        <div className="ml-1 flex">
          {task?.assignedTo?.map((assigned) => (
            <Link to="#" className="-ml-1" key={assigned._id}>
              <img
                src={assigned.profile_image}
                className="h-6 w-6 rounded-full border-[1px] border-gray-300 dark:border-gray-600"
              />
            </Link>
          ))}
        </div>
        <div className="flex items-center justify-center gap-2 rounded-lg bg-purple-200 p-1 px-2">
          <FaClock className="h-3 w-3 text-purple-800" />
          <span className="select-none text-xs font-semibold text-purple-800">
            5 days left
          </span>
        </div>
      </div>

      <EditTask openModal={openModal} setOpenModal={setOpenModal} />
    </div>
  );
};

export default Task;
