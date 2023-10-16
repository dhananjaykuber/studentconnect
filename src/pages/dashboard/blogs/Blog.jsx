import { Edit2Icon, Trash2Icon } from "lucide-react";
import React from "react";
import { FaArrowRight, FaLaptop } from "react-icons/fa";
import { Link } from "react-router-dom";
import Paragraph from "../../../components/texts/Paragraph";

const Blog = () => {
  return (
    <article className="m-2 rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800 md:w-[45%] lg:w-[30%]">
      <h2 className="mb-2 text-sm font-semibold text-gray-900 dark:text-white">
        <Link to="#">How to quickly deploy a static website</Link>
      </h2>
      <Paragraph classes="mb-2 text-xs">
        Static websites are now used to bootstrap lots of websites and are
        becoming the basis for a variety of tools that even influence both web
      </Paragraph>
      <Paragraph classes={"mb-4 text-xs font-semibold"}>10 Oct 2023</Paragraph>
      <div className="flex gap-2">
        <div className="cursor-pointer rounded-md bg-red-100 p-1 text-red-800 dark:bg-red-700 dark:text-red-300">
          <Trash2Icon className="h-3 w-3" />
        </div>
        <div className="cursor-pointer rounded-md bg-green-100 p-1 dark:bg-green-700 dark:text-green-300">
          <Edit2Icon className="h-3 w-3" />
        </div>
      </div>
    </article>
  );
};

export default Blog;
