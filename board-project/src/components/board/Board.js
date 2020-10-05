import React, { useState, useEffect } from "react";
import ItemForm from "../item/ItemForm";
import Items from "../../containers/items/Items";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import db from "../../firebaseConfig";

const Board = ({ boardTitle, boardsItems, boardsId }) => {
  const handleClick = (e) => {
    e.preventDefault();
    db.collection("boards").doc(boardsId).delete();
  };
  return (
    <div>
      <Card border="info" style={{ width: "18rem" }}>
        <Card.Header>{boardTitle}</Card.Header>
        <Card.Body>
          <Items
            boardTitle={boardTitle}
            boardsId={boardsId}
            boardsItems={boardsItems}
          />
          <Button
            variant="outline-info"
            type="submit"
            size="sm"
            onClick={(e) => handleClick(e)}
          >
            Delete Board
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Board;
