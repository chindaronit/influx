import { fetchDataFromApi } from "../utils/api";
import { getGenres } from "../features/homePage/homePageSlice";

const FetchApiGenres = async (dispatch) => {
  let promises = [];
  let endpoints = ["tv", "movie"];
  let Genres = {};

  endpoints.forEach((url) => {
    promises.push(fetchDataFromApi(`/genre/${url}/list`));
  });

  // promise.all return to data when genre from both endpoints is present
  const data = await Promise.all(promises);
  data.map(({ genres }) => {
    return genres.map((item) => (Genres[item.id] = item));
  });

  dispatch(getGenres(Genres));
};

export default FetchApiGenres