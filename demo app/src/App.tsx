import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function App() {
  return (
    <>
      <main className="flex w-screen h-screen items-center justify-evenly bg-gradient-to-br from-blue-700 to-blue-900">
        <section className="md:max-w-3xl flex flex-col items-center text-center justify-center bg-white backdrop-blur-xlg drop-shadow-xlg bg-opacity-15 w-4/5 h-3/5 rounded p-8">
          <h1 className="font-thin text-4xl md:text-5xl xl:text-6xl">
            <span className="font-black bg-gradient-to-br  from-orange-600 via-red-600 to-white text-transparent bg-clip-text">
              Weather
            </span>
            <span className="font-black bg-gradient-to-br from-blue-500 via-blue-400 to-white text-transparent bg-clip-text">
              Forecast
            </span>
          </h1>
          <p className=" text-xl text-white mt-3">
            Welcome to your friendly weather teller. Enter your city name for
            more information.
          </p>
          <div className="flex items-center rounded-2xl border-4 border-white px-4 py-3 mt-4">
            <input
              className=" bg-transparent text-white text-xl mr-3"
              type="text"
              placeholder="London..."
            />
            <FontAwesomeIcon icon={faSearch} className="text-white" />
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
