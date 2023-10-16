import { ChevronDownIcon, ChevronUpIcon, X } from "lucide-react";
import React, { useState } from "react";
import Paragraph from "../texts/Paragraph";

const BlogCategoryDropdown = ({ blogCategories, tags, setTags }) => {
  const [openDropdown, setDropdown] = useState(false);

  const addTag = (category) => {
    if (tags.filter((tag) => tag === category).length <= 0) {
      setTags([...tags, category]);
    }
  };

  const removeTag = (indexToDelete) => {
    setTags((tag) => tags.filter((_, index) => index !== indexToDelete));
  };

  return (
    <div>
      <div
        className="flex justify-between rounded-lg border border-gray-400 p-2 text-sm dark:bg-gray-700 dark:text-gray-300"
        style={{ minHeight: "38px" }}
      >
        <div className="item flex flex-wrap gap-2">
          {tags.length > 0 ? (
            tags.map((tag, index) => (
              <span
                className="flex items-center gap-1 rounded-full bg-gray-200 p-1 px-2 text-xs dark:bg-gray-800"
                key={index}
              >
                {tag}{" "}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => removeTag(index)}
                />
              </span>
            ))
          ) : (
            <Paragraph>Select Tags</Paragraph>
          )}
        </div>
        {openDropdown ? (
          <ChevronUpIcon
            className="h-5 w-5 cursor-pointer text-gray-500"
            onClick={() => setDropdown(false)}
          />
        ) : (
          <ChevronDownIcon
            className="h-5 w-5 cursor-pointer text-gray-500"
            onClick={() => setDropdown(true)}
          />
        )}
      </div>
      {openDropdown && (
        <div className="mt-1 max-h-40 overflow-hidden overflow-y-auto rounded-md border border-gray-200 bg-white p-2 dark:border-gray-700 dark:bg-gray-800">
          <ul>
            {blogCategories.map((category, index) => (
              <li
                className="mb-1 cursor-pointer text-xs font-medium dark:text-gray-300"
                onClick={() => addTag(category)}
                key={index}
              >
                {category}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BlogCategoryDropdown;
