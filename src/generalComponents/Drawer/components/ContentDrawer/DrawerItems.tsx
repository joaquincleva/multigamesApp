import AppRoutes from "../../../../routes/AppRoutes";
import { Keyboard, BrightnessAuto, Calculate, Flaky, Dashboard } from "@mui/icons-material";

export const drawerItems = [
  {
    route: "",
    icon: <Dashboard sx={{marginRight: "5px", fontSize: 22, color: "inherit"}}/>,
    label: "Dashboard",
  },
  {
    route: AppRoutes.ROSCO,
    icon: <BrightnessAuto sx={{marginRight: "5px", fontSize: 22, color: "inherit"}}/>,
    label: "Rosco",
  },
  {
    route: AppRoutes.MECHANOGRAPHY,
    icon: <Keyboard sx={{marginRight: "5px", fontSize: 22, color: "inherit"}}/>,
    label: "Mechanography",
  },
  {
    route: AppRoutes.MATHGAME,
    icon: <Calculate sx={{marginRight: "5px", fontSize: 22, color: "inherit"}}/>,
    label: "Maths Game",
  },
  {
    route: AppRoutes.FOURCHOICES,
    icon: <Flaky sx={{marginRight: "5px", fontSize: 22, color: "inherit"}}/>,
    label: "Four Choices",
  },
];
