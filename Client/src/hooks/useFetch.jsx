import { useEffect, useState } from "react";
import { fetchDataFromApi } from "../utils/api";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async (url) => {
    try {
      const res = await fetchDataFromApi(url);
      setLoading(false);
      setData(res);
    } catch (error) {
      console.error(error);
      setLoading(false);
      setError("Something went wrong!");
    }
  };

  useEffect(() => {
    setLoading(true);
    setData(null);
    setError(null);
    fetchData(url);
  }, [url]);

  return { data, loading, error };
};




export default useFetch;
