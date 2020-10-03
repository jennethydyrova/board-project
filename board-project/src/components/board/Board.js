import React, { useState, useEffect } from "react";
import ItemForm from "../item/ItemForm";
import Items from "../../containers/items/Items";
import Card from "react-bootstrap/Card";

const Board = ({ boardTitle, boardsItems, boardsId }) => {
  // console.log("boarditems", boardsItems);
  // console.log(boardsId)

  //   <Card border="info" style={{ width: '18rem' }}>
  //   <Card.Header>Header</Card.Header>
  //   <Card.Body>
  //     <Card.Title>Info Card Title</Card.Title>
  //     <Card.Text>
  //       Some quick example text to build on the card title and make up the bulk
  //       of the card's content.
  //     </Card.Text>
  //   </Card.Body>
  // </Card>
  console.log(boardsId);

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
        </Card.Body>
      </Card>
    </div>
  );
};

export default Board;
//{oneBoard.title ? oneBoard.title : ""}
// {
//   /* {boardsItems.map((item, index) => {
//         return <p key={item + index}>{item}</p>;
//       })} */
// }
// {
//   /* <ItemForm boardTitle={boardTitle} boardsItems={boardsItems} boardsId={boardsId} /> */
// }
