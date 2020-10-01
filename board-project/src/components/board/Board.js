import React, { useState, useEffect } from "react";

import ItemForm from "../item/ItemForm";

const Board = ({ oneBoard, boardsItems }) => {
  // const [bla, setBla] = useState("");
  console.log(oneBoard);
  // console.log(boardsItems);
  console.log(boardsItems);
  // const renderItems = () => {
  //   // boardsItems.map((item) => {
  //   //   return <p>{item}</p>;
  //   // });
  //   // console.log(oneBoard);
  // };
  // useEffect(() => {
  //   renderItems();
  // }, [bla]);

  return (
    <div>
      <h3>{oneBoard}</h3>

      {/* <h3>{oneBoard.title}</h3> */}
      {/* {boardsItems.map((item) => {
        return <p>{item}</p>;
      })} */}
      {/* <ItemForm oneBoard={oneBoard} boardsItems={boardsItems} /> */}
    </div>
  );
};

export default Board;
//{oneBoard.title ? oneBoard.title : ""}
