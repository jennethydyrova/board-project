import React, { useState } from "react";
import db from "../../firebaseConfig";

const BoardForm = ({ fetchBoardData }) => {
  const [newBoard, setNewBoard] = useState({
    title: "",
  });
  const docId = db.collection("boards").doc().id;

  const addBoard = async () => {
    
    await db.collection("boards").doc(docId).set({
      title: newBoard.title,
      items: [],
      id: docId
    });
    fetchBoardData((prevState) => prevState + 1);
  };

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
        <button onClick={(e) => handleSubmit(e)}>Add board</button>
      </form>
    </div>
  );
};

export default BoardForm;
