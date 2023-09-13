import React from "react";
import Modal from "../../modal/Modal";
import FormInput from "../../../form/FormInput";
import Button from "../../../Button";
import FormTextarea from "../../../form/FormTextarea";
import { Search } from "lucide-react";

const EditTask = ({ openModal, setOpenModal }) => {
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
            </div>
          </div>

          <div className="-mt-4 mb-4">
            <div className="sm:col-span-2">
              <FormInput
                label="Name, email or username"
                placeholder="John Doe, johndoe@gmail.com"
                type="text"
                required={true}
                // onChange={(text) => setEmail(text)}
                rightIcon={
                  <Search className="h-5 w-5 text-sm text-slate-400" />
                }
              />
            </div>
            <div>
              <ul className="border border-gray-200 bg-white p-2 dark:border-gray-700 dark:bg-gray-800">
                <li className="flex cursor-pointer items-center gap-3 rounded-md p-2 hover:bg-gray-200 hover:dark:bg-gray-700">
                  <img
                    src="https://flowbite.com/application-ui/demo/images/users/bonnie-green.png"
                    className="h-6 w-6 rounded-full"
                  />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Dhananjay Kuber
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <Button label={"Add Task"} radius={"lg"} classes={"-mt-2"} />
          <Button
            label={"Delete Task"}
            radius={"lg"}
            classes={
              "-mt-2 ml-2 bg-red-500 dark:bg-red-600 dark:hover:bg-red-700 focus:ring-red-300 dark:focus:ring-red-900 hover:bg-red-700"
            }
          />
        </>
      }
    />
  );
};

export default EditTask;
