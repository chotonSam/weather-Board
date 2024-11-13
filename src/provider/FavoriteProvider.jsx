import { FavoriteContext } from "../context";
import { useLocalStorage } from "../hooks";

const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useLocalStorage("favorites", []);

  const addToFavorites = (latitude, longitude, location) => {
    setFavorites([
      ...favorites,
      {
        latitude: latitude,
        longitude: longitude,
        location: location,
      },
    ]);
  };

  const removeFormFavorites = (location) => {
    const restFavorite = favorites.filter((fav) => fav.location !== location);

    setFavorites(restFavorite);
  };

  return (
    <FavoriteContext.Provider
      value={{ favorites, addToFavorites, removeFormFavorites }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

export default FavoriteProvider;
