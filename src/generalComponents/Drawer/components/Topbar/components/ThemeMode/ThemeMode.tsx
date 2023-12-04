import { Box, IconButton, Tooltip, useTheme } from "@mui/material";
import React from "react";
import { ColorModeContext } from "../../../../../../theme";
import { Brightness2, Brightness7 } from "@mui/icons-material";
import { ResponsiveDrawerStyles } from "../../../../styles/ResponsiveDrawer.styles";

const ThemeMode = () => {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  return (
    <Box
      sx={ResponsiveDrawerStyles().themeContainer}
    >
      <Tooltip title={`${theme.palette.mode === "dark" ? "Modo claro":"Modo oscuro"}`}>
        <IconButton onClick={colorMode.toggleColorMode} color="primary">
          {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness2 />}
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default ThemeMode;
