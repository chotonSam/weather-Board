import { useContext, useEffect, useState } from "react";
import redHeart from "../../assets/heart-red.svg";
import heart from "../../assets/heart.svg";
import { FavoriteContext, WeatherContext } from "../../context";

export default function AddToFav() {
  const { favorites, addToFavorites, removeFormFavorites } =
    useContext(FavoriteContext);

  const { weatherData } = useContext(WeatherContext);

  const { latitude, longitude, location } = weatherData;

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const found = favorites.find((fav) => fav.location === location);

    setIsFavorite(found);
  }, []);

  function onFavHandler() {
    const found = favorites.find((fav) => fav.location === location);

    if (!found) {
      addToFavorites(latitude, longitude, location);
    } else {
      removeFormFavorites(location);
    }
    setIsFavorite(!isFavorite);
  }

  return (
    <div className="md:col-span-2">
      <div className="flex items-center justify-end space-x-6">
        <button
          onClick={onFavHandler}
          className="text-sm md:text-base inline-flex items-center space-x-2 px-3 py-1.5 rounded-md bg-[#C5C5C54D]"
        >
          <span>Add to Favourite</span>
          <img src={isFavorite ? redHeart : heart} alt="" />
        </button>
      </div>
    </div>
  );
}
