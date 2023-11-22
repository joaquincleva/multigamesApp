import { ListItem, Tooltip, Typography } from "@mui/material";
import { drawerItems } from "./DrawerItems";
import { NavLink } from "react-router-dom";

interface ContentDrawerProps {
    useGetCurrentBreakpoint: (arg0: number) => string
    windowWidth: number,
    open: boolean
}

const ContentDrawer = ({useGetCurrentBreakpoint, windowWidth, open}:ContentDrawerProps) => {
  const currentBreakpoint = useGetCurrentBreakpoint(windowWidth);

  return (
    <>
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
              paddingY: "0px !important",
              margin: "0px !important",
              ...(currentBreakpoint !== "xs" &&
              currentBreakpoint !== "sm" &&
              currentBreakpoint !== "md" &&
              !open
                ? {
                    paddingY: "5px !important",
                  }
                : ""),

            //   "&:hover": { color: colors.vezaError },
            }}
          >
            <NavLink
              to={`${item.route}`}
              end
              className="navLink"
              style={{
                paddingLeft: open ? "20px" : "10px",
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
                  color: "inherit",
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
