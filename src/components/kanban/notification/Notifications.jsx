import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Notification from "./Notification";
import Breadcrumb from "../board/header/Breadcrumb";

const Notifications = () => {
  const { details } = useSelector((store) => store.kanban);
  const { notifications } = useSelector((store) => store.kanban);

  return (
    <div className="w-full overflow-hidden p-3 px-4 md:px-6">
      <Breadcrumb
        toLink={"#"}
        toText={"Projects"}
        title={`/ Project Settings / ${details?.name}`}
      />
      <div className="mb-5 text-xl font-semibold text-gray-900 dark:text-gray-300">
        Notifications
      </div>
      <div>
        {notifications.map((notification) => (
          <Notification notification={notification} key={notification._id} />
        ))}
      </div>
    </div>
  );
};

export default Notifications;
