import React, { useState } from "react";
import db from "../../firebaseConfig";
import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
import "antd/dist/antd.css";
import {Card, Col, Button} from "antd";
import { DownOutlined,PlusOutlined } from '@ant-design/icons';
import { Menu, Dropdown, message, Tooltip } from 'antd';




const BoardForm = ({sortBoards}) => {
  const [newBoard, setNewBoard] = useState({
    title: "",
  });

  // const docId = db.collection("boards").doc.id;
  // console.log("docid", docId);

  const addBoard = async () => {
    const date = new Date()
    const stringDate = date.toISOString()
    await db.collection("boards").add({
      title: newBoard.title,
      items: [],
      date: stringDate
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
      
      <Card boarder="info" style={{ width: "18rem", height: "100%" }}>
        <Form onSubmit={(e) => handleSubmit(e)} style={{ display:"flex", justifyContent: "center", flexDirection:"column"}}>
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
          <Button
            variant="outline-info"
            type="submit"
            size="lg"
            onClick={(e) => handleSubmit(e)}
            style={{ width: '60%' }}
          >
            <PlusOutlined /> Add board
          </Button>
        </Form>
      </Card>
    
    </div>
  );
};

export default BoardForm;
