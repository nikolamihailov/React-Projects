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

  useEffect(() => {
    planetService
      .getAllPlanets()
      .then((data) => {
        setPlanets(data);
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <div style={{minHeight: "100vh"}}>
          <Spinner />
        </div>
      )  : (
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
