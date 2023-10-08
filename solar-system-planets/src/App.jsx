import { useState, useEffect } from "react";
import "./App.css";
import Nav from "./components/Nav/Nav";
import { planetService } from "./services/api";
import Spinner from "./components/Spinner/Spinner";
import PlanetList from "./components/Planets/PlanetsList";

function App() {
  const [planets, setPlanets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  //const [haveError, setHaveError] = useState(false);

  useEffect(() => {
    planetService
      .getAllPlanets()
      .then((data) => {
        //console.log(data);
        setPlanets(data);
        setTimeout(() => setIsLoading(false), 1500);
      })
      .catch((err) => {
        //   setHaveError(true);
        console.log(err);
      });
  }, []);

  return (
    <>
      {/* {haveError ? <Error /> : null} */}
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Nav planets={planets} />
          <PlanetList planets={planets} />
        </>
      )}
    </>
  );
}

export default App;
