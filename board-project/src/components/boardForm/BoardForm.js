import React, { useState } from "react";
import db from "../../firebaseConfig";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const BoardForm = () => {
  const [newBoard, setNewBoard] = useState({
    title: "",
  });

  // const docId = db.collection("boards").doc.id;
  // console.log("docid", docId);

  const addBoard = async () => {
    await db.collection("boards").add({
      title: newBoard.title,
      items: [],
    });
    // fetchBoardData((prevState) => prevState + 1);
  };
  // console.log(docId);
  const handleInputValue = (e) => {
    setNewBoard({ ...newBoard, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addBoard();
    setNewBoard({
      title: "",
    });
  };

  return (
    <div>
      <Form>
        <Form.Row>
          <Form.Group controlId="addBoard">
            <Form.Control
              type="text"
              placeholder="Enter board name"
              name="title"
              value={newBoard.title}
              onChange={(e) => handleInputValue(e)}
            />
          </Form.Group>
        </Form.Row>
        {/* <input></input> */}
        <Button
          variant="outline-info"
          type="submit"
          size="sm"
          onClick={(e) => handleSubmit(e)}
        >
          Add Board
        </Button>
        {/* <button >Add board</button> */}
      </Form>
    </div>
  );
};

export default BoardForm;
