import Page from "./Page";
import FavoriteProvider from "./provider/FavoriteProvider";
import LocationProvider from "./provider/LocationProvider";
import WeatherProvider from "./provider/WeatherProvider";

export default function App() {
  return (
    <LocationProvider>
      <WeatherProvider>
        <FavoriteProvider>
          <Page />
        </FavoriteProvider>
      </WeatherProvider>
    </LocationProvider>
  );
}
