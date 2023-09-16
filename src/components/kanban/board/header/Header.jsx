import React, { useState } from "react";
import { UserPlus2 } from "lucide-react";
import { Link } from "react-router-dom";
import AddContributors from "./AddContributors";
import { useSelector } from "react-redux";
import ToolTip from "../../shared/ToolTip";

const Header = () => {
  const { details } = useSelector((store) => store.kanban);

  const [openModal, setOpenModal] = useState(false);

  return (
    <div>
      <div className="text-sm font-normal text-gray-700 dark:text-gray-300">
        <Link to={"/kanban"} className="hover:underline">
          Projects
        </Link>{" "}
        / Board / Canteen Hub
      </div>

      <div className="mt-10 flex items-center">
        <div className="ml-2 flex">
          {details?.members?.map((member) => (
            <ToolTip
              key={member._id}
              children={
                <Link to="#" className="-ml-2">
                  <img
                    src={member.profile_image}
                    className="h-8 w-8 rounded-full border-[1px] border-gray-300 dark:border-gray-600"
                  />
                </Link>
              }
              message={member.user_name}
            />
          ))}
        </div>
        <UserPlus2
          className="ml-3 h-5 w-5 cursor-pointer text-gray-900 dark:text-gray-50"
          onClick={() => setOpenModal(true)}
        />
      </div>

      <AddContributors openModal={openModal} setOpenModal={setOpenModal} />
    </div>
  );
};

export default Header;
