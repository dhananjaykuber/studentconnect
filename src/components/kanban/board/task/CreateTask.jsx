import React, { useState } from "react";
import Modal from "../../modal/Modal";
import FormInput from "../../../form/FormInput";
import Button from "../../../Button";
import FormTextarea from "../../../form/FormTextarea";
import { Search, X } from "lucide-react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../../../../features/kanban/kanbanSlice";

const CreateTask = ({ openModal, setOpenModal, stageId }) => {
  const dispatch = useDispatch();

  const { user } = useSelector((store) => store.user);

  var typingTimer = null;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [contributors, setContributors] = useState([]);
  const [users, setUsers] = useState(null);

  const handleCreateTask = async () => {
    let contributorsIds = [];

    contributors?.map((contributor) => contributorsIds.push(contributor._id));

    const res = await axios.post(
      `${import.meta.env.VITE_NODE_API}/kanban/stage/${stageId}/task`,
      {
        title: title,
        description: description,
        addedBy: user.user_id,
        assignedTo: contributorsIds,
        dueDate: "",
        labels: [""],
      },
      {
        headers: {
          Authorization: `Basic ${user.user_id}`,
        },
      },
    );

    dispatch(addTask({ stageId: stageId, task: res.data }));

    console.log(res);

    setTitle("");
    setDescription("");
    setContributors([]);
    setAssignedTo("");
    setOpenModal(false);
  };

  const handleAddContributor = async (data) => {
    if (!contributors.includes(data)) {
      setContributors([...contributors, data]);
    }
  };

  const handleRemoveContributor = async (index) => {
    setContributors((contributors) =>
      contributors.filter((_, index) => index !== 0),
    );
  };

  const handleGetUsers = (text) => {
    setAssignedTo(text);

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
    <Modal
      openModal={openModal}
      setOpenModal={setOpenModal}
      title={"Create New Task"}
      children={
        <>
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
                label="Enter a description"
                placeholder="Write descrition about task"
                type="text"
                required={true}
                value={description}
                onChange={(text) => {
                  setDescription(text);
                }}
              />
            </div>
          </div>

          <div className="-mt-4 mb-4">
            <div className="sm:col-span-2">
              <FormInput
                label="Assigned to"
                placeholder="John Doe, johndoe@gmail.com"
                type="text"
                required={true}
                value={assignedTo}
                onChange={(text) => handleGetUsers(text)}
                rightIcon={
                  <Search className="h-5 w-5 text-sm text-slate-400" />
                }
              />
            </div>
            <div className="flex gap-2">
              {contributors?.map((contributor, index) => (
                <div
                  className="mb-3 flex w-fit items-center gap-1 rounded-lg bg-gray-200 p-1 px-2 dark:bg-gray-600"
                  key={index}
                >
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-100">
                    {contributor.user_name}
                  </span>
                  <X
                    className="h-4 w-4 cursor-pointer text-sm text-slate-700 dark:text-slate-100"
                    onClick={() => handleRemoveContributor(index)}
                  />
                </div>
              ))}
            </div>
            {users?.length > 0 && (
              <div>
                <ul className="max-h-40 overflow-hidden overflow-y-auto rounded-md border border-gray-200 bg-white p-1 dark:border-gray-700 dark:bg-gray-800">
                  {users.map((user) => (
                    <li
                      className="flex cursor-pointer items-center gap-3 rounded-md p-2 hover:bg-gray-200 hover:dark:bg-gray-700"
                      key={user._id}
                      onClick={() => {
                        handleAddContributor(user);
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
          </div>
          <Button
            label={"Add Task"}
            radius={"lg"}
            classes={"-mt-2"}
            onclick={handleCreateTask}
          />
        </>
      }
    />
  );
};

export default CreateTask;
