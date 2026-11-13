import { IconType } from "react-icons";
import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { SocialNetworks } from "@/types/Socials";

export type SocialNetworkProps = {
    linkUrl: string;
    networkName: SocialNetworks;
};

const socialIcons: Record<SocialNetworks, IconType> = {
    [SocialNetworks.linkedIn]: FaLinkedinIn,
    [SocialNetworks.github]: FaGithub,
    [SocialNetworks.instagram]: FaInstagram,
};

const socialLabels: Record<SocialNetworks, string> = {
    [SocialNetworks.linkedIn]: "LinkedIn",
    [SocialNetworks.github]: "GitHub",
    [SocialNetworks.instagram]: "Instagram",
};

function SocialNetwork({ linkUrl, networkName }: SocialNetworkProps) {
    const Icon = socialIcons[networkName];

    return (
        <li>
            <a
                className="footer__social-link"
                href={linkUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`SipSpot on ${socialLabels[networkName]}`}
            >
                <Icon aria-hidden="true" />
            </a>
        </li>
    );
}

export default SocialNetwork;
