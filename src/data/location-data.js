const getLocationByName = async (city) => {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${
      import.meta.env.VITE_WEATHER_API_KEY
    }&units=metric`;

    const response = await fetch(url);
    if (!response.ok) {
      return {
        location: "",
        latitude: 0,
        longitude: 0,
      };
    } else {
      const data = await response.json();
      return {
        location: data.name,
        latitude: data.coord.lat,
        longitude: data.coord.lon,
      };
    }
  } catch (error) {
    console.error("Error fetching geolocation:", error);
  }
};

export { getLocationByName };
