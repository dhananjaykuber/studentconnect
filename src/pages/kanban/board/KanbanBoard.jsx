import React from "react";
import Sidebar from "../../../components/kanban/sidebar/Sidebar";
import Layout from "../../../components/Layout";
import Board from "../../../components/kanban/board/Board";

const KanbanBoard = () => {
  return (
    <Layout classes={"mx-0 px-0 py-0 min-w-full"}>
      <div className="flex">
        <Sidebar />
        <Board />
      </div>
    </Layout>
  );
};

export default KanbanBoard;
