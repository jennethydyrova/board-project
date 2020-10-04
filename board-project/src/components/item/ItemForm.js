import React, { useState, useEffect } from "react";
import db from "../../firebaseConfig";

const ItemForm = ({ boardsItems, boardsId }) => {
  // const [items, setItems] = useState(oneBoard);
  const [items, setItems] = useState(boardsItems);
  const [userInput, setUserInput] = useState("");

  // const docId = db.collection("boards").doc().id;

  const addItem = async () => {
    // console.log(boardsId)
    await db
      .collection("boards")
      .doc(boardsId)
      .update({
        items: [...items, userInput],
      });
    setItems([...items, userInput]);
  };

  // useEffect(() => {}, []);

  const handleInputValue = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addItem();
    setUserInput("");
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          name="items"
          onChange={(e) => handleInputValue(e)}
          value={userInput}
        />
        <button>Add Item</button>
      </form>
    </div>
  );
};

export default ItemForm;
