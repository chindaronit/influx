import { fetchDataFromApi } from "../utils/api";

const FetchQueryData = async (  
  setData,
  setPageNum,
  setLoading,
  url
) => {
  try {
    setLoading(true);
    const res = await fetchDataFromApi(url);
    if (res) {
      setData(res);
      setPageNum((prev) => prev + 1);
      setLoading(false);
    }
  } catch (error) {
      console.log(error);
  }
};

export default FetchQueryData;
