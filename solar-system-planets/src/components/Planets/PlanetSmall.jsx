import styles from "./planets.module.css";

const Planet = ({ name, picture, onPlanetClick }) => {
  return (
    <div className={styles.planetSmall} onClick={() => onPlanetClick(name)}>
      <h2>{name}</h2>
      <img src={picture} alt={name} onClick={() => onPlanetClick(name)} />
    </div>
  );
};

export default Planet;
