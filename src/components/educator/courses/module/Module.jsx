import { ChevronDown, Edit2Icon, Trash2Icon } from "lucide-react";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import Video from "./Video";
import File from "./File";
import Links from "./Links";
import Content from "./Content";

const materials = ["Video", "File", "Links", "Content"];

const Module = () => {
  const [open, setOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState(materials[0]);

  return (
    <div className="w-full">
      <div>
        <div
          className={twMerge(
            `flex w-full cursor-pointer items-center justify-between rounded-t-lg border p-3 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800 ${
              open && "bg-gray-100 dark:bg-gray-800"
            }`,
          )}
        >
          <span
            className="flex w-full cursor-pointer items-center text-base dark:text-white"
            onClick={() => setOpen(!open)}
          >
            <ChevronDown className="mr-3 h-4 w-4" />
            Module 1
          </span>

          <span className="flex items-center dark:text-white">
            <Edit2Icon className="mr-3 h-5 w-5 rounded-md bg-green-600 p-1 text-white" />
            <Trash2Icon className="mr-3 h-5 w-5 rounded-md bg-red-600 p-1 text-white" />
          </span>
        </div>
      </div>
      <div className={twMerge(`${!open && "hidden"}`)}>
        <div className="border border-t-0 border-gray-200 p-5 dark:border-gray-700 dark:bg-gray-900">
          <div className="mb-8 flex w-fit rounded-md border text-sm dark:border-gray-700">
            {materials?.map((material, index) => (
              <div
                role="button"
                key={index}
                className={twMerge(
                  `rounded-md px-2 py-2 dark:text-white ${
                    selectedMaterial === material && "bg-blue-600 text-white"
                  }`,
                )}
                onClick={() => setSelectedMaterial(material)}
              >
                {material}
              </div>
            ))}
          </div>

          {selectedMaterial === "Video" ? (
            <Video />
          ) : selectedMaterial === "File" ? (
            <File />
          ) : selectedMaterial === "Links" ? (
            <Links />
          ) : (
            <Content />
          )}
        </div>
      </div>
    </div>
  );
};

export default Module;
