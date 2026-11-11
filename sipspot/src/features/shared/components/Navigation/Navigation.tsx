import classNames from "classnames";
import { useEffect, useState } from "react";
import { IoClose, IoMenu } from "react-icons/io5";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "../UI/Logo/Logo";
import Nav from "../UI/Nav/Nav";
import logo from "/logo-icon.png";

type NavItem = {
    label: string;
    to: string;
};

// split around the centred logo on desktop
const leftLinks: NavItem[] = [
    { label: "Home", to: "/" },
    { label: "Recipes", to: "/recipes" },
];

const rightLinks: NavItem[] = [
    { label: "Gallery", to: "/gallery" },
    { label: "About us", to: "/about-us" },
];

const NAV_LIST_ID = "main-nav-list";

function Navigation() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { pathname } = useLocation();

    // close the mobile menu after navigating to another page
    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    useEffect(() => {
        if (!isMenuOpen) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") setIsMenuOpen(false);
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isMenuOpen]);

    const handleMenuToggle = () => setIsMenuOpen((isOpen) => !isOpen);

    const renderLinks = (links: NavItem[]) =>
        links.map((link) => (
            <li key={link.to} className="nav__list-item">
                <NavLink to={link.to}>{link.label}</NavLink>
            </li>
        ));

    return (
        <Nav navClassname="main">
            {/* mobile only: logo + menu button */}
            <div className="nav__bar">
                <NavLink to="/" className="nav__brand" aria-label="SipSpot home">
                    <Logo src={logo} width={48} />
                </NavLink>
                <button
                    type="button"
                    className="nav__toggle"
                    aria-expanded={isMenuOpen}
                    aria-controls={NAV_LIST_ID}
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    onClick={handleMenuToggle}
                >
                    {isMenuOpen ? <IoClose aria-hidden="true" /> : <IoMenu aria-hidden="true" />}
                </button>
            </div>

            <ul id={NAV_LIST_ID} className={classNames("nav__list", { "nav__list--open": isMenuOpen })}>
                {renderLinks(leftLinks)}
                <li className="nav__list-item nav__list-item--logo">
                    <NavLink to="/" aria-label="SipSpot home">
                        <Logo src={logo} width={60} />
                    </NavLink>
                </li>
                {renderLinks(rightLinks)}
            </ul>
        </Nav>
    );
}

export default Navigation;
