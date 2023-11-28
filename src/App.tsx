import "./App.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./generalComponents/Layout/Layout";
import AppRoutes from "./routes/AppRoutes";
import Rosco from "./pages/Rosco/Rosco";
import Dashboard from "./pages/Dashboard/Dashboard";
import MathGame from "./pages/MathGame/MathGame";
import Mechanography from "./pages/Mechanography/Mechanography";
import FourChoices from "./pages/FourChoices/FourChoices";
import ToggleColorMode from "./theme";

function App() {
  return (
    <ToggleColorMode>
      <BrowserRouter>
        <Provider store={store}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path={`${AppRoutes.ROSCO}`} element={<Rosco />} />
              <Route path={`${AppRoutes.MATHGAME}`} element={<MathGame />} />
              <Route
                path={`${AppRoutes.MECHANOGRAPHY}`}
                element={<Mechanography />}
              />
              <Route
                path={`${AppRoutes.FOURCHOICES}`}
                element={<FourChoices />}
              />
            </Route>
          </Routes>
        </Provider>
      </BrowserRouter>
    </ToggleColorMode>
  );
}

export default App;
