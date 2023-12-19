import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";

const SearchBar = ({ placeholder, data }) => {
  const [filterData, setFilterData] = useState([]);
  const [searchedValue, setSearchedValue] = useState("");

  const handleChange = (event) => {
    const searchWord = event.target.value;
    setSearchedValue(searchWord);
    const newFilter = data.filter((value) => {
      return (
        value.title.toLowerCase().includes(searchWord.toLowerCase()) ||
        value.genre.toLowerCase().includes(searchWord.toLowerCase()) ||
        value.rating.toLowerCase().includes(searchWord.toLowerCase())
      );
    });
    if (searchWord === "") {
      setFilterData([]);
    } else {
      setFilterData(newFilter);
    }
  };

  const clearInput = () => {
    setFilterData([]);
    setSearchedValue("");
  };

  return (
    <div className="search-bar">
      <div className="searchInputs">
        <input
          type="text"
          className="text"
          placeholder={placeholder}
          value={searchedValue}
          onChange={handleChange}
        />
        <div className="searchIcon">
          {filterData.length != 0 ? (
            <CloseIcon className="icon" onClick={clearInput} />
          ) : (
            <SearchIcon className="icon" />
          )}
        </div>
      </div>

      {filterData.length != 0 && (
        <div className="dataResult">
          {filterData.slice(0, 10).map((item, index) => {
            return (
              <Link to={`/watch/${item.itemId}`} style={{textDecoration:"none"}}>
                <div className="result-div" key={index}>
                  <a href="#" style={{ textDecoration: "none" }}>
                    <h3>{index + 1}</h3>
                    <div className="item" style={{ flex: "1" }}>
                      <h4>{item.genre}</h4>
                      <h4>{item.title}</h4>
                      <h4>{item.rating}</h4>
                    </div>
                  </a>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
