import React, { useEffect, useState } from "react";
import Header from "./header/Header";
import Stage from "./stage/Stage";
import { PlusIcon } from "lucide-react";
import CreateStage from "./stage/CreateStage";
import { useSelector } from "react-redux";

const Board = () => {
  const { stages } = useSelector((store) => store.kanban);

  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="overflow-hidden p-3 px-6">
      <Header />
      <div className="mt-10 flex gap-5 overflow-x-auto">
        {stages?.map((stage) => (
          <Stage
            key={stage.id}
            title={stage.title}
            tasks={stage.tasks}
            stageId={stage.id}
          />
        ))}

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
