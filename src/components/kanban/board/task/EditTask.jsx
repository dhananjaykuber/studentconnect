import React, { useState } from "react";
import Modal from "../../modal/Modal";
import FormInput from "../../../form/FormInput";
import Button from "../../../Button";
import FormTextarea from "../../../form/FormTextarea";
import { Search } from "lucide-react";
import AssignedToDropdown from "../dropdowns/AssignedToDropdown";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  deleteTask,
  updateTask,
} from "../../../../features/kanban/kanbanSlice";

const EditTask = ({ openModal, setOpenModal, stageIndex, task, taskIndex }) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [contributors, setContributors] = useState(task.assignedTo);

  const handleUpdateTask = async () => {
    let contributorsIds = [];
    contributors?.map((contributor) => contributorsIds.push(contributor._id));

    console.log(contributorsIds);

    const res = await axios.put(
      `${import.meta.env.VITE_NODE_API}/kanban/task/${task._id}`,
      {
        title: title,
        description: description,
        assignedTo: contributorsIds,
      },
    );

    console.log(res.data);

    dispatch(updateTask({ stageIndex, taskIndex, task: res.data }));

    setOpenModal(false);
  };

  const handleDeleteTask = async () => {
    const res = await axios.delete(
      `${import.meta.env.VITE_NODE_API}/kanban/task/${task._id}`,
    );

    console.log(res.data);

    dispatch(deleteTask({ stageIndex, taskIndex }));
  };

  return (
    <Modal
      openModal={openModal}
      setOpenModal={setOpenModal}
      title={"Edit Task"}
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
                label="Description"
                placeholder="Write descrition about task"
                type="text"
                required={true}
                value={description}
                onChange={(text) => setDescription(text)}
              />
            </div>
          </div>

          <AssignedToDropdown
            contributors={contributors}
            setContributors={setContributors}
          />

          <Button
            label={"Save"}
            radius={"lg"}
            classes={"-mt-2"}
            onclick={handleUpdateTask}
          />
          <Button
            label={"Delete"}
            radius={"lg"}
            classes={
              "-mt-2 ml-2 bg-red-500 dark:bg-red-600 dark:hover:bg-red-700 focus:ring-red-300 dark:focus:ring-red-900 hover:bg-red-700"
            }
            onclick={handleDeleteTask}
          />
        </>
      }
    />
  );
};

export default EditTask;
