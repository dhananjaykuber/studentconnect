import React, { useState } from "react";
import Heading from "../texts/Headings";
import Paragraph from "../texts/Paragraph";
import Tag from "../tag/Tag";
import { Link } from "react-router-dom";
import { GithubIcon, Globe2Icon } from "lucide-react";
import FormTextarea from "../form/FormTextarea";
import Button from "../Button";
import axios from "axios";
import { useSelector } from "react-redux";
import { notifyError, notifySuccess } from "../../utils/toastsPopup";

const ContributionDescription = ({ contribution, setOpenModal }) => {
  const { user } = useSelector((store) => store.user);

  const [description, setDescription] = useState("");

  const handleApplyForContribution = async () => {
    console.log("hi");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_DJANGO_API}/contributions/submit/`,
        {
          submission_description: description,
          contribution_id: contribution.contribution_id,
        },
        {
          headers: {
            Authorization: `Token ${user.token}`,
          },
        },
      );
      // Handle success response if needed
      console.log(response.data);
      notifySuccess("Application sent successfully");

      setOpenModal(false);
    } catch (error) {
      // Handle error
      notifyError("Error while submitting application. Please try again.");
      console.error("Error submitting contribution:", error);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <Heading level={4}>{contribution.contribution_title}</Heading>
        <Paragraph classes={"text-base mb-3"}>
          {contribution.contribution_desctiption}
        </Paragraph>
      </div>
      <div className="mt-10 flex flex-col gap-7 lg:flex-row">
        <div className="w-full lg:w-2/3">
          <div className="mb-3">
            <Heading level={6} classes={"mb-2"}>
              Skills
            </Heading>
            <div className="flex flex-wrap gap-3">
              <Tag
                label={contribution.contribution_skills}
                spanClasses={"text-gray-900 bg-gray-100"}
              />
            </div>
          </div>

          <LinkWithIcon
            label={"Website"}
            icon={<Globe2Icon className="h-4 w-4" />}
            link={contribution.contribution_website}
          />

          <LinkWithIcon
            label={"Github"}
            icon={<GithubIcon className="h-4 w-4" />}
            link={contribution.contribution_github}
          />
        </div>
        <div className="h-fit w-full rounded-2xl border border-gray-500 sm:mb-7 lg:w-1/3">
          <div className="flex items-center justify-center rounded-tl-2xl rounded-tr-2xl bg-blue-700 p-5">
            <Heading level={6} classes={"text-white font-semibold"}>
              Contribute to {contribution.contribution_title}
            </Heading>
          </div>
          <div className="p-5">
            <FormTextarea
              label={"What interests you to contribute for this project?"}
              placeholder={"Write here..."}
              value={description}
              onChange={(text) => setDescription(text)}
            />
            <Button
              label={"Apply"}
              radius={"md"}
              onclick={handleApplyForContribution}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const LinkWithIcon = ({ label, icon, link }) => {
  return (
    <div className="mb-3">
      <Heading level={6} classes={"flex gap-2 items-center mb-2"}>
        {label} {icon}
      </Heading>
      <Link to={link}>
        <Paragraph>{link}</Paragraph>
      </Link>
    </div>
  );
};

export default ContributionDescription;
