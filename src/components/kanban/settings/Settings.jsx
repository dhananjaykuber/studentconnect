import React, { useState } from "react";
import { Link } from "react-router-dom";
import FormInput from "../../form/FormInput";
import FormTextarea from "../../form/FormTextarea";
import Button from "../../Button";
import { Search } from "lucide-react";
import { FaTrash } from "react-icons/fa";
import axios from "axios";

const Settings = () => {
  var typingTimer;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [leadName, setLeadName] = useState("");
  const [leadInfo, setLeadInfo] = useState("");
  const [users, setUsers] = useState(null);

  const handleGetUsers = (text) => {
    setLeadName(text);

    clearTimeout(typingTimer);

    typingTimer = setTimeout(async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_NODE_API}/kanban/users?user=${text}`,
      );

      setUsers(res.data);
      console.log(res.data);
    }, 2000);
  };

  return (
    <div className="w-full overflow-hidden p-3 px-6">
      <div className="text-sm font-normal text-gray-700 dark:text-gray-300">
        <Link to={"#"} className="hover:underline">
          Projects
        </Link>{" "}
        / Canteen Hub / Project Settings
      </div>
      <div className="mb-5 mt-4 text-xl font-semibold text-gray-900 dark:text-gray-300">
        Details
      </div>
      <div className="">
        <div className="mb-4 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <FormInput
              label="Task Name"
              placeholder="Write task name"
              type="text"
              required={true}
              // onChange={(text) => setEmail(text)}
              // leftIcon={<FaEnvelope className="text-sm text-slate-400" />}
            />
            <FormTextarea
              label="Description"
              placeholder="Write descrition about task"
              type="text"
              required={true}
              // onChange={(text) => {}}
              // leftIcon={<FaCommentAlt className="text-sm text-slate-400" />}
            />
            <FormInput
              label="Project Lead"
              placeholder="John Doe, johndoe@gmail.com"
              type="text"
              required={true}
              value={leadName}
              onChange={(text) => handleGetUsers(text)}
              rightIcon={<Search className="h-5 w-5 text-sm text-slate-400" />}
            />
            {leadInfo && (
              <div className="mb-3 flex w-fit items-center gap-1 rounded-lg bg-gray-200 p-1 px-2 dark:bg-gray-600">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-100">
                  {leadInfo.user_name}
                </span>
                <X
                  className="h-4 w-4 cursor-pointer text-sm text-slate-700 dark:text-slate-100"
                  onClick={() => setLeadInfo("")}
                />
              </div>
            )}
            {users?.length > 0 && (
              <div>
                <ul className="max-h-40 overflow-hidden overflow-y-auto rounded-md border border-gray-200 bg-white p-1 dark:border-gray-700 dark:bg-gray-800">
                  {users.map((user) => (
                    <li
                      className="flex cursor-pointer items-center gap-3 rounded-md p-2 hover:bg-gray-200 hover:dark:bg-gray-700"
                      key={user._id}
                      onClick={() => {
                        setLeadInfo(user);
                        setUsers(null);
                      }}
                    >
                      <img
                        src={user.profile_image}
                        className="h-6 w-6 rounded-full"
                      />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {user.user_name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="mt-4">
              <Button label={"Save Changes"} radius={"lg"} />
              <Button
                label={"Move To Trash"}
                radius={"lg"}
                classes={
                  "ml-2 bg-red-500 dark:bg-red-600 hover:bg-red-700 dark:hover:bg-red-700 focus:ring-red-300 dark:focus:ring-red-900"
                }
                leftIcon={
                  <FaTrash className="h-3 w-3 text-sm dark:text-white" />
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
