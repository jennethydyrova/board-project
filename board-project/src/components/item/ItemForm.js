import React, { useState, useEffect } from "react";
import db from "../../firebaseConfig";
import { DatePicker, message, Button } from "antd";
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
    message.info(
      `Selected Date: ${value ? value.format("YYYY-MM-DD") : "None"}`
    );
    // console.log("asdas",value.toDate().toISOString().substr(0,10))
    setUserInput({
      ...userInput,
      due: value.toDate().toISOString().substr(0, 10),
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
    setUserInput({
      title: "",
      id: "",
      due: defaultDate,
      assignee: "",
      assigner: "",
      completed: false
    });
  };

  return (
    <div>
      <form>
        <input
          name="items"
          onChange={(e) => handleInputValue(e)}
          value={userInput.title}
          placeholder="Task title"
        />
        <DatePicker
          onChange={(e) => handleDueChange(e)}
          defaultValue={moment(defaultDate)}
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
        <Button
          variant="outline-info"
          type="submit"
          size="sm"
          onClick={(e) => handleSubmit(e)}
        >
          Add item
        </Button>
      </form>
    </div>
  );
};

export default ItemForm;
