import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Heading from "../../components/texts/Headings";
import SingleContribution from "../../components/opencontributions/SingleContribution";
import AddContributionsModal from "../../components/opencontributions/AddContributionsModal";
import axios from "axios";
import { Loader2Icon } from "lucide-react";
import Paragraph from "../../components/texts/Paragraph";

const OpenContributions = () => {
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getContributions = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_DJANGO_API}/contributions`,
        );

        setContributions(response.data.data.reverse());
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getContributions();
  }, []);

  return (
    <Layout>
      <div className="mb-5 flex items-center justify-between">
        <Heading level={2}>Search for open contributions</Heading>
        <AddContributionsModal />
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
          <Loader2Icon className="h-4 w-4 animate-spin cursor-pointer " />
          <Paragraph>Loading...</Paragraph>
        </div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : (
        <div>
          {contributions.length > 0 ? (
            contributions.map((contribution) => (
              <SingleContribution
                key={contribution.contribution_id}
                contribution={contribution}
              />
            ))
          ) : (
            <Paragraph>No contributions found</Paragraph>
          )}
        </div>
      )}
    </Layout>
  );
};

export default OpenContributions;
