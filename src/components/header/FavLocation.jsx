import heart from "../../assets/heart.svg";

import redHeart from "../../assets/heart-red.svg";
export default function FavLocation({ modalState }) {
  const { isModal, setIsModal } = modalState;

  function onFavModal() {
    setIsModal(!isModal);
  }

  return (
    <div
      onClick={onFavModal}
      className="p-2 hover:bg-black/30 cursor-pointer flex gap-2 items-center rounded-md transition-all"
    >
      <img src={isModal ? redHeart : heart} alt="" />
      <span className="sm:hidden">Favorite</span>
      <span className="hidden sm:inline">Favorite Locations</span>
    </div>
  );
}
