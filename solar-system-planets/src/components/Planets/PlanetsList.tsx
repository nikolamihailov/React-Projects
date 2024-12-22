import { useState } from "react";
import { planetService } from "../../services/api";
import { Planet } from "../../types/Planet";
import PlanetBig from "./PlanetBig";
import PlanetSmall from "./PlanetSmall";
import Spinner from "../Spinner/Spinner";
import styles from "./planets.module.css";

const PlanetList = ({ planets }: { planets: Planet[] }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [planetSelected, setPlanetSelected] = useState<Planet | null>(null);

  const onPlanetClick = async (planetName: string) => {
    try {
      setIsLoading(true);
      const planet = await planetService.getPlanet(planetName);
      setPlanetSelected(planet);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onBackClick = () => {
    setPlanetSelected(null);
  };

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && planetSelected ? (
        <PlanetBig planetData={planetSelected} onBackClick={onBackClick} />
      ) : (
        <div className={styles.planetsContainer}>
          {!isLoading &&
            !planetSelected &&
            planets.map((p) => <PlanetSmall key={p.name} planetData={p} onPlanetClick={onPlanetClick} />)}
        </div>
      )}
    </>
  );
};

export default PlanetList;
