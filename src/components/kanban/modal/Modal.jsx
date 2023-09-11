import React from "react";
import FormInput from "../../form/FormInput";
import Button from "../../Button";
import { X } from "lucide-react";
import { twMerge } from "tailwind-merge";

const Modal = ({ openModal, setOpenModal }) => {
  return (
    <div>
      <div
        className={twMerge(
          `fixed bottom-0 left-0 right-0 top-0 z-10 cursor-pointer bg-black opacity-40 ${
            openModal ? "" : "hidden"
          }`,
        )}
        onClick={() => setOpenModal(false)}
      ></div>
      <div
        className={twMerge(
          `fixed left-[50%] top-[50%] z-50  h-full w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 transform p-4 md:h-auto ${
            openModal ? "" : "hidden"
          }`,
        )}
      >
        <div className="relative rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-5">
          <div className="mb-4 flex items-center justify-between rounded-t border-b pb-4 dark:border-gray-600 sm:mb-5">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Create Project
            </h3>
            <button
              type="button"
              className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={() => setOpenModal(false)}
            >
              <X />
            </button>
          </div>
          <div action="#">
            <div className="mb-4 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <FormInput
                  label="Project Name"
                  placeholder="Write your team name, project name"
                  type="text"
                  required={true}
                  name="email"
                  // onChange={(text) => setEmail(text)}
                  // leftIcon={<FaEnvelope className="text-sm text-slate-400" />}
                />
              </div>
            </div>
            <Button label={"Create Project"} radius={"lg"} classes={"-mt-2"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
