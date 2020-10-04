import React, { useState, useEffect } from "react";
import db from "../../firebaseConfig";

const ItemForm = ({ boardsItems, boardsId, itemData }) => {
  // const [items, setItems] = useState(oneBoard);
  const [items, setItems] = useState(boardsItems);
  const [userInput, setUserInput] = useState({
    title: "",
    id: ""
  });

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
    itemData((prevState) => prevState + 1);
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
          value={userInput.title}
        />
        <button>Add Item</button>
      </form>
    </div>
  );
};

export default ItemForm;
