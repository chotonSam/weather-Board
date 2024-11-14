import FavLocation from "./FavLocation";
import FavModal from "./FavModal";
import Logo from "./Logo";
import Search from "./Search";

import { useState } from "react";

export default function Header() {
  const [isModal, setIsModal] = useState(false);

  return (
    <header className=" fixed w-full top-0 z-50 bg-gradient-to-b from-black/60 to-black/0 pb-10 ">
      <nav className="container flex flex-wrap items-center justify-between py-6 ">
        <Logo />
        <div className="flex items-center gap-4 relative  ">
          <Search />
          <FavLocation modalState={{ isModal, setIsModal }} />

          {isModal && <FavModal />}
        </div>
      </nav>
    </header>
  );
}
