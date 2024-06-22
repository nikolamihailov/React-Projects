import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { ChangeEvent, useState } from "react";

const API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY;
const BASE_URL = import.meta.env.VITE_OPEN_WEATHER_BASE_URL;
const GEO_API = import.meta.env.VITE_OPEN_WEATHER_GEO_API;
const LIMIT = import.meta.env.VITE_CITY_DROPDOWN_LIMIT;
const FLAGS_API = import.meta.env.VITE_FLAGS_API;
const FLAGS_STYLE = import.meta.env.VITE_FLAGS_STYLE;
const FLAGS_SIZE = import.meta.env.VITE_FLAGS_SIZE;
const WEATHER_API = import.meta.env.VITE_OPEN_WEATHER_WEATHER_API;

type City = {
  name: string;
  country: string;
  lat: number;
  lon: number;
  ["local_names"]: object;
  sys: {
    country: string;
  };
};

function App() {
  const [city, setCity] = useState("");
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [fetchedCities, setFetchedCities] = useState(Array<City>);

  const fetchCitities = async (city: string) => {
    if (city === "") return;
    const res = await fetch(
      `${BASE_URL}${GEO_API}?q=${city}&limit=${LIMIT}&appid=${API_KEY}`
    );
    const data = await res.json();
    const uniqueCities: City[] = [];

    data.forEach((item: City) => {
      if (!uniqueCities?.map((city: City) => city.name).includes(item.name))
        uniqueCities.push(item);
    });

    setFetchedCities(uniqueCities);
  };

  const fetchCityDetails = async (lat: number, lon: number) => {
    const res = await fetch(
      `${BASE_URL}${WEATHER_API}?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );
    return await res.json();
  };

  const onCityInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
    fetchCitities(e.target.value.trim());
  };

  const onCityClicked = async (lat: number, lon: number) => {
    const city = await fetchCityDetails(lat, lon);
    console.log(city);
    setSelectedCity(city);
  };

  return (
    <main className="box-border flex h-screen w-screen items-center justify-evenly bg-gradient-to-br from-blue-700 to-blue-900">
      {selectedCity && (
        <section className="backdrop-blur-xlg drop-shadow-xlg flex h-4/5 w-4/5 flex-col items-center justify-center rounded bg-white bg-opacity-15 p-8 text-center md:h-3/5 md:max-w-3xl">
          <h1 className="text-white">{selectedCity.name}</h1>
          <img
            src={`${FLAGS_API}/${selectedCity.sys.country}/${FLAGS_STYLE}/${FLAGS_SIZE}.png`}
            alt={selectedCity.sys.country}
            className=" mx-2 h-7 w-7"
          />
        </section>
      )}
      {!selectedCity && (
        <section className="backdrop-blur-xlg drop-shadow-xlg flex h-full flex-col items-center justify-center rounded bg-white bg-opacity-15 p-8 text-center md:h-3/5 md:max-w-3xl">
          <h1 className="-mt-8 text-4xl font-thin md:text-5xl xl:text-6xl">
            <span className="bg-gradient-to-br from-white  via-orange-600 to-red-700 bg-clip-text font-black text-transparent">
              Weather
            </span>
            <span className="bg-gradient-to-br from-blue-500 via-blue-400 to-white bg-clip-text font-black text-transparent">
              Forecast
            </span>
          </h1>
          <p className="my-8 text-xl text-white md:my-6">
            Welcome to your friendly weather teller. Enter your city name for
            more information.
          </p>
          <div className="relative my-2 flex flex-col">
            <form className="relative flex items-center text-white">
              <input
                className="w-full rounded-full  border border-blue-400 bg-transparent px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-200 focus:outline-none focus:ring focus:ring-blue-400 md:px-6 md:py-3 md:text-lg"
                type="text"
                placeholder="London..."
                value={city}
                onChange={onCityInputChange}
              />
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute right-3 h-4 text-white md:h-6"
              />
            </form>
            <div className="absolute left-0 right-0 top-9 my-4 flex items-center justify-center text-center">
              {city.length > 0 && fetchedCities.length > 0 && (
                <ul className=" w-full list-none text-xl text-white">
                  {fetchedCities?.map((city) => {
                    return (
                      <li
                        className="my-2 flex justify-center border-b-2 border-b-blue-400 p-2 transition-all duration-300 ease-in hover:cursor-pointer hover:rounded-full hover:bg-blue-300 hover:text-stone-900 hover:shadow-sm hover:shadow-blue-50"
                        key={Date.now() + city.lat}
                        onClick={() => onCityClicked(city.lat, city.lon)}
                      >
                        <span>{city.name},</span>
                        <img
                          src={`${FLAGS_API}/${city.country}/${FLAGS_STYLE}/${FLAGS_SIZE}.png`}
                          alt={city.country}
                          className=" mx-2 h-7 w-7"
                        />
                      </li>
                    );
                  })}
                </ul>
              )}
              {city.length > 0 && fetchedCities.length === 0 && (
                <p className="mt-2 w-4/5 text-stone-100">
                  No cities found with this name!
                </p>
              )}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

export default App;
