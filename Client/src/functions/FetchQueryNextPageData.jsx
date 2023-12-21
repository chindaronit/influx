import { fetchDataFromApi } from "../utils/api";

const FetchQueryNextPageData = async (data, setData, setPageNum, url) => {
  console.log("Fetching next page:", url);

  const res = await fetchDataFromApi(url);
  console.log("Response:", res);

  if (res) {
    if (data?.results) {
      setData({
        ...data,
        results: [...data?.results, ...res.results],
      });
    } else {
      setData(res);
    }

    setPageNum((prev) => prev + 1);
  }
};

export default FetchQueryNextPageData;
