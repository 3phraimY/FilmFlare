import { useState } from "react";
import Search from "./components/Search";

function Favorites() {
  const [isSearchActive, setIsSearchActive] = useState<boolean>(false);
  return (
    <>
      {isSearchActive && <Search />}
      <div>Favorites</div>
    </>
  );
}

export default Favorites;
