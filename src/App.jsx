import { useState } from "react";
import fetchWeather from "./api/fetchWeather";

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [mode, setMode] = useState("online");

  const search = async (e) => {
    e.preventDefault();
    if (query.trim().length !== 0) {
      // const data = await fetchWeather(query)
      await fetchWeather(query)
        .then((resp) => {
          setWeather(resp);
          setMode("online");
          localStorage.setItem("weather", JSON.stringify(resp));
        })
        .catch(() => {
          setMode("offline");
          let collection = localStorage.getItem("weather");
          setWeather(JSON.parse(collection));
        });
      console.log(weather);
      // console.log(data);
      // setWeather(data);
      setQuery("");
    }
  };
  return (
    <div className="h-screen w-full bg-[url('/bg.jpg')] bg-no-repeat bg-cover items-center justify-center flex flex-col">
      {mode === "offline" && (
        <div className="p-3 rounded-lg bg-yellow-200 my-2 absolute left-0 right-0 top-4 mx-4 w-fit justify-center">
          city is not found or having some issues with the network
        </div>
      )}

      <form
        id="searchform"
        className="w-[70%] md:w-[40%] p-3 rounded-lg flex items-center bg-white gap-2"
        onSubmit={search}
      >
        <input
          name="search"
          className="w-full p-3 rounded-lg"
          placeholder="City name...."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 hover:bg-slate-400 rounded-lg"
          onClick={search}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </form>
      {/* <button className="bg-black p-4 rounded-lg text-white" onClick={search}>
        search
      </button> */}
      {weather.main && (
        <div className="mt-3 rounded-xl bg-slate-300/70 w-[80%] md:w-[50%] flex flex-col justify-center items-center p-4">
          <h2>
            <span className="text-3xl">{weather.name}</span>
            <sup className="px-3 rounded-md text-xl bg-yellow-500">
              {weather.sys.country}
            </sup>
          </h2>
          <div className="my-2 text-2xl font-medium">
            <span>{(Math.round(weather.main.temp) - 273.15).toFixed(1)}</span>{" "}
            <sup>&deg;c</sup>
          </div>
          <div className="my-2">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
            <p className="my-2 text-xl font-bold italic">
              {weather.weather[0].description}{" "}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
