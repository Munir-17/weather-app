import { useState } from "react";
import "./App.css";
import Search from "./Components/search/search";
import Forecast from "./Components/forecast/forecast";
import CurrentWeather from "./Components/current-weather/current-weather";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";
function App() {
  const [currentWeather, setCurrentWeather] = useState({
    city: "Loading...",
    weather: [{ description: "Loading..." }],
    main: { temp: 0, feels_like: 0, humidity: 0, pressure: 0 },
    wind: { speed: 0 },
  });
  const [forecast, setForecast] = useState({
    city: "Loading...",
    list: [
      {
        weather: [{ description: "Loading..." }],
        main: { temp_min: 0, temp_max: 0 },
        clouds: { all: 0 },
        wind: { speed: 0 },
        main: { sea_level: 0, feels_like: 0, humidity: 0, pressure: 0 },
      },
    ],
  });

  const handleOnSearchChange = (searchData) => {
    const [lat, long] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${long}&appid=${WEATHER_API_KEY}&units=metric`
    );

    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${long}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({
          city: searchData.label,
          ...weatherResponse,
        });
        setForecast({
          city: searchData.label,
          list: forecastResponse.list,
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      <CurrentWeather data={currentWeather} />
      <Forecast data={forecast} />
    </div>
  );
}

export default App;
