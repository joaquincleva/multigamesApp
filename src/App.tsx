// import { useState } from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./generalComponents/Layout/Layout";
import AppRoutes from "./routes/AppRoutes";
import Rosco from "./pages/Rosco/Rosco";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Provider store={store}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path={`${AppRoutes.ROSCO}`} element={<Rosco />} />
            </Route>
          </Routes>
        </Provider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
