import React, { useState, useEffect } from "react";

import ItemForm from "../item/ItemForm";

const Board = ({ oneBoard, boardsItems }) => {
  return (
    <div>
      <h3>{oneBoard}</h3>
      {boardsItems.map((item) => {
        return <p>{item}</p>;
      })}
      <ItemForm oneBoard={oneBoard} boardsItems={boardsItems} />
    </div>
  );
};

export default Board;
//{oneBoard.title ? oneBoard.title : ""}
