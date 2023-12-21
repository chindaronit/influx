import SearchBar from "./SearchBar";
import "./style.css";
import SearchBarData from "../../assets/SearchBarData";
import { Card } from "@mui/material";
import { Link, useParams } from "react-router-dom";

const Search = () => {
  const { query } = useParams();
  
  return (
      <div className="container">
        <SearchBar placeholder="Search"/>
        <div className="d-flex jc-center f-wrap m-5">
          {SearchBarData.map((item, index) => {
            return (
              <Link to={item.path} className="link" key={index} >
                <Card
                  className="search-card f-wrap"
                  style={{ background: item.background }}
                >
                  <h2>{item.genre}</h2>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
  );
};

export default Search;
