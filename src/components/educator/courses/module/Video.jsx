import React from "react";
import FormInput from "../../../form/FormInput";
import Button from "../../../Button";

const Video = () => {
  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
      <FormInput
        label="Video Title *"
        type="text"
        required={true}
        placeholder={"Video Title"}
        className={"md:w-[300px]"}
        // value={moduleName}
        // onChange={(text) => seeModuleName(text)}
      />
      <FormInput
        label="Video Url *"
        type="text"
        required={true}
        placeholder={"Video Url"}
        className={"md:w-[300px]"}
        // value={moduleName}
        // onChange={(text) => seeModuleName(text)}
      />
      <Button
        label={"Submit"}
        radius={"lg"}
        classes={"px-3 py-2 mt-0 md:-mb-3 h-fit w-fit"}
        //   onclick={handleAddModule}
      />
    </div>
  );
};

export default Video;
