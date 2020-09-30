import React, { useState, useEffect } from "react";
import db from "../../firebaseConfig";

const ItemForm = ({ newBoard }) => {
  const [items, setItems] = useState(newBoard.items);
  const [userInput, setUserInput] = useState("");

  const addItem = () => {
    db.collection("boards")
      .doc("board1")
      .set({
        items: [...items],
      });
  };

  console.log(items);

  const handleInputValue = (e) => {
    setUserInput(e.target.value);
  };
  useEffect(() => {
    addItem();
  }, [items]);

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
