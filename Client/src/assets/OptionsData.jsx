import MovieCreationIcon from "@mui/icons-material/MovieCreation";
import TvIcon from "@mui/icons-material/Tv";
import RecommendIcon from "@mui/icons-material/Recommend";

export const OptionsData = [
  {
    id: 1,
    value: "Recommended",
    path: "section/Recommended Movies",
    icon: RecommendIcon,
  },
  {
    id: 2,
    path: "section/latest",
    value: "Latest Releases",
    icon: TvIcon,
  },
  {
    id: 3,
    path: "section/toprated",
    value: "Top Rated",
    icon: MovieCreationIcon,
  },
];
