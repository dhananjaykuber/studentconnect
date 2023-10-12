import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/kanban/sidebar/Sidebar";
import Layout from "../../../components/Layout";
import Board from "../../../components/kanban/board/Board";
import Settings from "../../../components/kanban/settings/Settings";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import axios from "axios";
import {
  addNotification,
  setNotifications,
  setProjectDetails,
  setProjectStages,
} from "../../../features/kanban/kanbanSlice";
import Notifications from "../../../components/kanban/notification/Notifications";

const KanbanBoard = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { user } = useSelector((store) => store.user);

  const [screen, setScreen] = useState("Board");

  useEffect(() => {
    // get the project related data (details, stages)
    const getProjectDetails = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_NODE_API}/kanban/project/${id}`,
          {
            headers: {
              Authorization: `Bearer ${user._id}`,
            },
          },
        );

        dispatch(setProjectDetails(res.data.project));
        dispatch(setProjectStages(res.data.stages));

        const notifi = await axios.get(
          `${import.meta.env.VITE_NODE_API}/kanban/notification/${
            res.data.project._id
          }`,
          {
            headers: {
              Authorization: `Bearer ${user._id}`,
            },
          },
        );

        dispatch(setNotifications(notifi.data));
      } catch (error) {
        // current user is not involved in this project
        navigate("/kanban");
      }
    };
    getProjectDetails();
  }, []);

  // Socket Connection
  useEffect(() => {
    const socket = io("http://localhost:3000");

    socket.on(`notification_${user._id}`, (notification) => {
      dispatch(addNotification(JSON.parse(notification)));
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Layout classes={"mx-0 px-0 py-0 min-w-full"}>
      <div className="flex">
        <Sidebar screen={screen} setScreen={setScreen} />
        {screen === "Board" ? (
          <Board />
        ) : screen === "Project Settings" ? (
          <Settings />
        ) : screen === "Notifications" ? (
          <Notifications />
        ) : (
          <Board />
        )}
      </div>
    </Layout>
  );
};

export default KanbanBoard;
