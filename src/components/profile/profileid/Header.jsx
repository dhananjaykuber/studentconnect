import React, { useEffect, useState } from "react";
import Heading from "../../texts/Headings";
import {
  GithubIcon,
  Globe2Icon,
  InstagramIcon,
  LinkedinIcon,
  MailIcon,
  TwitterIcon,
  VerifiedIcon,
  Mail,
} from "lucide-react";
import Paragraph from "../../texts/Paragraph";
import Tag from "../../tag/Tag";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const socialIcons = {
  github: <GithubIcon className="h-4 w-4 text-gray-800 dark:text-gray-500" />,
  linkedin: (
    <LinkedinIcon className="h-4 w-4 text-gray-800 dark:text-gray-500" />
  ),
  instagram: (
    <InstagramIcon className="h-4 w-4 text-gray-800 dark:text-gray-500" />
  ),
  twitter: <TwitterIcon className="h-4 w-4 text-gray-800 dark:text-gray-500" />,
  portfolio: (
    <Globe2Icon className="h-4 w-4 text-gray-800 dark:text-gray-500" />
  ),
};

const Header = () => {
  const { id } = useParams(); // Get the userId from the URL params

  const [userData, setUserData] = useState([]);
  const [ownerImamge, setOwnerImage] = useState("");

  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_DJANGO_API}/projects/get/owner/${id}`,
        );

        console.log(res);

        const userRes = await axios.get(
          `${
            import.meta.env.VITE_DJANGO_API
          }/authentication/get/profile/?username=${id}`,
        );

        const projectOwnerUrl = res?.data?.projects[0].project_owner_url;
        const url = new URL(projectOwnerUrl);
        const username = url.pathname.slice(1);

        setUserData({ ...userRes?.data?.data, github: username });
        setOwnerImage(`https://avatars.githubusercontent.com/${username}`);
      } catch (e) {
        console.log(e);
      }
    };

    getUserData();
  }, []);

  return (
    <div className="flex flex-col-reverse justify-between gap-4 md:flex-row md:gap-10">
      <div>
        <div className="mb-2 flex items-center gap-2">
          <Heading level={4}>{userData.full_name}</Heading>
          <VerifiedIcon className="h-6 w-6 fill-green-600 text-white dark:text-gray-900" />
          <div className="rounded-full border border-gray-400 p-[3px] dark:border-gray-600">
            <a href={`mailto:${userData.email}`}>
              <MailIcon className="h-[14px] w-[14px] text-gray-700 dark:text-white " />
            </a>
          </div>
        </div>
        {/* <Paragraph>
          Software Engineer @ WhatsApp, Meta. Previously worked on Crypto and
          advanced payments integrations at PayPal.
        </Paragraph> */}
        {/* <div className="mt-4 flex flex-wrap gap-3 md:mt-8">
          <Tag
            spanClasses={
              "text-gray-900 py-[2px] dark:text-gray-300 border border-gray-300 font-medium cursor"
            }
            label={"JavaScript"}
          />
          <Tag
            spanClasses={
              "text-gray-900 py-[2px] dark:text-gray-300 border border-gray-300 font-medium cursor"
            }
            label={"Product Management"}
          />
          <Tag
            spanClasses={
              "text-gray-900 py-[2px] dark:text-gray-300 border border-gray-300 font-medium cursor"
            }
            label={"Software Engineer"}
          />
          <Tag
            spanClasses={
              "text-gray-900 py-[2px] dark:text-gray-300 border border-gray-300 font-medium cursor"
            }
            label={"ReactJS"}
          />
        </div> */}
        <div className="mt-5 flex flex-wrap gap-4">
          {/* <Link
            to={"#"}
            className="rounded-full border border-gray-400 p-1 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {socialIcons["github"]}
          </Link>
          <Link
            to={"#"}
            className="rounded-full border border-gray-400 p-1 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {socialIcons["linkedin"]}
          </Link>
          <Link
            to={"#"}
            className="rounded-full border border-gray-400 p-1 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {socialIcons["twitter"]}
          </Link>
          <Link
            to={"#"}
            className="rounded-full border border-gray-400 p-1 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {socialIcons["instagram"]}
          </Link>
          <Link
            to={"#"}
            className="rounded-full border border-gray-400 p-1 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {socialIcons["portfolio"]}
          </Link> */}
        </div>
      </div>
      <div>
        <img
          src={ownerImamge}
          alt="profile"
          className="md:h-35 md:w-35 h-14 w-14 rounded-full object-cover"
        />
      </div>
    </div>
  );
};

export default Header;
