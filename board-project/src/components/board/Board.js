import React, { useState, useEffect } from "react";
import db from "../../firebaseConfig";
import ItemForm from "../item/ItemForm";

const Board = () => {
  const [newBoard, setNewBoard] = useState({
    items: [],
    title: "",
  });
  //   const [itemValues, setItemValues] = useState({
  //     itemName: "",
  //   });

  //   const handleForm = (e) => {
  //     setItemValues([...newBoard.items, e.target.value]);
  //   };

  const addBoard = () => {
    db.collection("boards")
      .doc(newBoard.title)
      .set({
        items: [...newBoard.items],
        title: newBoard.title,
      });
  };

  console.log(newBoard);

  const handleInputValue = (e) => {
    setNewBoard({ ...newBoard, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addBoard();
  };

  return (
    <div>
      <form>
        <input
          name="title"
          value={newBoard.title}
          onChange={(e) => handleInputValue(e)}
        ></input>
        {/* <input
          name="items"
          value={newBoard.items}
          onChange={(e) => handleInputValue(e)}
        /> */}
        {/* <button onClick={(e) => addNewItem(e)}>Add another item</button> */}
        {/* <button onSubmit={(e) => handleSubmit(e)}>Add Item</button> */}
        <button onClick={(e) => handleSubmit(e)}>Add board</button>
      </form>
      <ItemForm newBoard={newBoard} />
    </div>
  );
};

export default Board;
