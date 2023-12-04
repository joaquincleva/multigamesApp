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
  ...ResponsiveDrawerStyles().responsiveDrawerHeaderStyled,
}));
import "../../styles/responsiveDrawer.css";
import { ResponsiveDrawerStyles } from "../../styles/ResponsiveDrawer.styles";

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
  const theme = useTheme();
  return (
    <>
      <DrawerHeader sx={{ marginBottom: "10px" }}>
        <Grid
          gap={1}
          sx={ResponsiveDrawerStyles("", open).responsiveDrawerHeader}
        >
          <Card sx={ResponsiveDrawerStyles().responsiveDrawerHeaderCard}>
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
            sx={
              ResponsiveDrawerStyles(currentBreakpoint, open)
                .responsiveDrawerListItem
            }
          >
            <NavLink
              to={`${item.route}`}
              end
              className="navLink"
              style={
                ResponsiveDrawerStyles("", false, theme.palette.mode)
                  .responsiveDrawerStylesNavLink
              }
            >
              {item.icon}
              <Typography
                sx={
                  ResponsiveDrawerStyles(currentBreakpoint, open)
                    .responsiveDrawerStylesText
                }
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
