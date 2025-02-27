import { Outlet } from "react-router-dom";
import Header from "../features/shared/components/Header/Header";

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
