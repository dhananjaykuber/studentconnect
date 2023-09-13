import React from "react";
import Modal from "../../modal/Modal";
import Button from "../../../Button";
import FormInput from "../../../form/FormInput";
import { Search } from "lucide-react";

const AddContributors = ({ openModal, setOpenModal }) => {
  return (
    <Modal
      openModal={openModal}
      setOpenModal={setOpenModal}
      title={"Add Contributor"}
      children={
        <>
          <div className="mb-4">
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
          <Button label={"Add Contributor"} radius={"lg"} classes={"-mt-2"} />
        </>
      }
    />
  );
};

export default AddContributors;
