import { getName } from "country-list";
import { useContext } from "react";
import { WeatherContext } from "../../context";
import { getFormattedDate } from "../../utils/date-util";

import CloudIcon from "../../assets/cloud.svg";
import HazeIcon from "../../assets/haze.svg";
import SnowIcon from "../../assets/icons/snow.svg";
import SunnyIcon from "../../assets/icons/sunny.svg";
import RainIcon from "../../assets/rainy.svg";
import ThunderIcon from "../../assets/thunder.svg";

import pin from "../../assets/pin.svg";

export default function WeatherHeadline() {
  const { weatherData } = useContext(WeatherContext);

  const { location, country, climate, temperature, time } = weatherData;

  function getWeatherIcon(climate) {
    switch (climate) {
      case "Rain":
        return RainIcon;
      case "Clouds":
        return CloudIcon;
      case "Clear":
        return SunnyIcon;
      case "Snow":
        return SnowIcon;
      case "Thunder":
        return ThunderIcon;
      case "Fog":
        return HazeIcon;
      case "Haze":
        return HazeIcon;
      case "Mist":
        return HazeIcon;

      default:
        return SunnyIcon;
    }
  }
  return (
    <div>
      <div className="max-md:flex items-center justify-between md:-mt-10">
        <img src={getWeatherIcon(climate)} alt="cloud" />
        <div className="max-md:flex items-center max-md:space-x-4">
          <h1 className="text-[60px] lg:text-[80px] xl:text-[100px] leading-none md:mb-4">
            {Math.round(temperature)}°
          </h1>
          <div className="flex items-center space-x-2 sm:space-x-4 md:mb-4">
            <img src={pin} />
            <h2 className="text-xl   lg:text-3xl">{`${location}, ${getName(
              country
            )}`}</h2>
          </div>
        </div>
      </div>
      <p className="text-sm lg:text-lg mt-2 sm:mt-0">
        {getFormattedDate(time, "time", false)} -{" "}
        {getFormattedDate(time, "date", false)}
      </p>
    </div>
  );
}
