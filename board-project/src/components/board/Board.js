import React, { useState, useEffect } from "react";
import ItemForm from "../item/ItemForm";
import Items from "../../containers/items/Items";
// import Card from "react-bootstrap/Card";
// import Button from "react-bootstrap/Button";
import db from "../../firebaseConfig";
// import { Container } from "react-bootstrap";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
import { Card, Button } from 'antd';
import { BgColorsOutlined } from "@ant-design/icons";
// import './site-card-border-less-wrapper.css'


const Board = ({ boardTitle, boardsItems, boardsId }) => {
  const handleClick = (e) => {
    e.preventDefault();
    db.collection("boards").doc(boardsId).delete();
  };

  const gridStyle = {
    width: '25%',
    // textAlign: 'center',
    margin: '10px'
    
  };

  return (
    // <div className="site-card-wrapper">
        <Card.Grid className='site-card-border-less-wrapper' title={boardTitle} style={gridStyle} bordered={true} >
          
        <Items
            boardTitle={boardTitle}
            boardsId={boardsId}
            boardsItems={boardsItems}
          />
          <Button variant="outline-info"
            type="submit"
            size="sm"
            onClick={(e) => handleClick(e)}>
            Delete Board
          </Button>
        </Card.Grid>

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