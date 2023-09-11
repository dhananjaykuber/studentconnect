import React from "react";
import Header from "./header/Header";
import Stage from "./stage/Stage";

const Board = () => {
  return (
    <div className="overflow-hidden p-3 px-6">
      <Header />
      <div className="mt-10 flex gap-5 overflow-x-auto">
        <Stage title={"To Do"} />
        <Stage title={"In Progress"} />
        <Stage title={"Done"} />
        <Stage title={"Monitoring"} />
      </div>
    </div>
  );
};

export default Board;
