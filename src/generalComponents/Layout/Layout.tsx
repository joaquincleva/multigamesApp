import { Outlet } from "react-router-dom";
import ResponsiveDrawer from "../Drawer/ResponsiveDrawer";

function Layout() {
  return (
    <>
      <ResponsiveDrawer>
        <Outlet />
      </ResponsiveDrawer>
    </>
  );
}

export default Layout;
