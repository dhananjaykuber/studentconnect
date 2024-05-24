import React from "react";
import Paragraph from "../../../texts/Paragraph";
import Heading from "../../../texts/Headings";
import { Link2Icon } from "lucide-react";

const Project = ({ project, ownerImamge }) => {
  return (
    <div className="mx-0 my-2 flex w-[100%] justify-between gap-2 rounded-md border p-3 dark:border-gray-600 md:m-2 md:w-[48%]">
      <div>
        <a href={project.project_url} target="_blank">
          <Heading level={6} classes={"mb-2"}>
            {project.project_name}
          </Heading>
        </a>
        <Paragraph>{project.project_description}</Paragraph>
        <a href={project.project_deployment_url}>
          <Link2Icon className="h-4 w-4 dark:text-gray-100" />
        </a>
      </div>
      <img
        src={ownerImamge}
        alt="profile"
        className="h-6 w-6 rounded-full object-cover"
      />
    </div>
  );
};

export default Project;
