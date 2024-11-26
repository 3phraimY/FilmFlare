import { useLocation, useNavigate } from "react-router-dom";
import FilmFlareLogo from "../../assets/FilmFlame-Logo.png";
import DownArrow from "../../assets/down-arrow.png";
import UpArrow from "../../assets/up-arrow.png";
import "./Header.css";
import { useEffect, useState } from "react";

function Header() {
  const currentPage = useLocation();
  const navigateTo = useNavigate();
  const [currentPageTitle, setCurrentPageTitle] = useState<string>("");
  const [isDropDownActive, setIsDropDownActive] = useState<boolean>();
  const [displayDropDownArrow, setDisplayDropDownArrow] = useState<boolean>();

  //causes title to refresh when navigating to new page
  useEffect(() => {
    //sets title string based on url path
    switch (currentPage.pathname) {
      case "/mylist":
        setCurrentPageTitle("My List");
        setDisplayDropDownArrow(true);
        break;
      case "/towatch":
        setCurrentPageTitle("To-Watch");
        setDisplayDropDownArrow(true);
        break;
      case "/favorites":
        setCurrentPageTitle("Favorites");
        setDisplayDropDownArrow(true);
        break;
      case "/search":
        setCurrentPageTitle("Find Movies");
        setDisplayDropDownArrow(true);
        break;
      case "/friends":
        setCurrentPageTitle("Friends");
        setDisplayDropDownArrow(true);
        break;
      case "/signup":
        setCurrentPageTitle("");
        setDisplayDropDownArrow(false);
        break;
      default:
        setCurrentPageTitle("");
        setDisplayDropDownArrow(false);
        break;
    }
  }, [currentPage]);

  const getMenuItemClass = (path: string) => {
    return currentPageTitle === path ? "menu-item-active" : "menu-item";
  };

  const handleNavigate = (path: string) => {
    navigateTo(path);
    setIsDropDownActive(false);
  };

  return (
    <>
      <div className="header-wrapper">
        {displayDropDownArrow && (
          <button
            onClick={() => setIsDropDownActive(true)}
            className="header-dropdown-button"
          >
            <img src={DownArrow} height={72} width={82} />
          </button>
        )}
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
          <button
            onClick={() => handleNavigate("/mylist")}
            className="menu-item-button"
          >
            <div className={getMenuItemClass("My List")}> My List</div>
          </button>
          <button
            onClick={() => handleNavigate("/towatch")}
            className="menu-item-button"
          >
            <div className={getMenuItemClass("To-Watch")}> To-Watch</div>
          </button>
          <button
            onClick={() => handleNavigate("/favorites")}
            className="menu-item-button"
          >
            <div className={getMenuItemClass("Favorites")}>Favorites</div>
          </button>
          <button
            onClick={() => handleNavigate("/search")}
            className="menu-item-button"
          >
            <div className={getMenuItemClass("Find Movies")}>Find Movies</div>
          </button>
          <button
            onClick={() => handleNavigate("/friends")}
            className="menu-item-button"
          >
            <div className={getMenuItemClass("Friends")}>Friends</div>
          </button>
        </div>
      )}
    </>
  );
}
export default Header;
