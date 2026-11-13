import classNames from "classnames";
import { useEffect, useState } from "react";
import { IoClose, IoMenu } from "react-icons/io5";
import { NavLink, useLocation } from "react-router-dom";
import { navLinks } from "@/data/navLinks";
import Button from "@/features/shared/components/UI/Button/Button";
import Logo from "@/features/shared/components/UI/Logo/Logo";
import Nav from "@/features/shared/components/UI/Nav/Nav";
import logo from "/logo-icon.png";

const NAV_MENU_ID = "main-nav-menu";

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

    return (
        <Nav navClassname="main">
            <div className="nav__inner container">
                <NavLink to="/" className="nav__brand" aria-label="SipSpot home">
                    <Logo src={logo} width={40} />
                    <span className="nav__brand-name" aria-hidden="true">
                        Sip<span>Spot</span>
                    </span>
                </NavLink>

                <button
                    type="button"
                    className="nav__toggle"
                    aria-expanded={isMenuOpen}
                    aria-controls={NAV_MENU_ID}
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    onClick={handleMenuToggle}
                >
                    {isMenuOpen ? <IoClose aria-hidden="true" /> : <IoMenu aria-hidden="true" />}
                </button>

                <div id={NAV_MENU_ID} className={classNames("nav__menu", { "nav__menu--open": isMenuOpen })}>
                    <ul className="nav__list">
                        {navLinks.map((link) => (
                            <li key={link.to} className="nav__list-item">
                                {/* `end` so Home isn't highlighted on every page */}
                                <NavLink to={link.to} end={link.to === "/"} className="nav__link">
                                    {link.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                    <Button el="link" href="/#reservation" type="small" variant="primary">
                        Book a table
                    </Button>
                </div>
            </div>
        </Nav>
    );
}

export default Navigation;
