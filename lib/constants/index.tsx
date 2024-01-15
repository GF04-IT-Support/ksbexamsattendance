import {
  FaHome,
  FaCalendarAlt,
  FaUsers,
  FaClipboardList,
  FaCog,
  FaUserCog,
} from "react-icons/fa";
import InvigilatorsIcon from "@mui/icons-material/People";
import SecurityIcon from "@mui/icons-material/Security";
import NursesIcon from "@mui/icons-material/LocalHospital";
import ITSupportIcon from "@mui/icons-material/Computer";
import AdministrativeIcon from "@mui/icons-material/Business";

export const sidebarLinks = [
  {
    icon: <FaHome />,
    route: "/",
    label: "Dashboard",
  },
  {
    icon: <FaCalendarAlt />,
    route: "/exam-schedule",
    label: "Exam Schedule",
  },
  {
    icon: <FaUsers />,
    route: "/staff-management",
    label: "Staff Management",
  },
  {
    icon: <FaClipboardList />,
    route: "/attendance-tracking",
    label: "Attendance Tracking",
  },
  {
    icon: <FaUserCog />,
    route: "/user-management",
    label: "User Management",
  },
];

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
];
