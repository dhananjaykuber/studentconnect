import React, { useState } from "react";
import Task from "../task/Task";
import { PlusIcon } from "lucide-react";
import CreateTask from "../task/CreateTask";
import { Droppable } from "react-beautiful-dnd";

const Stage = ({ title, tasks, stageId, stageIndex }) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <Droppable droppableId={stageId}>
      {(provided) => (
        <div className="h-fit rounded-lg border-2 border-gray-100 bg-gray-50 p-3 dark:border-gray-800 dark:bg-gray-900">
          <div className="cursor-move select-none text-sm font-semibold text-gray-700 dark:text-gray-300">
            {title}
          </div>

          <div
            className="mt-3 "
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks?.map((task, index) => (
              <Task
                key={task._id}
                task={task}
                index={index}
                stageIndex={stageIndex}
              />
            ))}
            {provided.placeholder}

            <div
              className="flex w-[300px] cursor-pointer select-none items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 p-3 text-gray-500 hover:bg-gray-100 dark:border-gray-500 dark:hover:bg-gray-800 lg:w-[350px]"
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
      )}
    </Droppable>
  );
};

export default Stage;
