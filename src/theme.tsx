import { ThemeProvider } from "@mui/material";
import createTheme from "@mui/material/styles/createTheme";
import { useState, useMemo, createContext } from "react";
import { grey } from "@mui/material/colors";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

interface ResponsiveDrawerProps {
  children: React.ReactNode;
}

export default function ToggleColorMode({ children }: ResponsiveDrawerProps) {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: "#000",
            ...(mode === "dark" && {
              main: "#FFF",
              info: "#2196f3"
            }),
          },
          ...(mode === "dark" && {
            background: {
              default: grey[900],
              paper: "#000",
            },
          }),
          text: {
            ...(mode === "light"
              ? {
                  primary: "#666",
                  secondary: "#000",
                }
              : {
                  primary: "#fff",
                  secondary: "#666",
                }),
          },
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
}
