import React from "react";
import Button from "../../../Button";
import FormInput from "../../../form/FormInput";

const Links = () => {
  return (
    <div>
      <div className="flex flex-col gap-5 md:flex-row md:items-center">
        <FormInput
          label="Link *"
          type="text"
          required={true}
          placeholder={"Link"}
          className={"mb-0 md:w-[300px]"}
          // value={moduleName}
          // onChange={(text) => seeModuleName(text)}
        />
        <Button
          label={"Submit"}
          radius={"lg"}
          classes={"px-3 py-2 md:-mb-3 h-fit w-fit"}
          //   onclick={handleAddModule}
        />
      </div>
    </div>
  );
};

export default Links;
