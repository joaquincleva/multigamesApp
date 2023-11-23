import {
  Card,
  Grid,
  ListItem,
  Tooltip,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import { drawerItems } from "./DrawerItems";
import { NavLink } from "react-router-dom";
import SmartToyIcon from "@mui/icons-material/SmartToy";

const DrawerHeader = styled("div")(({ theme }) => ({
  ...theme.mixins.toolbar,
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  backgroundColor: "white",
  height: 65,
  boxShadow: "inset -2px 0px 0px 0px rgba(0,0,0,0.2)",
  borderRadius: "0px",
}));
import "../../styles/responsiveDrawer.css"

interface ContentDrawerProps {
  useGetCurrentBreakpoint: (arg0: number) => string;
  windowWidth: number;
  open: boolean;
}

const ContentDrawer = ({
  useGetCurrentBreakpoint,
  windowWidth,
  open,
}: ContentDrawerProps) => {
  const currentBreakpoint = useGetCurrentBreakpoint(windowWidth);
  const theme = useTheme()
  return (
    <>
      <DrawerHeader sx={{ marginBottom: "10px" }}>
        <Grid
          gap={1}
          display="flex"
          alignItems={"center"}
          justifyContent={"start"}
          sx={{
            ...(open
              ? {}
              : {
                  height: "65px",
                }),
            backgroundColor: "white",
            width: "100%",
            height: "100%",
            transition: "0.3s",
            boxShadow: "inset -2px 0px 0px 0px rgba(0,0,0,0.2)",
            borderRadius: "0px",
          }}
        >
          <Card
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "0px",
            }}
          >
            <SmartToyIcon fontSize="large" />
            {open ? (
              <Typography sx={{ ml: 1 }}>Multigame App</Typography>
            ) : null}
          </Card>
        </Grid>
      </DrawerHeader>
      {drawerItems.map((item, subIndex) => (
        <Tooltip
          key={subIndex}
          title={!open ? item.label : ""}
          placement="right"
          arrow
        >
          <ListItem
            key={subIndex}
            sx={{
              pt: 1,
              pb: 0,
              ...(currentBreakpoint !== "xs" &&
              currentBreakpoint !== "sm" &&
              currentBreakpoint !== "md" &&
              !open
                ? {
                    paddingY: "5px !important",
                    justifyContent: "center",
                  }
                : ""),
            }}
          >
            <NavLink
              to={`${item.route}`}
              end
              className="navLink"
              style={{
                alignItems: "stretch",
                display: "flex",
                padding: "5px",
                borderRadius: "10px",
                transition: "0.2s ease-in",
                textDecoration: "none",
                color: `${theme.palette.mode == "dark" ? "#FFF": "#000"}`
              }}
            >
              {item.icon}
              <Typography
                sx={{
                  ...(currentBreakpoint !== "xs" &&
                  currentBreakpoint !== "sm" &&
                  currentBreakpoint !== "md" &&
                  !open
                    ? { display: "none" }
                    : ""),
                  color: "inherit"
                }}
              >
                {item.label}
              </Typography>
            </NavLink>
          </ListItem>
        </Tooltip>
      ))}
    </>
  );
};

export default ContentDrawer;
