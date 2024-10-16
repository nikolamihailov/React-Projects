import { useState, useEffect } from "react";
import "./App.css";
import Nav from "./components/Nav/Nav";
import { planetService } from "./services/api";
import Spinner from "./components/Spinner/Spinner";
import PlanetList from "./components/Planets/PlanetsList";
import AudioPlayer from "./components/AudioPlayer/AudioPlayer";
import Footer from "./components/Footer/Footer";

function App() {
  const [planets, setPlanets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  //const [haveError, setHaveError] = useState(false);

  useEffect(() => {
    planetService
      .getAllPlanets()
      .then((data) => {
        // console.log(data);
        setPlanets(data);
        setTimeout(() => setIsLoading(false), 1000);
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
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
