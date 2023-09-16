import { Edit } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import EditTask from "./EditTask";
import DateLabel from "./Date";
import { Draggable } from "react-beautiful-dnd";

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const Task = ({ task, index }) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided) => (
        <div
          className="mb-4 w-full cursor-move rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-none dark:bg-gray-800 lg:p-6"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
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
                    className="h-6 w-6 select-none rounded-full border-[1px] border-gray-300 dark:border-gray-600"
                  />
                </Link>
              ))}
            </div>

            <DateLabel dueDate={task.dueDate} monthNames={monthNames} />
          </div>

          <EditTask openModal={openModal} setOpenModal={setOpenModal} />
        </div>
      )}
    </Draggable>
  );
};

export default Task;
