import AppRoutes from "../../../../routes/AppRoutes"
import { Keyboard, Brightness7, Calculate, Flaky } from '@mui/icons-material';

export const drawerItems = [
    {
        route: AppRoutes.ROSCO,
        icon: <Brightness7 />,
        label: "Rosco"
      },
      {
        route: AppRoutes.MECHANOGRAPHY,
        icon:  <Keyboard />,
        label: "Mechanography",
      },
      {
        route: AppRoutes.MATHGAME,
        icon:  <Calculate />,
        label: "Maths Game",
      },
      {
        route: AppRoutes.MATHGAME,
        icon:  <Flaky />,
        label: "Four Choices",
      }
]