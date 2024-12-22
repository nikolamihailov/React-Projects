import { Planet } from "../../types/Planet";
import styles from "./planets.module.css";

type PlanetBigProps = {
  planetData: Planet;
  onBackClick: () => void;
};

const PlanetBig = ({ planetData, onBackClick }: PlanetBigProps) => {
  return (
    <div className={styles.planetBig}>
      <h2>{planetData.name}</h2>
      <img src={planetData.picture} alt="" />
      <i>{planetData.tagline}</i>
      <table>
        <tbody>
          <tr>
            <th>Description:</th>
            <td>{planetData.description}</td>
          </tr>
          <tr>
            <th>Year Length:</th>
            <td>{planetData.yearLength} days</td>
          </tr>
          <tr>
            <th>Number of moons:</th>
            <td>{planetData.numberOfMoons}</td>
          </tr>
        </tbody>
      </table>
      <a href={`https://en.wikipedia.org/wiki/${planetData.name}`} target="_blank">
        MORE INFO
      </a>
      <button className="back-btn" onClick={onBackClick}>
        <i className="fa-solid fa-arrow-left"></i>
      </button>
    </div>
  );
};
export default PlanetBig;
