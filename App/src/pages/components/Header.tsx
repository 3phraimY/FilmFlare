import { useLocation } from "react-router-dom";
import FilmFlareLogo from "../../assets/FilmFlame-Logo.png";
import DownArrow from "../../assets/down-arrow.png";
import UpArrow from "../../assets/up-arrow.png";
import "./Header.css";
import { useEffect, useState } from "react";

function Header() {
  const currentPage = useLocation();
  const [currentPageTitle, setCurrentPageTitle] = useState<string>("");
  const [isDropDownActive, setIsDropDownActive] = useState<boolean>();

  //causes title to refresh when navigating to new page
  useEffect(() => {
    //sets title string based on url path
    switch (currentPage.pathname) {
      case "/":
        setCurrentPageTitle("Login");
    }
  }, [currentPage]);

  return (
    <>
      <div className="header-wrapper">
        <button
          onClick={() => setIsDropDownActive(true)}
          className="header-dropdown-button"
        >
          <img src={DownArrow} height={72} width={82} />
        </button>
        <div className="logo-wrapper">
          <img src={FilmFlareLogo} height={69} width={250}></img>
        </div>
        <div className="current-page-title"> {currentPageTitle}</div>
      </div>
      {isDropDownActive && (
        <div className="drop-down-menu">
          <button
            className="drop-down-menu-button"
            onClick={() => setIsDropDownActive(false)}
          >
            <img src={UpArrow} height={50} width={82} />
          </button>
          <div> My List</div>
          <div> To-Watch</div>
          <div>Favorites</div>
          <div>Find Movies</div>
          <div>Friends</div>
        </div>
      )}
    </>
  );
}
export default Header;
