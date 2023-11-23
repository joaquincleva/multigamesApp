import {
  Menu as MenuIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";
import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material";
import PopUpTopbar from "./PopUpTopbar/PopUpTopbar";
import ThemeMode from "./components/ThemeMode/ThemeMode";

interface TopbarProps {
  windowWidth: number;
  useGetCurrentBreakpoint: (arg0: number) => string;
  openDrawer: () => void;
  closeDrawer: () => void;
  open: boolean;
}

const Topbar = ({
  windowWidth,
  useGetCurrentBreakpoint,
  openDrawer,
  closeDrawer,
  open,
}: TopbarProps) => {
  const currentBreakpoint = useGetCurrentBreakpoint(windowWidth);

  return (
    <AppBar
      position="fixed"
      sx={{
        display: "flex",
        boxShadow: "none",
        borderBottom: 2,
      }}
      color="inherit"
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          ...(currentBreakpoint == "xs" ||
          currentBreakpoint == "sm" ||
          currentBreakpoint == "md"
            ? { marginLeft: "0px" }
            : open
            ? { marginLeft: "240px" }
            : { marginLeft: "90px" }),
        }}
      >
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={() => {
            currentBreakpoint == "xs" ||
            currentBreakpoint == "sm" ||
            currentBreakpoint == "md"
              ? openDrawer()
              : open
              ? closeDrawer()
              : openDrawer();
          }}
          sx={{
            justifyContent: "start",
          }}
        >
          {currentBreakpoint == "xs" ||
          currentBreakpoint == "sm" ||
          currentBreakpoint == "md" ? (
            <MenuIcon />
          ) : (
            <ChevronRightIcon
              sx={{
                transition: "1s",
                ...(open && { transform: "rotate(180deg)" }),
              }}
            />
          )}
        </IconButton>
        <Grid sx={{width: "100%", justifyItems: "start", display:"flex", ml: 3}}>
          <Typography fontWeight={500} fontSize={currentBreakpoint == "xs" ||
          currentBreakpoint == "sm"?25:42} sx={{fontFamily: "'Montserrat Subrayada', sans-serif"}}>
              Multigames App
          </Typography>
        </Grid>
        <Grid display="flex">
          <ThemeMode />
          <PopUpTopbar />
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
