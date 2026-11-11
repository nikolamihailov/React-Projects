import { Location, Outlet, ScrollRestoration } from "react-router-dom";
import Header from "../features/shared/components/Header/Header";
import Footer from "../features/shared/components/Footer/Footer";

// Recipes keeps one scroll position for all its filter/search URLs, so ticking a filter doesn't jump to the top.
// Every other navigation gets its own key: new pages open at the top, Back restores where you were.
const getScrollKey = (location: Location) => {
    if (location.pathname === "/recipes") return location.pathname;

    return location.key;
};

function Layout() {
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
            <ScrollRestoration getKey={getScrollKey} />
        </>
    );
}

export default Layout;
