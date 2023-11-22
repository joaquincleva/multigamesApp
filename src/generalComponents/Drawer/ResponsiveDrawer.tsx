import { Box, CssBaseline, Drawer, Toolbar } from "@mui/material";
import { useState, useEffect } from "react";
import React from "react";
import { useTheme } from "@mui/material";
import Topbar from "./components/Topbar/Topbar";
import ContentDrawer from "./components/ContentDrawer/ContentDrawer";

interface ResponsiveDrawerProps {
  children: React.ReactNode;
}

const ResponsiveDrawer = ({ children }: ResponsiveDrawerProps) => {
  const [open, setOpen] = useState(true);

  const openDrawer = () => {
    setOpen(true);
  };

  const closeDrawer = () => {
    setOpen(false);
  };

  const useGetCurrentBreakpoint = (width: number) => {
    const theme = useTheme();

    const { xs, sm, md, lg } = theme.breakpoints.values;

    if (width < xs) {
      return "xs";
    } else if (width < sm) {
      return "sm";
    } else if (width < md) {
      return "md";
    } else if (width < lg) {
      return "lg";
    } else {
      return "xl";
    }
  };

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Topbar
        {...{
          windowWidth,
          useGetCurrentBreakpoint,
          openDrawer,
          closeDrawer,
          open,
        }}
      />
      <Box
        component="nav"
        sx={{
          width: { width: open ? "240px" : "90px" },
          flexShrink: { sm: 0 },
          display: { xs: "none", md: "block" },
        }}
      >
        <Drawer
          variant={
            ["xs", "sm", "md"].includes(useGetCurrentBreakpoint(windowWidth))
              ? "temporary"
              : "permanent"
          }
          open={open}
          onClose={closeDrawer}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block" },
            "& .MuiDrawer-paper": {
              width:
                ["xs", "sm", "md"].includes(
                  useGetCurrentBreakpoint(windowWidth)
                ) || open
                  ? "240px"
                  : "90px",
            },
          }}
        >
          <ContentDrawer {... {useGetCurrentBreakpoint, windowWidth, open}}/>
        </Drawer>
      </Box>
      <Box component="main" flexGrow={1} p={3}>
        <Toolbar/>
        {children}
      </Box>
    </Box>
  );
};

export default ResponsiveDrawer;
