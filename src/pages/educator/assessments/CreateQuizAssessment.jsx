import React, { useState } from "react";
import Sidebar from "../../../components/educator/Sidebar";
import Heading from "../../../components/texts/Headings";
import CreateQuiz from "../../../components/educator/assessments/CreateQuiz";
import Tag from "../../../components/tag/Tag";
import { PlusIcon } from "lucide-react";

const CreateQuizAssessment = () => {
  const [addQuiz, setAddQuiz] = useState(false);

  return (
    <Sidebar>
      <div className="flex items-center justify-between">
        <Heading level={4} classes={"font-semibold"}>
          Cloud Computing Assessment
        </Heading>

        <button
          className="rounded-full border border-gray-500 dark:border-gray-700 dark:bg-gray-800"
          onClick={() => setAddQuiz(true)}
        >
          <Tag
            icon={<PlusIcon className="text-gray-800 dark:text-white" />}
            label={"Add Quiz"}
            iconClasses={"w-4 h-4"}
            spanClasses={"font-medium text-white text-gray-800 dark:text-white"}
          />
        </button>
      </div>

      {addQuiz && <CreateQuiz setAddQuiz={setAddQuiz} />}
    </Sidebar>
  );
};

export default CreateQuizAssessment;
