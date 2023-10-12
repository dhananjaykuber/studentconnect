const axios = require("axios");
const { useState, useEffect } = require("react");

const getAPIData = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async function () {
      setLoading(true);
      try {
        const res = await axios.get(url);

        setData(res.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [url]);

  return { data, loading, error };
};

export default getAPIData;
