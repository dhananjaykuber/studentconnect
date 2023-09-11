import React, { useState } from "react";
import Button from "../../../components/Button";
import { Link } from "react-router-dom";
import Modal from "../../../components/kanban/modal/Modal";
import Layout from "../../../components/Layout";

const KanbanHome = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <Layout>
      <div>
        <Modal openModal={openModal} setOpenModal={setOpenModal} />

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
              <tr className="border-b bg-white text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
                <td className="px-6 py-4">
                  <Link to="/kanban/canteen-hub">Canteen Hub</Link>
                </td>
                <td className="px-6 py-4">
                  <Link to="#">Dhananjay Kuber</Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default KanbanHome;
