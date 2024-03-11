import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { ChangeEvent, useState } from "react";

function App(): JSX.Element {
  const [city, setCity] = useState<string>("");

  const onCityInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };
  return (
    <>
      <main className="flex h-screen w-screen items-center justify-evenly bg-gradient-to-br from-blue-700 to-blue-900">
        <section className="backdrop-blur-xlg drop-shadow-xlg flex h-full flex-col items-center justify-center rounded bg-white bg-opacity-15 p-8 text-center md:h-3/5 md:max-w-3xl">
          <h1 className="text-4xl font-thin md:text-5xl xl:text-6xl">
            <span className="bg-gradient-to-br from-white  via-orange-600 to-red-700 bg-clip-text font-black text-transparent">
              Weather
            </span>
            <span className="bg-gradient-to-br from-blue-500 via-blue-400 to-white bg-clip-text font-black text-transparent">
              Forecast
            </span>
          </h1>
          <p className=" my-8 text-xl text-white md:my-6">
            Welcome to your friendly weather teller. Enter your city name for
            more information.
          </p>
          <div className="relative flex items-center text-white">
            <input
              className="rounded-full border border-blue-400  bg-transparent px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-200 focus:outline-none focus:ring focus:ring-blue-400 md:px-6 md:py-3 md:text-lg "
              type="text"
              placeholder="London..."
              value={city}
              onChange={onCityInputChange}
            />
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute right-3 h-4 text-white md:h-6"
            />
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
