import { fetchDataFromApi } from "../utils/api";

const FetchQueryNextPageData = async (
  data,
  setData,
  setPageNum,
  url
) => {
  const res = await fetchDataFromApi(url);

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
