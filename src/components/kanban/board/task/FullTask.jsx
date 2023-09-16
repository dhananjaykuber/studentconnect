import React, { useState } from "react";
import Modal from "../../modal/Modal";
import { FileText, MessageSquare, PlusIcon } from "lucide-react";
import ToolTip from "../../shared/ToolTip";
import { Link } from "react-router-dom";
import FormTextarea from "../../../form/FormTextarea";
import Button from "../../../Button";
import Comment from "./Comment";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../../../../features/kanban/kanbanSlice";

const FullTask = ({ openModal, setOpenModal, task, stageIndex, taskIndex }) => {
  const dispatch = useDispatch();

  const { user } = useSelector((store) => store.user);

  const [comment, setComment] = useState("");

  const handleAddComment = async () => {
    const res = await axios.put(
      `${import.meta.env.VITE_NODE_API}/kanban/task/${task._id}/comment`,
      {
        message: comment,
        commented_at: new Date(),
      },
      {
        headers: {
          Authorization: `Basic ${user.user_id}`,
        },
      },
    );

    dispatch(
      addComment({ stageIndex, taskIndex, comment: res.data.comments.pop() }),
    );

    setComment("");
  };

  return (
    <Modal
      openModal={openModal}
      setOpenModal={setOpenModal}
      title={task.title}
      children={
        <div>
          <div>
            <div className="mb-5 flex justify-between">
              <div className="flex gap-1 text-sm dark:text-gray-300">
                Added by{" "}
                <span className="font-semibold text-blue-600 dark:text-blue-500">
                  {task.addedBy.user_name}
                </span>
              </div>
              <div className="flex">
                <div className="mr-4 flex cursor-pointer items-center gap-1 rounded-md border border-gray-300 px-1 text-xs font-semibold text-gray-600 dark:border-gray-400 dark:text-gray-400">
                  <PlusIcon className="h-3 w-3 dark:text-gray-400" /> Join
                </div>
                <div className="flex">
                  {task?.assignedTo?.map((assigned) => (
                    <ToolTip
                      key={assigned._id}
                      children={
                        <Link to="#" className="-ml-2">
                          <img
                            src={assigned.profile_image}
                            className="h-7 w-7 rounded-full border-[1px] border-gray-300 dark:border-gray-600"
                          />
                        </Link>
                      }
                      message={assigned.user_name}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-gray-800 dark:text-gray-300" />
              <span className="text-sm font-semibold text-gray-800 dark:text-gray-300">
                Description
              </span>
            </div>
            <div className="mb-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
              {task.description}
            </div>
            <div>
              <div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-gray-800 dark:text-gray-300" />
                  <span className="text-sm font-semibold text-gray-800 dark:text-gray-300">
                    Comments
                  </span>
                </div>
                {task.comments.map((comment, index) => (
                  <Comment
                    key={index}
                    comment={comment}
                    stageIndex={stageIndex}
                    taskIndex={taskIndex}
                    taskId={task._id}
                  />
                ))}
              </div>

              <FormTextarea
                label=""
                placeholder="Write a comment..."
                type="text"
                required={true}
                value={comment}
                onChange={(text) => {
                  setComment(text);
                }}
              />
              <Button
                label={"Post a comment"}
                radius={"lg"}
                leftIcon={<MessageSquare className="h-3 w-3" />}
                classes={"p-2 text-xs"}
                onclick={handleAddComment}
              />
            </div>
          </div>
        </div>
      }
    />
  );
};

export default FullTask;
