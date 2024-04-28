import { useState } from "react";
import Planet from "./PlanetSmall";
import PlanetBig from "./PlanetBig";
//import Spinner from "./components/Spinner/Spinner";
import styles from "./planets.module.css";
import { planetService } from "../../services/api";
import Spinner from "../Spinner/Spinner";

const PlanetList = ({ planets }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPlanetSelected, setIsPlanetSelected] = useState(false);

  const onPlanetClick = async (planetId) => {
    try {
      setIsLoading(true);
      const planet = await planetService.getPlanet(planetId);
      setIsPlanetSelected(planet);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onBackClick = () => {
    setIsPlanetSelected(false);
  };

  return (
    <div className={styles.planetsContainer}>
      {isLoading && <Spinner />}

      {!isLoading &&
        !isPlanetSelected &&
        planets.map((p) => {
          return <Planet key={p.id} {...p} onPlanetClick={onPlanetClick} />;
        })}

      {!isLoading && isPlanetSelected && (
        <PlanetBig {...isPlanetSelected} onBackClick={onBackClick} />
      )}
    </div>
  );
};

export default PlanetList;
