import BackArrow from "../../assets/images/back-arrow.png";
import SearchIcon from "../../assets/images/search-icon.png";
import "./index.css";

export default function AppHeader() {
  return (
    <div className="header-wrapper">
      <div className="left-header">
        <img src={BackArrow} alt="back arrow" height="30px" />
        <h2 className="header-text">Romantic Comedy</h2>
      </div>
      <div className="right-header">
        <img src={SearchIcon} alt="search icon" height="30px" />
      </div>
    </div>
  );
}
