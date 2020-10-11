import React, { useState, useEffect } from "react";
import ItemForm from "../item/ItemForm";
import Items from "../../containers/items/Items";
// import Card from "react-bootstrap/Card";
// import Button from "react-bootstrap/Button";
import db from "../../firebaseConfig";
// import { Container } from "react-bootstrap";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
import { Card, Col, Row, Button } from 'antd';

const Board = ({ boardTitle, boardsItems, boardsId }) => {
  const handleClick = (e) => {
    e.preventDefault();
    db.collection("boards").doc(boardsId).delete();
  };

  return (
    // <div className="site-card-wrapper">
    <Row gutter={16}>
      <Col span={8}>
        <Card title={boardTitle} bordered={false}>
        <Items
            boardTitle={boardTitle}
            boardsId={boardsId}
            boardsItems={boardsItems}
          />
          <Button variant="outline-info"
            type="submit"
            size="sm"
            onClick={(e) => handleClick(e)}>
            Delete Button
          </Button>
        </Card>
      </Col>
    </Row>
  // </div>,
  )
};

export default Board;
   

        // <Card.Header></Card.Header>
   
     
          // <Button
          //   variant="outline-info"
          //   type="submit"
          //   size="sm"
          //   onClick={(e) => handleClick(e)}
          // >
          //   Delete Board
          // </Button>