import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import FetchQueryData from "../../functions/FetchQueryData";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [query, setQuery] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const url = `/search/multi?query=${query}&page=${1}`;

  useEffect(() => {
    if (query !== "") {
      FetchQueryData(setData, setPageNum, setLoading, url);

      if (!loading) {
        const newFilter = data?.results?.filter((value) => {
          return (value?.title || value?.name)
            .toLowerCase()
            .includes(query.toLowerCase());
        });
        setFilterData(newFilter);
      }
    } else {
      setFilterData([]);
    }
  }, [query]);

  const handleChange = (event) => {
    const searchWord = event.target.value;
    setQuery(searchWord);
  };

  const clearInput = () => {
    setFilterData([]);
    setQuery("");
  };

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  return (
    <div className="search-bar">
      <div className="searchInputs">
        <input
          type="text"
          className="text"
          placeholder={"Search"}
          value={query}
          onChange={handleChange}
          onKeyUp={searchQueryHandler}
        />
        <div className="searchIcon">
          {filterData?.length != 0 ? (
            <CloseIcon className="icon" onClick={clearInput} />
          ) : (
            <SearchIcon className="icon" />
          )}
        </div>
      </div>

      {filterData?.length != 0 && (
        <div className="dataResult">
          {filterData?.slice(0, 15).map((item, index) => {
            return (
              <Link
                to={`/${item.media_type}/${item.id}`}
                className="link"
                key={index}
              >
                <div className="result-div">
                  <h3>{index + 1}</h3>
                  <div className="item" style={{ flex: "1" }}>
                    <h4>{item.title || item.name}</h4>
                  </div>
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
