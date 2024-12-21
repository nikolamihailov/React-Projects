import styles from "./planets.module.css";

const PlanetBig = ({ name, tagline, description, picture, numberOfMoons, yearLength, onBackClick }) => {
  return (
    <div className={styles.planetBig}>
      <h2>{name}</h2>
      <img src={picture} alt="" />
      <i>{tagline}</i>
      <table>
        <tbody>
          <tr>
            <th>Description:</th>
            <td>{description}</td>
          </tr>
          <tr>
            <th>Year Length:</th>
            <td>{yearLength}</td>
          </tr>
          <tr>
            <th>Moons:</th>
            <td>{numberOfMoons}</td>
          </tr>
        </tbody>
      </table>
      <div>
        <a href={`https://en.wikipedia.org/wiki/${name}`} target="_blank">
          MORE INFO
        </a>
        <button className="back-btn" onClick={onBackClick}>
          <i className="fa-solid fa-arrow-left"></i>
        </button>
      </div>
    </div>
  );
};
export default PlanetBig;
