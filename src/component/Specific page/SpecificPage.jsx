import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";

const SpecificPage = () => {
  const { id } = useParams();
  const [singleMeal, setSingleMeal] = useState([]);
  const history = useHistory();
  let tags =
    singleMeal[0] &&
    singleMeal[0][`strTags`] &&
    singleMeal[0][`strTags`].split(",");

  console.log(tags);

  const ingredients = () => {
    const item = [];

    for (let i = 1; i <= 20; i++) {
      if (singleMeal.length) {
        if (`${singleMeal[0][`strIngredient${i}`]}`) {
          item.push({
            ingredient: `${singleMeal[0][`strIngredient${i}`]}`,
            measure: `${singleMeal[0][`strMeasure${i}`]}`,
          });
        }
      }
    }
    return item;
  };

  console.log(ingredients());

  const fetchMeal = async () => {
    const {
      data: { meals },
    } = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );

    setSingleMeal(meals);
  };

  useEffect(() => {
    fetchMeal();
  }, []);

  const displayInfo = children => singleMeal[0] && singleMeal[0][children];

  return (
    <>
      <Container>
        <div className="my-4">
          <button className="btn btn-info" onClick={() => history.push("/")}>
            Back to home
          </button>
        </div>

        <Row className="align-items-center justify-content-center mx-auto mt-2">
          <Col lg={8} md={12} sm={12}>
            <Card>
              <Card.Img
                style={{ height: "300px", objectFit: "cover" }}
                src={displayInfo("strMealThumb")}
              />

              <Card.Title>
                <h1 className="fw-bold text-center mt-3 text-uppercase">
                  {displayInfo("strMeal")}
                </h1>
                <hr />
              </Card.Title>

              <Card.Body>
                <div className="mb-3 text-secondary">
                  <p> {tags && tags.map(item => `#${item}  `)} </p>
                </div>

                <div className="mb-3">
                  <h5 className="text-capitalize">
                    category:-
                    <span
                      style={{ fontSize: "1.1rem" }}
                      className="fw-bold pl-2 text-secondary ">
                      {displayInfo("strCategory")}
                    </span>
                  </h5>
                </div>

                <div className="my-3">
                  <h5 className="mt-3 text-capitalize">Instructions:-</h5>
                  <p>{displayInfo("strInstructions")}</p>
                </div>

                <div>
                  {" "}
                  <h5 className="mt-3 text-capitalize mb-4">
                    Ingredients and measures:-
                  </h5>
                  <ul>
                    {ingredients().map(({ ingredient, measure }, index) =>
                      ingredient != "null" ? (
                        <li
                          key={index}
                          style={{ fontWeight: "bold" }}
                          className="my-2">
                          <span className="text-capitalize">{ingredient}</span>-
                          <Badge variant="primary" className="ml-3 py-2">
                            {measure}
                          </Badge>
                        </li>
                      ) : (
                        ""
                      )
                    )}
                  </ul>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SpecificPage;
