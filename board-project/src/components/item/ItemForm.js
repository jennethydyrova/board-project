import React, { useState, useEffect } from "react";
import db from "../../firebaseConfig";
import { DatePicker, message, Button, Form, Input } from "antd";
import "antd/dist/antd.css";
import "moment/locale/zh-cn";
import moment from "moment";
// import Button from "react-bootstrap/Button";

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
    completed: false,
  });

  const itemId = db.collection("boards").doc().id;

  useEffect(() => {
    setItems(boardsItems);
  }, [boardsItems]);

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
  // console.log("items", items);
  // useEffect(() => {}, []);

  const handleInputValue = (e) => {
    console.log(userInput);
    setUserInput({ ...userInput, title: e.target.value, id: itemId });
  };

  const handleDueChange = (value) => {
    console.log("dueCHage", value)
    message.info(
      `Selected Date: ${value ? value.format("YYYY-MM-DD") : "None"}`
    );
    // console.log("asdas",value.toDate().toISOString().substr(0,10))
    setUserInput({
      ...userInput,
      due: value === null? value : value.toDate().toISOString().substr(0, 10),
    });
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
    console.log("date", defaultDate)
    setUserInput({
      title: "",
      id: "",
      due: defaultDate,
      assignee: "",
      assigner: "",
      completed: false
    });
    console.log("datt",userInput.due)
  };

  return (
    <div>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Input
          name="items"
          onChange={(e) => handleInputValue(e)}
          value={userInput.title}
          className = "input-field"
          placeholder="Task title"
        />
        <DatePicker
          onChange={(e) => handleDueChange(e)}
          value={userInput.due === null? "" :moment(userInput.due)}
          className="form-btn"
        />
        <Input
          name="assigner"
          onChange={(e) => handleAssignerChange(e)}
          value={userInput.assigner}
          className = "input-field"
          placeholder="Assigner"
        />
        <Input
          name="assignee"
          onChange={(e) => handleAssigneeChange(e)}
          value={userInput.assignee}
          className = "input-field"
          placeholder="Assignee"
        />
        <Button
          variant="outline-info"
          type="submit"
          size="sm"
          onClick={(e) => handleSubmit(e)}
          className="form-btn"
        >
          Add item
        </Button>
      </Form>
    </div>
  );
};

export default ItemForm;
