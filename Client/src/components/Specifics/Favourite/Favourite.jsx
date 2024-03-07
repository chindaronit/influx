import Slide from "./Slide";
import { useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";

const Favourite = ({ handleAlert, setText }) => {
  const { movies, loading } = useSelector((state) => state.favourite);

  if (loading) {
    return (
      <div className="preloader">
        <CircularProgress className="icon" />
      </div>
    );
  }

  return (
    <div className="wrapper">
      {movies?.map((item, index) => {
        return (
          <Slide
            data={item}
            endpoint={item.media_type}
            handleAlert={handleAlert}
            setText={setText}
            key={index}
          />
        );
      })}
    </div>
  );
};

export default Favourite;
