import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Notification from "./Notification";

const Notifications = () => {
  const { details } = useSelector((store) => store.kanban);
  const { notifications } = useSelector((store) => store.kanban);

  return (
    <div className="w-full overflow-hidden p-3 px-6">
      <div className="text-sm font-normal text-gray-700 dark:text-gray-300">
        <Link to={"#"} className="hover:underline">
          Projects
        </Link>{" "}
        / Project Settings / {details?.name}
      </div>
      <div className="mb-5 mt-4 text-xl font-semibold text-gray-900 dark:text-gray-300">
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
