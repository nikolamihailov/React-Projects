import { NavLink } from "react-router-dom";
import { barInfo } from "@/data/barInfo";
import { navLinks } from "@/data/navLinks";
import { SocialNetworks, socials } from "@/types/Socials";
import SocialNetwork from "./Socials/SocialNetwork";
import logo from "/logo-icon.webp";

const socialNetworkList = [SocialNetworks.instagram, SocialNetworks.linkedIn, SocialNetworks.github];

function Footer() {
    return (
        <footer className="footer">
            <div className="footer__grid container">
                <div className="footer__brand">
                    <NavLink to="/" className="footer__logo" aria-label="SipSpot home">
                        <img src={logo} alt="" width={40} height={40} loading="lazy" />
                        <span>
                            Sip<span>Spot</span>
                        </span>
                    </NavLink>
                    <p className="footer__tagline">
                        A cocktail bar for slow evenings, good company and drinks made with care - since{" "}
                        {barInfo.foundedYear}.
                    </p>
                    <ul className="footer__socials">
                        {socialNetworkList.map((network) => (
                            <SocialNetwork key={network} linkUrl={socials[network]} networkName={network} />
                        ))}
                    </ul>
                </div>

                <nav className="footer__column" aria-label="Footer">
                    <h2 className="footer__heading">Explore</h2>
                    <ul className="footer__list">
                        {navLinks.map((link) => (
                            <li key={link.to}>
                                <NavLink to={link.to} end={link.to === "/"}>
                                    {link.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="footer__column">
                    <h2 className="footer__heading">Opening hours</h2>
                    <ul className="footer__list">
                        {barInfo.openingHours.map((slot) => (
                            <li key={slot.days} className="footer__hours">
                                <span>{slot.days}</span>
                                <span>{slot.hours}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <address className="footer__column">
                    <h2 className="footer__heading">Visit us</h2>
                    <ul className="footer__list">
                        <li>{barInfo.address}</li>
                        <li>
                            <a href={`tel:${barInfo.phone.replace(/\s/g, "")}`}>{barInfo.phone}</a>
                        </li>
                        <li>
                            <a href={`mailto:${barInfo.email}`}>{barInfo.email}</a>
                        </li>
                    </ul>
                </address>
            </div>

            <div className="footer__bottom container">
                <p>© {new Date().getFullYear()} SipSpot. All rights reserved. Please drink responsibly.</p>
                <p>
                    Design:{" "}
                    <a href="https://github.com/nikolamihailov" target="_blank" rel="noreferrer">
                        Nikola Mihaylov
                    </a>
                </p>
            </div>
        </footer>
    );
}

export default Footer;
