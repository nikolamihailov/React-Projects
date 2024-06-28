function SocialNetwork({ linkUrl, networkName }) {
  return (
    <li>
      <a href={linkUrl} target="_blank">
        <i className={`fa-brands fa-${networkName.toLowerCase()}`}></i>
      </a>
    </li>
  );
}

export default SocialNetwork;
