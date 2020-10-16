import React, { useState } from "react";
import db from "../../firebaseConfig";
import "antd/dist/antd.css";
import { Card, Col, Button, Form, Input } from "antd";
import { DownOutlined, PlusOutlined } from "@ant-design/icons";
import { Menu, Dropdown, message, Tooltip } from "antd";

const BoardForm = () => {
  const [newBoard, setNewBoard] = useState({
    title: "",
  });

  // const docId = db.collection("boards").doc.id;
  // console.log("docid", docId);

  const addBoard = async () => {
    const date = new Date();
    const stringDate = date.toISOString();
    await db.firestore().collection("boards").add({
      title: newBoard.title,
      items: [],
      date: stringDate,
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
  console.log(newBoard.title);

  return (
    <Card
      boarder="info"
      style={{ width: "18rem", height: "100%", marginLeft: "20px" }}
      className="card"
    >
      <Form
        onSubmit={(e) => handleSubmit(e)}
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Form.Item>
          <Input
            type="text"
            placeholder="Enter board name"
            name="title"
            value={newBoard.title}
            className="input-field"
            onChange={(e) => handleInputValue(e)}
          />
        </Form.Item>

        <Button
          variant="outline-info"
          type="submit"
          size="lg"
          onClick={(e) => handleSubmit(e)}
          style={{ width: "60%" }}
          className="board-btn"
        >
          <PlusOutlined /> Add board
        </Button>
      </Form>
    </Card>
  );
};

export default BoardForm;
