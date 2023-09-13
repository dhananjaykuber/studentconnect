import React, { useState } from "react";
import Task from "../task/Task";
import { PlusIcon } from "lucide-react";
import CreateTask from "../task/CreateTask";

const Stage = ({ title, tasks, stageId }) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="min-w-[300px] lg:min-w-[350px]">
      <div className="cursor-move select-none text-sm font-semibold text-gray-700 dark:text-gray-300">
        {title}
      </div>

      <div className="mt-3">
        {tasks?.map((task) => (
          <Task key={task._id} task={task} />
        ))}

        <div
          className="flex cursor-pointer select-none items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 p-3 text-gray-500 hover:bg-gray-100 dark:border-gray-500 dark:hover:bg-gray-800"
          onClick={() => setOpenModal(true)}
        >
          <PlusIcon className="h-4 w-4" />
          <span className="text-sm font-semibold">Add another Card</span>
        </div>

        <CreateTask
          openModal={openModal}
          setOpenModal={setOpenModal}
          stageId={stageId}
        />
      </div>
    </div>
  );
};

export default Stage;
