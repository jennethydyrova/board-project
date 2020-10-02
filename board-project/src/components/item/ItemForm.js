import React, { useState, useEffect } from "react";
import db from "../../firebaseConfig";

const ItemForm = ({ boardTitle, boardsItems }) => {
  // const [items, setItems] = useState(oneBoard);
  const [items, setItems] = useState(boardsItems);
  const [userInput, setUserInput] = useState("");

  const addItem = () => {
    db.collection("boards")
      .doc(boardTitle)
      .update({
        items: [...items],
      });
    setItems([...items, userInput]);
  };

  // console.log(items);

  useEffect(() => {}, []);

  const handleInputValue = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addItem();
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
