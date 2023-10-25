import React, { useEffect, useState } from "react";
import Button from "../../../components/Button";
import { Link } from "react-router-dom";
import Modal from "../../../components/kanban/modal/Modal";
import Layout from "../../../components/Layout";
import FormTextarea from "../../../components/form/FormTextarea";
import { useSelector } from "react-redux";
import getAPIData from "../../../hooks/getAPIData";
import postAPIData from "../../../hooks/postAPIData";
import Loader from "../../../components/Loader";
import Paragraph from "../../../components/texts/Paragraph";
import { notifyError, notifySuccess } from "../../../utils/toastsPopup";

const KanbanHome = () => {
  const { user } = useSelector((store) => store.user);

  const [openModal, setOpenModal] = useState(false);

  const [projects, setProjects] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [leadInfo, setLeadInfo] = useState("");
  const [projectId, setProjectId] = useState("");
  const [projectUrl, setProjectUrl] = useState("");

  // get projects
  const { data, loading, error } = getAPIData(
    `${import.meta.env.VITE_NODE_API}/kanban/project`,
    {
      headers: {
        Authorization: `Bearer ${user.user_id}`,
      },
    },
  );

  useEffect(() => {
    if (!loading && !error) {
      console.log(data);
      setProjects(data);
    }
  }, [data, loading, error]);

  // get projects for projectdropdown
  const [dropdownProjects, setDropdownProjects] = useState(null);

  const {
    data: dropdownData,
    loading: dropdownLoading,
    error: dropdownError,
  } = getAPIData(
    `${import.meta.env.VITE_DJANGO_API}/projects/get/owner/${user.user_id}/`,
    {
      headers: {
        Authorization: `Token ${user.token}`,
      },
    },
  );

  useEffect(() => {
    if (!dropdownLoading && !dropdownError) {
      console.log("Projects: ", dropdownData.projects);
      setDropdownProjects(dropdownData.projects);
    }
  }, [dropdownData, dropdownLoading]);

  // create projects
  const {
    data: createProjectData,
    loading: createProjectLoading,
    error: createProjectError,
    sendData,
  } = postAPIData();

  const handleCreateProject = async () => {
    if (title === "" || description === "" || leadInfo === "") {
      return notifyError("All fields are required.");
    }

    await sendData(
      `${import.meta.env.VITE_NODE_API}/kanban/project`,
      {
        Authorization: `Bearer ${user.user_id}`,
      },
      {
        name: title,
        description: description,
        lead: leadInfo,
        projectId,
        projectUrl,
      },
    );
  };

  useEffect(() => {
    if (createProjectData) {
      const data = { ...createProjectData, lead: leadInfo };

      setTitle("");
      setDescription("");
      setLeadInfo("");
      setOpenModal(false);

      setProjects([...projects, data]);

      notifySuccess("Project created successfully.");
    }
    if (createProjectError) {
      notifyError("Could not create project, try again later.");
    }
  }, [createProjectData, createProjectError]);

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
                  <div className="mb-3">
                    <label className="mb-1 block text-sm font-semibold text-gray-900 dark:font-medium dark:text-gray-100">
                      Select Project
                    </label>
                    <select
                      onChange={(e) => {
                        const selectedOption =
                          e.target.options[e.target.selectedIndex];
                        setTitle(e.target.value);
                        setDescription(
                          selectedOption.getAttribute("data-description"),
                        );
                        setLeadInfo(selectedOption.getAttribute("data-lead"));
                        setProjectId(
                          selectedOption.getAttribute("data-projectId"),
                        );
                        setProjectUrl(
                          selectedOption.getAttribute("data-projectUrl"),
                        );
                      }}
                      className="w-full rounded-lg  border border-gray-400 p-2 text-sm font-medium outline-none dark:bg-gray-700 dark:text-gray-300"
                    >
                      <option hidden={true}>Select Project</option>
                      {dropdownProjects?.map((dropdownproject) => (
                        <option
                          key={dropdownproject.project_id}
                          value={dropdownproject.project_name}
                          data-description={dropdownproject.project_description}
                          data-lead={dropdownproject.project_owner}
                          data-projectId={dropdownproject.project_id}
                          data-projectUrl={dropdownproject.project_url}
                        >
                          {dropdownproject.project_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <FormTextarea
                    label="Description"
                    placeholder="Description"
                    type="text"
                    required={true}
                    value={description}
                    onChange={(text) => setDescription(text)}
                  />
                </div>
              </div>
              <Button
                label={"Create Project"}
                radius={"lg"}
                classes={"-mt-2"}
                onclick={handleCreateProject}
                disable={createProjectLoading}
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

        {loading ? (
          <Loader />
        ) : projects?.length <= 0 ? (
          <Paragraph>No projects found. Please create new projects</Paragraph>
        ) : (
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
                {projects.map((project) => (
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
                      <Link to="#">{project.lead?.user_name}</Link>
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
