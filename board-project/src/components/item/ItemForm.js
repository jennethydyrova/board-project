import React, { useState, useEffect } from "react";
import db from "../../firebaseConfig";

const ItemForm = ({ oneBoard, boardsItems }) => {
  // const [items, setItems] = useState(oneBoard);
  const [items, setItems] = useState(boardsItems);
  const [userInput, setUserInput] = useState("");

  // const addItem = () => {
  //   db.collection("boards")
  //     .doc()
  //     .set({
  //       items: [...items],
  //     });
  // };

  // console.log(items);

  useEffect(() => {
    // addItem();
  }, [items]);

  const handleInputValue = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setItems([...items, userInput]);
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input name="items" onChange={(e) => handleInputValue(e)} />
        <button>Add Item</button>
      </form>
    </div>
  );
};

export default ItemForm;
