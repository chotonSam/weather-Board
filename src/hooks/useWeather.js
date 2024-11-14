import { useContext, useEffect, useState } from "react";
import { LocationContext } from "../context";

const useWeather = () => {
  const [weatherData, setWeatherData] = useState({
    location: "",
    country: "",
    climate: "",
    temperature: "",
    maxTemperature: "",
    mainTemperature: "",
    humidity: "",
    cloudPercentage: "",
    wind: "",
    time: "",
    longitude: "",
    latitude: "",
  });

  const [loading, setLoading] = useState({
    state: false,
    message: "",
  });

  const [error, setError] = useState(null);

  const { selectedLocation } = useContext(LocationContext);

  const fetchWeatherData = async (latitude, longitude) => {
    try {
      setLoading({
        ...loading,
        state: true,
        message: "Fetching weather data",
      });

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${
          import.meta.env.VITE_WEATHER_API_KEY
        }&units=metric`
      );

      if (!response.ok) {
        throw new Error(`Fetching weather data failed: ${response.status}`);
      }

      const data = await response.json();

      const updatedWeatherData = {
        ...weatherData,
        location: data?.name,
        country: data?.sys?.country,
        climate: data?.weather[0]?.main,
        temperature: data?.main?.temp,
        maxTemperature: data?.main?.temp_max,
        mainTemperature: data?.main?.temp_min,
        humidity: data?.main?.humidity,
        cloudPercentage: data?.clouds?.all,
        wind: data?.wind?.speed,
        time: data?.dt,
        longitude: longitude,
        latitude: latitude,
      };

      setWeatherData(updatedWeatherData);
    } catch (err) {
      setError(`Failed to fetch weather data: ${err.message}`);
      console.error("Error fetching weather data:", err);
    } finally {
      setLoading({
        ...loading,
        state: false,
        message: "",
      });
    }
  };

  useEffect(() => {
    setLoading({
      ...loading,
      state: true,
      message: "Finding Location...",
    });

    if (selectedLocation.latitude && selectedLocation.longitude) {
      fetchWeatherData(selectedLocation.latitude, selectedLocation.longitude);
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherData(position.coords.latitude, position.coords.longitude);
        },
        (err) => {
          setError("Location access denied or unavailable.");
          console.error("Geolocation error:", err.message);
          setLoading({
            ...loading,
            state: false,
            message: "Location access denied",
          });
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
      setLoading({
        ...loading,
        state: true,
        message: "turn on location",
      });
    }
  }, [selectedLocation.latitude, selectedLocation.longitude]);

  return {
    weatherData,
    loading,
    error,
  };
};

export default useWeather;
