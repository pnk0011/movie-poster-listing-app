import BackArrow from "../../assets/images/back-arrow.png";
import SearchIcon from "../../assets/images/search-icon.png";
import "./index.css";
import { useState } from "react";

type AppHeaderProp = {
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
};

const AppHeader: React.FC<AppHeaderProp> = ({ setSearchText }) => {
  const [isSearchActive, setIsSearchActive] = useState(false);

  const handleSearchClick = () => {
    setIsSearchActive(true);
  };
  return (
    <>
      {!isSearchActive ? (
        <div className="header-wrapper">
          <div className="left-header">
            <img src={BackArrow} alt="back arrow" height="30px" />
            <h2 className="header-text">Romantic Comedy</h2>
          </div>
          <div className="right-header" onClick={handleSearchClick}>
            <img src={SearchIcon} alt="search icon" height="30px" />
          </div>
        </div>
      ) : (
        <div className="header-wrapper-search">
          <div className="left-header-search">
            <img src={SearchIcon} alt="search icon" height="30px" />
          </div>
          <div className="right-header-search">
            <input
              type="text"
              width={"200px"}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AppHeader;
