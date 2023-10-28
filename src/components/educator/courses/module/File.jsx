import React, { useState } from "react";
import FormInput from "../../../form/FormInput";
import { FilePlus2Icon } from "lucide-react";
import Button from "../../../Button";

const File = ({ setShowContentUploader }) => {
  const [name, setName] = useState("");

  const handleFileSelect = async () => {};

  const handleUploadFile = async () => {
    setShowContentUploader(false);
  };

  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
      <FormInput
        label="File Name *"
        type="text"
        required={true}
        placeholder={"File Name"}
        className={"mb-0 md:w-[300px]"}
        value={name}
        onChange={(text) => setName(text)}
      />
      <div>
        <label className="mb-1 block text-sm font-semibold text-gray-900 dark:font-medium dark:text-gray-100">
          Choose File *
        </label>
        <label
          htmlFor="fileInput"
          className="flex items-center gap-3 rounded-lg border  border-gray-400 p-2 text-sm dark:bg-gray-700 dark:text-gray-300 md:w-[300px]"
        >
          Choose file
          <FilePlus2Icon className="h-4 w-4 text-gray-600 dark:text-gray-300" />
        </label>
        <input
          type="file"
          name="fileInput"
          id="fileInput"
          className="hidden"
          onChange={handleFileSelect}
        />
      </div>
      <Button
        label={"Submit"}
        radius={"lg"}
        classes={"px-3 py-2 md:-mb-5 h-fit w-fit"}
        onclick={handleUploadFile}
      />
    </div>
  );
};

export default File;
