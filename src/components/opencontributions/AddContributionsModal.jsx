import React, { useState } from "react";
import Modal from "../Modal";
import { notifyError, notifySuccess } from "../../utils/toastsPopup";
import Button from "../Button";
import { PlusIcon } from "lucide-react";
import FormInput from "../form/FormInput";
import { useSelector } from "react-redux";
import axios from "axios";

const AddContributionsModal = () => {
  const { user } = useSelector((store) => store.user);

  const [openModal, setOpenModal] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState("");
  const [website, setWebsite] = useState("");
  const [github, setGithub] = useState("");

  const handleAddContribution = async () => {
    if (title.length <= 0 || description.length <= 0 || skills.length <= 0) {
      return notifyError("Please fill all required fields.");
    }

    const data = {
      contribution_title: title,
      contribution_desctiption: description,
      contribution_skills: skills,
      contribution_website: website,
      contribution_github: github,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_DJANGO_API}/contributions/add/`,
        data,
        {
          headers: {
            Authorization: `Token ${user.token}`,
          },
        },
      );

      if (response.status === 201 || response.status === 200) {
        notifySuccess("Contribution added successfully!");

        setTitle("");
        setDescription("");
        setSkills("");
        setWebsite("");
        setGithub("");

        setOpenModal(false);

        window.location.reload();
      } else {
        notifyError("Failed to add contribution.");
      }
    } catch (error) {
      console.log(error);
      notifyError("An error occurred while adding the contribution.");
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="w-10">
      <PlusIcon
        className="h-6 w-6 cursor-pointer text-gray-600 dark:text-gray-300"
        onClick={() => setOpenModal(true)}
      />
      <Modal
        title={"Create New Contributions"}
        openModal={openModal}
        setOpenModal={setOpenModal}
      >
        <FormInput
          label="Contribution Title *"
          type="text"
          required={true}
          placeholder={"Contribution Title"}
          value={title}
          onChange={(text) => setTitle(text)}
        />
        <FormInput
          label="Contribution Description *"
          type="text"
          required={true}
          placeholder={"Contribution Description"}
          value={description}
          onChange={(text) => setDescription(text)}
        />
        <FormInput
          label="Skills *"
          type="text"
          required={true}
          placeholder={"Skills"}
          value={skills}
          onChange={(text) => setSkills(text)}
        />
        <FormInput
          label="Website"
          type="text"
          required={true}
          placeholder={"Website"}
          value={website}
          onChange={(text) => setWebsite(text)}
        />
        <FormInput
          label="GitHub"
          type="text"
          required={true}
          placeholder={"GitHub"}
          value={github}
          onChange={(text) => setGithub(text)}
        />
        <Button
          label={"Submit"}
          radius={"lg"}
          onclick={handleAddContribution}
        />
        <Button
          label={"Cancel"}
          radius={"lg"}
          classes={
            "ml-2 bg-red-600 dark:bg-red-600 hover:bg-red-700 hover:dark:bg-red-700 focus:ring-red-300 dark:focus:ring-red-800"
          }
          onclick={() => setOpenModal(false)}
        />
      </Modal>
    </div>
  );
};

export default AddContributionsModal;
