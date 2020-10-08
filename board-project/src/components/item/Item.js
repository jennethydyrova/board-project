import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { DeleteOutlined } from "@ant-design/icons";
import { Collapse } from "antd";
import Button from "react-bootstrap/Button";
import db from "../../firebaseConfig";
import * as firebase from "firebase/app";
import ItemForm from "./ItemForm";
import Modal from "react-modal"
import { DatePicker, message } from "antd";
import "antd/dist/antd.css";
import "moment/locale/zh-cn";
import moment from "moment";

const Item = ({ task, boardsId }) => {
  const { Panel } = Collapse;
  const [modalOpened, setModalOpened] = useState({modalOpen: false})
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
    console.log(modalOpened)
    setModalOpened({modalOpen: !modalOpened})
  };

  const handleModal = () => {
    console.log(modalOpened)
    setModalOpened({modalOpen: modalOpened.modalOpen ===true? false: true})
  }

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
            onClick={(e) => handleModal(e)}
          >
            Edit
          </Button>
          <Modal isOpen={modalOpened.modalOpen} >
          <form>
              <input
                name="items"
                value={""}
                placeholder="Task title"
              />
              <DatePicker
              />
              <input
                name="assigner"
                value={""}
                placeholder="Assigner"
              />
              <input
                name="assignee"
                value={""}
                placeholder="Assignee"
              />
              <Button
                variant="outline-info"
                type="submit"
                size="sm"
              >
                Edit item
              </Button>
            </form>
            <Button onClick ={(e) => handleModal(e)}>Close form</Button>
          </Modal>
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
