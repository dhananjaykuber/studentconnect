import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/kanban/sidebar/Sidebar";
import Layout from "../../../components/Layout";
import Board from "../../../components/kanban/board/Board";
import Settings from "../../../components/kanban/settings/Settings";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  setProjectDetails,
  setProjectStages,
} from "../../../features/kanban/kanbanSlice";

const KanbanBoard = () => {
  const [screen, setScreen] = useState("Board");

  const { id } = useParams();

  const dispatch = useDispatch();

  const { user } = useSelector((store) => store.user);

  useEffect(() => {
    const getProjectDetails = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_NODE_API}/kanban/project/${id}`,
        {
          headers: {
            Authorization: `Bearer ${user.user_id}`,
          },
        },
      );

      dispatch(setProjectDetails(res.data.project));
      dispatch(setProjectStages(res.data.stages));
      console.log(res.data.project);
      console.log(res.data.stages);
    };

    getProjectDetails();
  }, []);

  return (
    <Layout classes={"mx-0 px-0 py-0 min-w-full"}>
      <div className="flex">
        <Sidebar screen={screen} setScreen={setScreen} />
        {screen === "Board" ? <Board /> : <Settings />}
      </div>
    </Layout>
  );
};

export default KanbanBoard;
