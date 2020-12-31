import axios from "axios";
import React, { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useEffect } from "react";
import { DataContext } from "./DataContext/DataProvider";

const SearchBar = () => {
  const [nameVal, setNameVal] = useState("");
  const [options, setOptions] = useState([]);
  const [categoryVal, setCategoryVal] = useState("");

  const { handleSearchTerm, handleCategory } = useContext(DataContext);

  const fetchOptions = async () => {
    const {
      data: { meals },
    } = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/list.php?c=list`
    );

    meals && setOptions(meals);
  };

  useEffect(() => {
    fetchOptions();
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    console.log(e.target.nameVal.value);
    handleSearchTerm(e.target.nameVal.value);
    setNameVal("");
  };

  const handleCategoryFun = e => {
    setCategoryVal(e.target.value);
    handleCategory(e.target.value);
  };

  console.log(nameVal, categoryVal);

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="align-items-center justify-content-around mt-5">
        <Col sm={6} md={8}>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Enter the food name.."
              value={nameVal}
              name="nameVal"
              onChange={e => setNameVal(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col sm={6} md={4}>
          <Form.Group>
            <Form.Control
              as="select"
              value={categoryVal}
              onChange={handleCategoryFun}>
              {options &&
                options.map(({ strCategory }, i) => (
                  <option value={strCategory} key={i}>
                    {strCategory}
                  </option>
                ))}
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
};

export default SearchBar;
