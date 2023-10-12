import React, { useEffect, useState } from "react";
import Button from "../../../components/Button";
import { Link } from "react-router-dom";
import Modal from "../../../components/kanban/modal/Modal";
import Layout from "../../../components/Layout";
import FormInput from "../../../components/form/FormInput";
import FormTextarea from "../../../components/form/FormTextarea";
import axios from "axios";
import { useSelector } from "react-redux";
import AddMembersDropdown from "../../../components/kanban/board/dropdowns/AddMembersDropdown";

const KanbanHome = () => {
  const { user } = useSelector((store) => store.user);

  const [openModal, setOpenModal] = useState(false);

  const [projects, setProjects] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [leadInfo, setLeadInfo] = useState("");

  // create projects
  const handleCreateProject = async () => {
    let membersIds = [user.user_id];

    const res = await axios.post(
      `${import.meta.env.VITE_NODE_API}/kanban/project`,
      {
        name: title,
        description: description,
        members: membersIds,
        lead: leadInfo.user_id,
      },
      {
        headers: {
          Authorization: `Bearer ${user.user_id}`,
        },
      },
    );

    const data = { ...res.data, lead: leadInfo };

    setTitle("");
    setDescription("");
    setLeadInfo("");
    setOpenModal(false);

    setProjects([...projects, data]);
  };

  useEffect(() => {
    // get all projects in which user is involved
    const handleGetProjects = async () => {
      console.log(user.user_id);
      const res = await axios.get(
        `${import.meta.env.VITE_NODE_API}/kanban/project`,
        {
          headers: {
            Authorization: `Bearer ${user.user_id}`,
          },
        },
      );
      setProjects(res.data);
    };

    handleGetProjects();
  }, []);

  return (
    <Layout>
      <div>
        <Modal
          openModal={openModal}
          setOpenModal={setOpenModal}
          title={"Create Project"}
          children={
            <>
              <div className="mb-4 grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <FormInput
                    label="Project Name"
                    placeholder="Write your team name, project name"
                    type="text"
                    required={true}
                    value={title}
                    onChange={(text) => setTitle(text)}
                  />
                  <FormTextarea
                    label="Description"
                    placeholder="Description"
                    type="text"
                    required={true}
                    value={description}
                    onChange={(text) => setDescription(text)}
                  />
                  <div className="mt-7"></div>
                  <AddMembersDropdown
                    memberInfo={leadInfo}
                    setMemberInfo={setLeadInfo}
                    label={"Project Lead"}
                  />
                </div>
              </div>
              <Button
                label={"Create Project"}
                radius={"lg"}
                classes={"-mt-2"}
                onclick={handleCreateProject}
              />
            </>
          }
        />

        <div className="mb-12 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Projects
          </h2>
          <Button
            label={"Create Project"}
            radius={"lg"}
            classes={"p-2"}
            onclick={() => setOpenModal(true)}
          />
        </div>

        {projects?.length >= 1 && (
          <div className="relative overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm dark:border-none dark:bg-gray-800">
            <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
              <thead className="bg-gray-50 text-xs uppercase text-gray-900 dark:bg-gray-700 dark:text-gray-200">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Lead
                  </th>
                </tr>
              </thead>
              <tbody>
                {projects?.map((project) => (
                  <tr
                    className="border-b bg-white text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
                    key={project._id}
                  >
                    <td className="px-6 py-4">
                      <Link
                        to={`/kanban/${project._id}`}
                        className="hover:underline"
                      >
                        {project.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <Link to="#">{project.lead.user_name}</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default KanbanHome;
