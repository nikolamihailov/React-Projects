import { useState, useEffect } from "react";
import "./App.css";
import Nav from "./components/Nav/Nav";
import { planetService } from "./services/api";
import Spinner from "./components/Spinner/Spinner";
import PlanetList from "./components/Planets/PlanetsList";
import Footer from "./components/Footer/Footer";
import { Planet } from "./types/Planet";
import StarsCanvas from "./components/Stars/Stars";

function App() {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    planetService
      .getAllPlanets()
      .then((data) => {
        setPlanets(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <div style={{ minHeight: "100vh" }}>
          <StarsCanvas/>
          <Spinner />
        </div>
      ) : (
          <>
          <StarsCanvas/>
          <Nav />
          <PlanetList planets={planets} />
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
