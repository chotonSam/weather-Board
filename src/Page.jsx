import { useContext, useEffect, useState } from "react";
import Header from "./components/header/Header";
import { WeatherContext } from "./context";
import useLocationEnabled from "./hooks/useLocationEnabled";

import ClearSkyImage from "./assets/backgrounds/clear-sky.jpg";
import FewCloudsImage from "./assets/backgrounds/few-clouds.jpg";
import MistImage from "./assets/backgrounds/mist.jpeg";
import RainyDayImage from "./assets/backgrounds/rainy-day.jpg";
import ScattedCloudsImage from "./assets/backgrounds/scattered-clouds.jpg";
import SnowImage from "./assets/backgrounds/sunny.jpg";
import ThunderStormImage from "./assets/backgrounds/thunderstorm.jpg";
import WinterImage from "./assets/backgrounds/winter.jpg";

import Spinner from "./assets/icons/Fidget_spinner.svg";
import WeatherBoard from "./components/weather/WeatherBoard";

export default function Page() {
  const { weatherData, loading } = useContext(WeatherContext);
  const [climateImage, setClimateImage] = useState("");
  const isLocationEnabled = useLocationEnabled(); // Use the hook to check location services

  function getBackgroundImage(climate) {
    switch (climate) {
      case "Rain":
        return RainyDayImage;
      case "Clouds":
        return ScattedCloudsImage;
      case "Clear":
        return ClearSkyImage;
      case "Snow":
        return SnowImage;
      case "Thunder":
        return ThunderStormImage;
      case "Fog":
        return WinterImage;
      case "Haze":
        return FewCloudsImage;
      case "Mist":
        return MistImage;
      default:
        return ClearSkyImage;
    }
  }

  useEffect(() => {
    if (weatherData.climate) {
      const bgImage = getBackgroundImage(weatherData.climate);
      setClimateImage(bgImage);
    }
  }, [weatherData.climate]);

  // Check if location services are enabled
  if (!isLocationEnabled) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <p className="text-2xl text-gray-800 font-bold mb-4">
            Please enable location services to access weather data.
          </p>
          <button
            onClick={() => window.location.reload()} // Reloads to re-trigger location prompt
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {loading.state ? (
        <div className="flex flex-col items-center justify-center h-screen">
          <img
            src={Spinner}
            alt="Loading..."
            className="animate-spin h-16 w-16 mb-4"
          />
          <p className="text-2xl text-gray-800 font-bold mb-2">
            {loading.message}
          </p>
        </div>
      ) : (
        <div
          style={{ backgroundImage: `url('${climateImage}')` }}
          className="grid place-items-center h-screen bg-no-repeat bg-cover"
        >
          <Header />
          <main>
            <section>
              <WeatherBoard />
            </section>
          </main>
        </div>
      )}
    </>
  );
}
