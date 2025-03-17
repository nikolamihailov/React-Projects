import { NavLink } from "react-router-dom";
import SocialNetwork from "../Socials/SocialNetwork";
import { SocialNetworks, socials } from "../../../../types/Socials";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer__logo-terms">
                <picture className="footer__logo">
                    <source srcSet="/logo-icon.png 1x, /logo.png 2x" media="(max-width: 60rem)" />
                    <img alt="Full logo" src=" /logo.png" />
                </picture>
                <p className="footer__terms">© {new Date().getFullYear()} All rights reserved.</p>
            </div>
            <div className="footer__links">
                <ul className="footer__nav-list">
                    <li className="footer__nav-item">
                        <NavLink to={"/"}>Home</NavLink>
                    </li>
                    <li className="footer__nav-item">
                        <NavLink to={"/recipes"}>Recipes</NavLink>
                    </li>
                    <li className="footer__nav-item">
                        <NavLink to={"/gallery"}>Gallery</NavLink>
                    </li>
                    <li className="footer__nav-item">
                        <NavLink to={"/about-us"}>About us</NavLink>
                    </li>
                </ul>
            </div>
            <div className="footer__socials-design">
                <ul className="footer__socials">
                    <SocialNetwork linkUrl={socials[SocialNetworks.linkedIn]} networkName={SocialNetworks.linkedIn} />
                    <SocialNetwork linkUrl={socials[SocialNetworks.github]} networkName={SocialNetworks.github} />
                    <SocialNetwork linkUrl={socials[SocialNetworks.instagram]} networkName={SocialNetworks.instagram} />
                </ul>
                <p className="footer__creator">
                    Design:
                    <a href="https://github.com/nikolamihailov" target="_blank">
                        Nikola Mihaylov
                    </a>
                </p>
            </div>
        </footer>
    );
}

export default Footer;
