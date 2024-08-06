import InvigilatorsIcon from "@mui/icons-material/People";
import SecurityIcon from "@mui/icons-material/Security";
import NursesIcon from "@mui/icons-material/LocalHospital";
import ITSupportIcon from "@mui/icons-material/Computer";
import AdministrativeIcon from "@mui/icons-material/Business";
import AttachMoney from "@mui/icons-material/AttachMoney";
import { FaChalkboardTeacher } from "react-icons/fa";

export const StaffTabsLinks = [
  {
    id: "invigilators",
    label: "Invigilators",
    icon: <InvigilatorsIcon />,
  },
  {
    id: "security",
    label: "Security",
    icon: <SecurityIcon />,
  },
  {
    id: "nurses",
    label: "Nurses",
    icon: <NursesIcon />,
  },
  {
    id: "itSupport",
    label: "IT Support",
    icon: <ITSupportIcon />,
  },
  {
    id: "administrative",
    label: "Administrative",
    icon: <AdministrativeIcon />,
  },
  {
    id: "feeCollectors",
    label: "Fee Collectors",
    icon: <AttachMoney />,
  },
  {
    id: "ta",
    label: "TA",
    icon: <FaChalkboardTeacher />,
  },
];
