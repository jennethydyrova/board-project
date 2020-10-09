import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { DeleteOutlined } from "@ant-design/icons";
import { Collapse } from "antd";
import Button from "react-bootstrap/Button";
import db from "../../firebaseConfig";
import * as firebase from "firebase/app";
import ItemForm from "./ItemForm";

const Item = ({ task, boardsId }) => {
  const { Panel } = Collapse;
  const style = {
    items: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
  };

  const handleClick = (e) => {
    db.collection("boards")
      .doc(boardsId)
      .update({
        items: firebase.firestore.FieldValue.arrayRemove(task),
      });
  };

  const handleEdit = () => {
    return (
      <div>
        <p>hello</p>
      </div>
    );
  };

  return (
    <div style={style.items}>
      <Collapse style={{ width: "100%" }} defaultActiveKey={["1"]}>
        <Panel header={task.title} key={task.id}>
          <p>Assigner: {task.assigner}</p>
          <p>Assignee: {task.assignee}</p>
          <p>Due date: {task.due}</p>
          <Button
            variant="outline-info"
            type="submit"
            size="sm"
            onClick={(e) => handleEdit(e)}
          >
            Edit
          </Button>
        </Panel>
      </Collapse>
      <DeleteOutlined
        style={{ cursor: "pointer" }}
        onClick={(e) => handleClick(e)}
      />
    </div>
  );
};

export default Item;
