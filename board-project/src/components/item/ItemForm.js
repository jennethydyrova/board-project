import React, { useState, useEffect } from "react";
import db from "../../firebaseConfig";

const ItemForm = ({ boardsItems, boardsId }) => {
  // const [items, setItems] = useState(oneBoard);

  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 1);
  const defaultDate = currentDate.toISOString().substr(0, 10);

  const [items, setItems] = useState(boardsItems);
  const [userInput, setUserInput] = useState({
    title: "",
    due: defaultDate,
    assigner: "",
    assignee: "",
    id: "",
  });

  const itemId = db.collection("boards").doc().id;

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
    console.log(userInput);
    setUserInput({ ...userInput, title: e.target.value, id: itemId });
  };

  const handleDueChange = (e) => {
    setUserInput({ ...userInput, due: e.target.value });
  };

  const handleAssignerChange = (e) => {
    setUserInput({ ...userInput, assigner: e.target.value });
  };

  const handleAssigneeChange = (e) => {
    setUserInput({ ...userInput, assignee: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addItem();
    setUserInput({
      title: "",
      id: "",
      due: defaultDate,
      assignee: "",
      assigner: "",
    });
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          name="items"
          onChange={(e) => handleInputValue(e)}
          value={userInput.title}
          placeholder="Task title"
        />
        <input
          name="due-date"
          type="date"
          onChange={(e) => handleDueChange(e)}
          value={userInput.due}
        />
        <input
          name="assigner"
          onChange={(e) => handleAssignerChange(e)}
          value={userInput.assigner}
          placeholder="Assigner"
        />
        <input
          name="assignee"
          onChange={(e) => handleAssigneeChange(e)}
          value={userInput.assignee}
          placeholder="Assignee"
        />
        <button>Add Item</button>
      </form>
    </div>
  );
};

export default ItemForm;
