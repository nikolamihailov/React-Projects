import { Outlet } from "react-router-dom";
import Header from "../features/shared/components/Header/Header";
import Footer from "../features/shared/components/Footer/Footer";

function Layout() {
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
}

export default Layout;
