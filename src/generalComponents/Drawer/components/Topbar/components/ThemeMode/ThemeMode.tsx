import { Box, IconButton, Tooltip, useTheme } from "@mui/material";
import React from "react";
import { ColorModeContext } from "../../../../../../theme";
import { Brightness2, Brightness7 } from "@mui/icons-material";

const ThemeMode = () => {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "text.primary",
      }}
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
