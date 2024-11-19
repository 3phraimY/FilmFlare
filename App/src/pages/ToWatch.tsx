import { useState } from "react";
import Search from "./components/Search";

function ToWatch() {
  const [isSearchActive, setIsSearchActive] = useState<boolean>(false);
  return (
    <>
      {isSearchActive && <Search />}
      <div>ToWatch</div>
    </>
  );
}

export default ToWatch;
