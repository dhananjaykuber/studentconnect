import { LightbulbIcon, VerifiedIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import Paragraph from "../../../texts/Paragraph";
import Project from "./Project";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProfileProject = () => {
  const { id } = useParams(); // Get the userId from the URL params

  const [projects, setProjects] = useState([]);
  const [ownerImamge, setOwnerImage] = useState("");

  useEffect(() => {
    const getProjects = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_DJANGO_API}/projects/get/owner/${id}`,
        );

        setProjects(res?.data?.projects);

        const projectOwnerUrl = res?.data?.projects[0].project_owner_url;
        const url = new URL(projectOwnerUrl);
        const username = url.pathname.slice(1);
        setOwnerImage(`https://avatars.githubusercontent.com/${username}`);
      } catch (e) {
        console.log(e);
      }
    };

    getProjects();
  }, []);

  return (
    <div className="mt-14 border-t pt-10 dark:border-gray-800">
      <div className="mb-4 flex items-center gap-3">
        <div className="relative w-fit">
          <LightbulbIcon className="h-8 w-8 dark:text-gray-100" />
          <VerifiedIcon className="absolute bottom-[0px] right-[-4px] h-4 w-4 fill-green-600 text-white dark:text-gray-900" />
        </div>
        <Paragraph
          classes={"font-semibold text-gray-900 text-base dark:text-gray-100"}
        >
          My Projects
        </Paragraph>
      </div>

      <div className="mt-2 flex flex-wrap">
        {projects?.map((project) => (
          <Project project={project} ownerImamge={ownerImamge} />
        ))}
      </div>
    </div>
  );
};

export default ProfileProject;
