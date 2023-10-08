import styles from "./planets.module.css";

const Planet = ({ id, name, imgSrc, onPlanetClick }) => {
  return (
    <div
      className={styles.planetSmall}
      onClick={onPlanetClick}
    >
      <h2>{name}</h2>
      <img
        src={imgSrc.img}
        alt={name}
        onClick={() => onPlanetClick(id)}
      />
    </div>
  );
};

export default Planet;
