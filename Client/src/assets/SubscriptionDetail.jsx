import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import LaptopIcon from "@mui/icons-material/Laptop";
import FourKIcon from "@mui/icons-material/FourK";
import HighQualityIcon from "@mui/icons-material/HighQuality";
import SdIcon from "@mui/icons-material/Sd";
import TabletIcon from "@mui/icons-material/Tablet";
import ConnectedTvIcon from "@mui/icons-material/ConnectedTv";

const SubscriptionDetail = [
  {
    plan: "Basic",
    quality: SdIcon,
    devices: "2",
    price: "$10",
    benefits: ["Unlimited Streaming", "Max-Resolution : 480p", "Mono Sound"],
    color: "#1976d2",

    icons: [<PhoneAndroidIcon />, <TabletIcon />],
  },
  {
    plan: "Standard",
    quality: HighQualityIcon,
    devices: "3",
    price: "$49",
    benefits: [
      "Unlimited Streaming",
      "Ad-Free Movies",
      "Max-Resolution : 1080p",
      "Stereo Sound",
    ],
    color: "#388e3c",
    icons: [<PhoneAndroidIcon />, <TabletIcon />, <LaptopIcon />],
  },
  {
    plan: "Premium",
    quality: FourKIcon,
    devices: "4",
    price: "$99",
    benefits: [
      "Unlimited Streaming",
      "Ad-Free Movies and Shows",
      "Max-Resolution : 4K+HDR",
      "Dolby Atmos",
    ],
    color: "#5e35b1",
    icons: [
      <PhoneAndroidIcon />,
      <TabletIcon />,
      <LaptopIcon />,
      <ConnectedTvIcon />,
    ],
  },
];

export default SubscriptionDetail;
