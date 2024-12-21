import { useState } from "react";
import Planet from "./PlanetSmall";
import PlanetBig from "./PlanetBig";
import styles from "./planets.module.css";
import { planetService } from "../../services/api";
import Spinner from "../Spinner/Spinner";

const PlanetList = ({ planets }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [planetSelected, setPlanetSelected] = useState(null);

  const onPlanetClick = async (planetName) => {
    try {
      setIsLoading(true);
      console.log(planetName);
      const planet = await planetService.getPlanet(planetName);
      setPlanetSelected(planet);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onBackClick = () => {
    setPlanetSelected(false);
  };

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && planetSelected ? (
        <PlanetBig {...planetSelected} onBackClick={onBackClick} />
      ) : (
        <div className={styles.planetsContainer}>

          {!isLoading &&
            !planetSelected &&
              planets.map((p) => <Planet key={p.name} {...p} onPlanetClick={onPlanetClick} />)}
        </div>
      )}
    </>
  );
};

export default PlanetList;
