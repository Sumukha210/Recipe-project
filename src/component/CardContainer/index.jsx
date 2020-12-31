import React, { useContext } from "react";
import Row from "react-bootstrap/Row";
import { DataContext } from "../DataContext/DataProvider";
import CustomCard from "./CustomCard";

const CardContainer = () => {
  const { data, isLoading } = useContext(DataContext);

  return (
    <>
      <Row className="align-items-center  mt-5">
        {data.length ? (
          data.map(({ idMeal, strMeal, strMealThumb }) => (
            <CustomCard
              key={idMeal}
              id={idMeal}
              name={strMeal}
              img={strMealThumb}
            />
          ))
        ) : (
          <h4>Meal is not found</h4>
        )}

        <div className="mt-5">
          {isLoading && <h4 className="mt-5">Loading....</h4>}
        </div>
      </Row>
    </>
  );
};

export default CardContainer;
