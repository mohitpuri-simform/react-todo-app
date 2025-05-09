import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

function Layout() {
  return (
    <>
      <Navbar />

      <main className="p-2">
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
