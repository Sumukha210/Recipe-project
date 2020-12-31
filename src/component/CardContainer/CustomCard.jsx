import React from "react";
import { useHistory } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";

const CustomCard = ({ id, name, img }) => {
  const history = useHistory();

  const handleClick = () => history.push(`/specificPage/${id}`);

  return (
    <Col sm={6} md={4} lg={3}>
      <Card
        className="my-2"
        onClick={handleClick}
        style={{ cursor: "pointer", height: "340px" }}>
        <Card.Img src={img}></Card.Img>
        <Card.Body>
          <Card.Title>
            {name.length > 30 ? name.replace(name.substring(30), "...") : name}
          </Card.Title>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default CustomCard;
