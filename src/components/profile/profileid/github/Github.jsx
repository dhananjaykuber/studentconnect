import { VerifiedIcon } from "lucide-react";
import React from "react";
import { FaGithub } from "react-icons/fa";
import Paragraph from "../../../texts/Paragraph";
import GithubProject from "./GithubProject";

const Github = () => {
  return (
    <div>
      <div className="mb-4 flex items-center gap-3">
        <div className="relative w-fit">
          <FaGithub className="h-8 w-8 dark:text-gray-100" />
          <VerifiedIcon className="absolute bottom-[0px] right-[-4px] h-4 w-4 fill-green-600 text-white dark:text-gray-900" />
        </div>
        <Paragraph
          classes={"font-semibold text-gray-900 text-base dark:text-gray-100"}
        >
          Github
        </Paragraph>
      </div>
      <div className="flex items-center justify-between">
        <Paragraph classes={"text-xs"}>Total 4 repositories</Paragraph>
        <div>
          <select className="rounded-sm border border-gray-500 px-2 py-[2px] text-xs font-medium outline-none dark:bg-gray-900 dark:text-gray-200">
            <option value="All Repositories" selected>
              All Repositories
            </option>
            <option value="Pinned Repositories">Pinned Repositories</option>
          </select>
        </div>
      </div>
      <div className="mt-2 flex flex-wrap">
        <GithubProject />
        <GithubProject />
        <GithubProject />
        <GithubProject />
      </div>
    </div>
  );
};

export default Github;
