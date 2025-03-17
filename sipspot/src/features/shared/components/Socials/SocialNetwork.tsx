export type SocialNetworkProps = {
    linkUrl: string,
    networkName: string,
};

function SocialNetwork({ linkUrl, networkName }: SocialNetworkProps) {
    return (
        <li>
            <a href={linkUrl} target="_blank">
                <i className={`fa-brands fa-${networkName.toLowerCase()}`}></i>
            </a>
        </li>
    );
}

export default SocialNetwork;
