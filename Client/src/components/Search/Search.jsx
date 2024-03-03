import SearchBar from "./SearchBar";
import SearchBarData from "../../assets/SearchBarData";
import { Card } from "@mui/material";
import { Link } from "react-router-dom";
import ContentWrapper from "../ContentWrapper/ContentWrapper";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import SideBar from "../Sidebar/Sidebar";

const Search = ({ name }) => {
  return (
    <>
      <ContentWrapper>
        <Navbar name={name} />
        <div className="container">
          <SearchBar placeholder="Search" />
          <h2 className="ml-4 mt-2 mb-2 genre-heading">Popular Movie Genre</h2>
          <div className="d-flex jc-center f-wrap m-5">
            {SearchBarData.map((item, index) => {
              return (
                <Link to={item.path} className="link" key={index}>
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
        <Footer />
      </ContentWrapper>
      <SideBar />
    </>
  );
};

export default Search;
