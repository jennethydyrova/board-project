import React, { useState, useEffect } from "react";
import db from "../../firebaseConfig";

const ItemForm = ({ newBoard }) => {
  // console.log(newBoard);
  const [newItem, setNewItem] = useState({
    items: [],
  });

  const addItem = () => {
    db.collection("boards")
      .doc("board1")
      .set({
        items: [...newBoard],
        // title: newBoard.title,
      });
  };

  console.log(newBoard.items);

  const handleInputValue = (e) => {
    setNewItem({ ...newBoard, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    addItem();
  };

  // const addNewItem = (e) => {
  //   return (
  //     <input
  //       name="title"
  //       value={newItem}
  //       onChange={(e) => handleInputValue(e)}
  //     />
  //   );
  // };

  return (
    <div>
      <form>
        <input
          name="items"
          value={newBoard.items}
          onChange={(e) => handleInputValue(e)}
        />

        {/* <button onClick={(e) => addNewItem(e)}>Add another item</button> */}
        <button onSubmit={(e) => handleSubmit(e)}>Add Item</button>
      </form>
    </div>
  );
};

export default ItemForm;
