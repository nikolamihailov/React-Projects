import styles from "./planets.module.css";

const PlanetBig = ({
  name,
  description,
  imgSrc,
  wikiLink,
  basicDetails,
  planetOrder,
  onBackClick,
}) => {
  return (
    <div className={styles.planetBig}>
      <h2>{name}</h2>
      <img src={imgSrc.img} alt="" />
      <i>{imgSrc.imgDescription}</i>
      <table>
        <tbody>
          <tr>
            <th>Description:</th>
            <td>{description}</td>
          </tr>
          <tr>
            <th>Order:</th>
            <td>{planetOrder}</td>
          </tr>
          <tr>
            <th>Mass:</th>
            <td>{basicDetails.mass}</td>
          </tr>
          <tr>
            <th>Volume:</th>
            <td>{basicDetails.volume}</td>
          </tr>
        </tbody>
      </table>
      <div>
        <a href={wikiLink} target="_blank">
          MORE INFO
        </a>
        <button onClick={onBackClick}>BACK</button>
      </div>
    </div>
  );
};
export default PlanetBig;
