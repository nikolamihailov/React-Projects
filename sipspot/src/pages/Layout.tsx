import { Outlet } from "react-router-dom";
import Header from "../components/features/shared/Header/Header";

function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
