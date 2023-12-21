import RecommendIcon from "@mui/icons-material/Recommend";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import StarIcon from "@mui/icons-material/Star";
import UpcomingIcon from "@mui/icons-material/Upcoming";

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
    value: "Trending",
    icon: LocalFireDepartmentIcon,
  },
  {
    id: 3,
    path: "section/toprated",
    value: "Top Rated",
    icon: StarIcon,
  },
  {
    id: 4,
    path: "section/toprated",
    value: "Upcoming",
    icon: UpcomingIcon,
  },
];
