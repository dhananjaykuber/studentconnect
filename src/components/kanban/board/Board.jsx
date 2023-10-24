import React, { useState } from "react";
import Header from "./header/Header";
import Stage from "./stage/Stage";
import { PlusIcon } from "lucide-react";
import CreateStage from "./stage/CreateStage";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";
import { moveTask } from "../../../features/kanban/kanbanSlice";
import axios from "axios";

const Board = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((store) => store.user);
  const { stages } = useSelector((store) => store.kanban);
  const { details } = useSelector((store) => store.kanban);

  const [openModal, setOpenModal] = useState(false);

  const onDragEnd = async (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (
      source.index === destination.index &&
      source.droppableId === destination.droppableId
    ) {
      return;
    }
    if (source.droppableId === destination.droppableId) {
      dispatch(moveTask(result));
      return;
    }

    const stageIndex = stages.findIndex(
      (stage) => stage._id === source.droppableId,
    );
    const taskId = stages[stageIndex].tasks[source.index]._id;

    const res = await axios.put(
      `${import.meta.env.VITE_NODE_API}/kanban/move-task/${taskId}`,
      {
        destinationStage: destination.droppableId,
        title: stages[stageIndex].title,
        projectId: details,
      },
      {
        headers: {
          Authorization: `Bearer ${user._id}`,
        },
      },
    );

    dispatch(moveTask(result));
  };

  return (
    <div className="overflow-hidden p-3 px-4 md:px-6">
      <Header />
      <div className="mt-10 flex gap-5 overflow-x-auto">
        <DragDropContext onDragEnd={onDragEnd}>
          {stages?.map((stage, index) => (
            <Stage
              key={stage._id}
              title={stage.title}
              tasks={stage.tasks}
              stageId={stage._id}
              stageIndex={index}
            />
          ))}
        </DragDropContext>

        <div className="select-none">
          <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Add another group
          </div>
          <div
            className="mt-4 flex h-fit min-w-[300px] cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 p-3 py-10 text-gray-500 hover:bg-gray-100 dark:border-gray-500 dark:hover:bg-gray-800 lg:min-w-[350px]"
            onClick={() => setOpenModal(true)}
          >
            <PlusIcon className="h-6 w-6" />
          </div>

          <CreateStage openModal={openModal} setOpenModal={setOpenModal} />
        </div>
      </div>
    </div>
  );
};

export default Board;
