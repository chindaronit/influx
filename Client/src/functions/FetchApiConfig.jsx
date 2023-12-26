import { fetchDataFromApi } from "../utils/api";
import { getApiConfiguration } from "../features/homePage/homePageSlice";

const FetchApiConfig = async (dispatch) => {

  const data = await fetchDataFromApi("/configuration");
  const url = {
    backdrop: data.images.secure_base_url + "original",
    poster: data.images.secure_base_url + "original",
    profile: data.images.secure_base_url + "original",
  };
  dispatch(getApiConfiguration(url));
};

export default FetchApiConfig;
