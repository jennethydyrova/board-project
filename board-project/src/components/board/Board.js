import React, { useState, useEffect } from "react";

import ItemForm from "../item/ItemForm";

const Board = ({ boardTitle, boardsItems, boardsId }) => {
  // console.log("boarditems", boardsItems);
  // console.log(boardsId)
  return (
    <div>
      <h3>{boardTitle}</h3>
      {boardsItems.map((item, index) => {
        return <p key={item + index}>{item}</p>;
      })}
      <ItemForm boardTitle={boardTitle} boardsItems={boardsItems} boardsId={boardsId} />
    </div>
  );
};

export default Board;
//{oneBoard.title ? oneBoard.title : ""}
