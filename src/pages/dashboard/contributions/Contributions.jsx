import React, { useEffect, useState } from "react";
import Dashboard from "../Dashboard";
import getAPIData from "../../../hooks/getAPIData";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import Paragraph from "../../../components/texts/Paragraph";
import axios from "axios";

const Contributions = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((store) => store.user);
  const [contrubutions, setContributions] = useState([]);
  const [contributionTemp, setContributionsTemp] = useState([]);

  useEffect(() => {
    const getContributions = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_DJANGO_API}/contributions`,
        );

        setContributionsTemp(response.data.data.reverse());
      } catch (error) {
        console.log(error);
      }
    };

    getContributions();
  }, []);

  const { data, loading, error } = getAPIData(
    `${import.meta.env.VITE_DJANGO_API}/contributions/submissions/`,
    {
      headers: {
        Authorization: `Token ${user?.token}`,
      },
    },
  );

  useEffect(() => {
    if (!loading && !error) {
      setContributions(data.data);
    }
  }, [data, loading, error]);

  // Function to find the contribution title where contribution_id matches
  const findContributionTitle = (contributionId) => {
    const contribution = contributionTemp.find(
      (contribution) => contribution.contribution_id === contributionId,
    );
    return contribution ? contribution.contribution_title : "";
  };

  return (
    <Dashboard>
      <div className="flex flex-wrap">
        {loading ? (
          <BlogLoadingSkeleton count={3} />
        ) : !contrubutions || contrubutions?.length <= 0 ? (
          <div className="flex items-center justify-center gap-2 text-sm font-medium dark:text-gray-300">
            No Contributions Application
          </div>
        ) : (
          contrubutions &&
          contrubutions.map((contribution) => (
            <div key={contribution.contribution_submission_id}>
              <article className="m-2 rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800 md:w-[45%] lg:w-[80%]">
                <Paragraph classes={"mb-4 mt-2 text-xs font-semibold"}>
                  Title: {findContributionTitle(contribution.contribution_id)}
                </Paragraph>

                <Paragraph classes={"mb-4 mt-2 text-xs font-semibold"}>
                  Description: {contribution.submission_desctiption}
                </Paragraph>

                <Paragraph classes={"text-xs font-bold"}>
                  Submitted by: {contribution.contribution_submitted_by}
                </Paragraph>
              </article>
            </div>
          ))
        )}
      </div>
    </Dashboard>
  );
};

export default Contributions;

const BlogLoadingSkeleton = ({ count }) => {
  return Array(count)
    .fill(0)
    .map((item, index) => (
      <article
        className="m-2 rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800 md:w-[45%] lg:w-[30%]"
        key={index}
      >
        <Skeleton />
        <Skeleton width={100} height={12} />
        <div className="flex items-center gap-2">
          <Skeleton height={25} width={25} circle={true} />
          <Skeleton height={25} width={25} circle={true} />
        </div>
      </article>
    ));
};
