import React from "react";
import CardContainer from "./CardContainer";
import SearchBar from "./SearchBar";
import Container from "react-bootstrap/Container";

const Home = () => {
  return (
    <Container>
      <h1 className="text-center display-3 fw-bolder my-3 text-uppercase">
        meal finder
      </h1>

      <div className="text-center my-4">
        <SearchBar />
      </div>

      <CardContainer />
    </Container>
  );
};

export default Home;
