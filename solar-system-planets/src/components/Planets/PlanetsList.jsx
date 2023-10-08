import { useState } from "react";
import Planet from "./PlanetSmall";
import PlanetBig from "./PlanetBig";
//import Spinner from "./components/Spinner/Spinner";
import styles from "./planets.module.css";
import { planetService } from "../../services/api";

const PlanetList = ({ planets }) => {
  // const [isLoading, setIsLoading] = useState(true);
  const [isPlanetSelected, setIsPlanetSelected] =
    useState(false);

  const onPlanetClick = async (planetId) => {
    try {
      const planet = await planetService.getPlanet(
        planetId
      );
      setIsPlanetSelected(planet);
      //setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onBackClick = () => {
    setIsPlanetSelected(false);
  };

  return (
    <div className={styles.planetsContainer}>
      {isPlanetSelected ? (
        <PlanetBig
          {...isPlanetSelected}
          onBackClick={onBackClick}
        />
      ) : (
        planets.map((p) => {
          return (
            <Planet
              key={p.id}
              {...p}
              onPlanetClick={onPlanetClick}
            />
          );
        })
      )}
    </div>
  );
};

export default PlanetList;
