import { React, useState } from "react";
import db from "../../firebaseConfig";

const BoardForm = () => {
  const [newBoard, setNewBoard] = useState({
    items: [],
    title: "",
  });

  const addBoard = () => {
    db.collection("boards")
      .doc(newBoard.title)
      .set({
        items: [...newBoard.items],
        title: newBoard.title,
      });
  };

  const handleInputValue = (e) => {
    setNewBoard({ ...newBoard, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addBoard();
  };
  return (
    <form>
      <input
        name="title"
        value={newBoard.title}
        onChange={(e) => handleInputValue(e)}
      ></input>
      <button onClick={(e) => handleSubmit(e)}>Add board</button>
    </form>
  );
};

export default BoardForm;
