import { Planet } from "../../types/Planet";
import styles from "./planets.module.css";

type PlanetSmallProps = {
  planetData: Planet;
  onPlanetClick: (name: string) => void;
};

const PlanetSmall = ({ planetData, onPlanetClick }: PlanetSmallProps) => {
  return (
    <div className={styles.planetSmall} onClick={() => onPlanetClick(planetData.name)}>
      <h2>{planetData.name}</h2>
      <img src={planetData.picture} alt={planetData.name} />
    </div>
  );
};

export default PlanetSmall;
