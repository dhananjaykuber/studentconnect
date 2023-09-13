import React, { useEffect, useState } from "react";
import Button from "../../../components/Button";
import { Link } from "react-router-dom";
import Modal from "../../../components/kanban/modal/Modal";
import Layout from "../../../components/Layout";
import FormInput from "../../../components/form/FormInput";
import FormTextarea from "../../../components/form/FormTextarea";
import axios from "axios";
import { useSelector } from "react-redux";
import { Search, X } from "lucide-react";

const KanbanHome = () => {
  const { user } = useSelector((store) => store.user);

  var typingTimer = null;

  const [openModal, setOpenModal] = useState(false);

  const [projects, setProjects] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [leadName, setLeadName] = useState("");
  const [leadInfo, setLeadInfo] = useState("");
  const [users, setUsers] = useState(null);

  const handleCreateProject = async () => {
    const res = await axios.post(
      `${import.meta.env.VITE_NODE_API}/kanban/project`,
      {
        name: title,
        description: description,
        members: [user.user_id],
        lead: leadInfo._id,
      },
      {
        headers: {
          Authorization: `Basic ${user.user_id}`,
        },
      },
    );

    console.log(res);

    setTitle("");
    setDescription("");
    setOpenModal(false);

    setProjects([...projects, res.data]);
  };

  const handleGetUsers = (text) => {
    setLeadName(text);

    clearTimeout(typingTimer);

    typingTimer = setTimeout(async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_NODE_API}/kanban/users?user=${text}`,
      );

      setUsers(res.data);
      console.log(res.data);
    }, 2000);
  };

  useEffect(() => {
    const handleGetProjects = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_NODE_API}/kanban/project`,
        {
          headers: {
            Authorization: `Bearer ${user.user_id}`,
          },
        },
      );
      console.log(res.data);
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
                  <div className="sm:col-span-2">
                    <FormInput
                      label="Project Lead"
                      placeholder="John Doe, johndoe@gmail.com"
                      type="text"
                      required={true}
                      value={leadName}
                      onChange={(text) => handleGetUsers(text)}
                      rightIcon={
                        <Search className="h-5 w-5 text-sm text-slate-400" />
                      }
                    />
                  </div>
                  {leadInfo && (
                    <div className="mb-3 flex w-fit items-center gap-1 rounded-lg bg-gray-200 p-1 px-2 dark:bg-gray-600">
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-100">
                        {leadInfo.user_name}
                      </span>
                      <X
                        className="h-4 w-4 cursor-pointer text-sm text-slate-700 dark:text-slate-100"
                        onClick={() => setLeadInfo("")}
                      />
                    </div>
                  )}
                  {users?.length > 0 && (
                    <div>
                      <ul className="max-h-40 overflow-hidden overflow-y-auto rounded-md border border-gray-200 bg-white p-1 dark:border-gray-700 dark:bg-gray-800">
                        {users.map((user) => (
                          <li
                            className="flex cursor-pointer items-center gap-3 rounded-md p-2 hover:bg-gray-200 hover:dark:bg-gray-700"
                            key={user._id}
                            onClick={() => {
                              setLeadInfo(user);
                              setUsers(null);
                            }}
                          >
                            <img
                              src={user.profile_image}
                              className="h-6 w-6 rounded-full"
                            />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              {user.user_name}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
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
                    <Link to="#">{project.lead}</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default KanbanHome;
