import React, { useState } from "react";
import { Link } from "react-router-dom";
import FormInput from "../../form/FormInput";
import FormTextarea from "../../form/FormTextarea";
import Button from "../../Button";
import { Search } from "lucide-react";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import { useSelector } from "react-redux";
import AddMembersDropdown from "../board/dropdowns/AddMembersDropdown";

const Settings = () => {
  const { details } = useSelector((store) => store.kanban);

  var typingTimer;

  const [title, setTitle] = useState(details?.name);
  const [description, setDescription] = useState(details?.description);
  const [memberInfo, setMemberInfo] = useState(details?.lead);

  return (
    <div className="w-full overflow-hidden p-3 px-6">
      <div className="text-sm font-normal text-gray-700 dark:text-gray-300">
        <Link to={"#"} className="hover:underline">
          Projects
        </Link>{" "}
        / Project Settings / {details?.name}
      </div>
      <div className="mb-5 mt-4 text-xl font-semibold text-gray-900 dark:text-gray-300">
        Details
      </div>
      <div>
        <div className="mb-4 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <FormInput
              label="Task Name"
              placeholder="Write task name"
              type="text"
              required={true}
              value={title}
              onChange={(text) => setTitle(text)}
            />
            <FormTextarea
              label="Description"
              placeholder="Write descrition about task"
              type="text"
              required={true}
              value={description}
              onChange={(text) => {
                setDescription(text);
              }}
            />
            <div className="h-4"></div>
            <AddMembersDropdown
              label="Project Lead"
              memberInfo={memberInfo}
              setMemberInfo={setMemberInfo}
            />

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
