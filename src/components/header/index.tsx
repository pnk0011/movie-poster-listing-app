import BackArrow from "../../assets/images/back-arrow.png";
import SearchIcon from "../../assets/images/search-icon.png";
import CrossIcon from "../../assets/images/cross-icon.svg";
import { useState } from "react";
import "./index.css";

type AppHeaderProps = {
  setSearchText: (text: string) => void;
};

const AppHeader: React.FC<AppHeaderProps> = ({ setSearchText }) => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const handleSearchClick = () => {
    setIsSearchActive(true);
  };
  const handleCrossClick = () => {
    setIsSearchActive(false);
    setSearchText("");
  };
  return (
    <>
      <div className="header-wrapper">
        <div className="left-header">
          <img src={BackArrow} alt="back arrow" height="20px" />
          <h2 className="title">Romantic Comedy</h2>
        </div>
        {isSearchActive ? (
          <div className="search-input-wrapper">
            <input
              type="text"
              width={"200px"}
              onChange={(e) => setSearchText(e.target.value)}
              className="search-input"
              autoFocus
            />
            <img
              src={CrossIcon}
              alt="search icon"
              className="cross-icon"
              onClick={handleCrossClick}
            />
          </div>
        ) : (
          <div className="right-header" onClick={handleSearchClick}>
            <img src={SearchIcon} alt="search icon" height="20px" />
          </div>
        )}
      </div>
    </>
  );
};

export default AppHeader;
