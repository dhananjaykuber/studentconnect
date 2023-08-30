import React from "react";
import { FaArrowRight, FaLaptop, FaSignInAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const SingleArticle = () => {
  return (
    <article className="rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-5 flex items-center justify-between text-gray-500">
        <span className="bg-primary-100 text-primary-800 dark:bg-primary-200 dark:text-primary-800 inline-flex items-center gap-2 rounded px-2.5 py-0.5 text-xs font-medium">
          <FaLaptop />
          Tutorial
        </span>
        <span className="text-xs">14 days ago</span>
      </div>
      <h2 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
        <a href="#">How to quickly deploy a static website</a>
      </h2>
      <p className="mb-5 text-sm text-gray-500 dark:text-gray-400">
        Static websites are now used to bootstrap lots of websites and are
        becoming the basis for a variety of tools that even influence both web
        designers and developers influence both web designers and developers.
      </p>
      <div className="flex items-center justify-between">
        <Link to={"#"} className="flex items-center space-x-4">
          <img
            className="h-7 w-7 rounded-full"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
            alt="Jese Leos avatar"
          />
          <span className="text-sm font-medium dark:text-white">Jese Leos</span>
        </Link>
        <Link
          to="/"
          className="text-primary-600 inline-flex items-center gap-2 text-sm font-medium hover:underline dark:text-white"
        >
          Read more
          <FaArrowRight className="w-2" />
        </Link>
      </div>
    </article>
  );
};

export default SingleArticle;
