import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import QueueIcon from "@mui/icons-material/Queue";
import LogoutIcon from "@mui/icons-material/Logout";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";

export const NavItemData = [
  {
    id: 1,
    value: "Home",
    path:"",
    icon: HomeIcon,
  },

  {
    id: 2,
    value: "Search",
    path: "search",
    icon: SearchIcon,
  },
  {
    id: 3,
    value: "Watchlist",
    path: "watchlist",
    icon: QueueIcon,
  },
  {
    id: 4,
    value: "Subscription",
    path: "subscription",
    icon: SubscriptionsIcon,
  },
  {
    id: 5,
    value: "Logout",
    icon: LogoutIcon,
  },
];
