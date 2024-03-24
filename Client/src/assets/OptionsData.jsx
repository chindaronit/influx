import RecommendIcon from "@mui/icons-material/Recommend";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import StarIcon from "@mui/icons-material/Star";
import UpcomingIcon from "@mui/icons-material/Upcoming";

export const OptionsData = [
  {
    id: 1,
    value: "Recommended",
    path: "recommendations",
    icon: RecommendIcon,
  },
  {
    id: 2,
    path: "trending/movie/week",
    value: "Trending",
    icon: LocalFireDepartmentIcon,
  },
  {
    id: 3,
    path: "movie/top_rated",
    value: "Top Rated",
    icon: StarIcon,
  },
  {
    id: 4,
    path: "movie/upcoming",
    value: "Upcoming",
    icon: UpcomingIcon,
  },
];
