import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { DeleteOutlined } from "@ant-design/icons";
import { Collapse } from "antd";
import Button from "react-bootstrap/Button";
import db from "../../firebaseConfig";
import * as firebase from "firebase/app";
import ItemForm from "./ItemForm";
import Modal from "react-modal";
import { DatePicker, message } from "antd";
import { Col, Row, Space} from "antd";
import "antd/dist/antd.css";
import "moment/locale/zh-cn";
import moment from "moment";

const Item = ({ task, boardsId, boardsItems }) => {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 1);
  const defaultDate = currentDate.toISOString().substr(0, 10);

  const [userInput, setUserInput] = useState({
    title: task.title,
    due: task.due,
    assigner: task.assigner,
    assignee: task.assignee,
    id: task.id,
  });

  const { Panel } = Collapse;
  const [modalOpened, setModalOpened] = useState({ modalOpen: false });

  const [editedTask, setEditedTask] = useState(task);

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
  // console.log(task);

  const handleInputValue = (e) => {
    // console.log(userInput);
    setUserInput({ ...userInput, title: e.target.value, id: task.id });
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

  const editItem = async () => {
    const modifiedItems = boardsItems;
    const itemIndex = modifiedItems.findIndex((item) => item.id === task.id)
    modifiedItems[itemIndex] = userInput;
    await db
      .collection("boards")
      .doc(boardsId)
      .update({
        items: modifiedItems,
      });
    // setEditedTask([...userInput]);
  };
  console.log(editedTask);
  const handleEdit = (e) => {
    e.preventDefault();
    // console.log(modalOpened);
    // setModalOpened({ modalOpen: !modalOpened });
    editItem();
    setModalOpened({
      modalOpen: modalOpened.modalOpen === true ? false : true,
    })
  };
  useEffect(() => {
    setEditedTask(userInput);
  }, [userInput]);

  const handleModal = () => {
    console.log(modalOpened);
    setModalOpened({
      modalOpen: modalOpened.modalOpen === true ? false : true,
    });
  };

  const handleAssignerChange = (e) => {
    console.log(userInput);
    setUserInput({ ...userInput, assigner: e.target.value });
  };

  const handleAssigneeChange = (e) => {
    setUserInput({ ...userInput, assignee: e.target.value });
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
            onClick={(e) => handleModal(e)}
          >
            Edit
          </Button>
          <Modal isOpen={modalOpened.modalOpen} style={modalStyle}>
            <Space direction="vertical" align="center">
              <form>

                <Row>  
                  <input
                    name="items"
                    value={userInput.title}
                    placeholder="Task title"
                    onChange={(e) => handleInputValue(e)}
                  />
                </Row>

                <Row>
                  <DatePicker
                    onChange={(e) => handleDueChange(e)}
                    defaultValue={moment(defaultDate)}
                  />
                </Row>

                <Row>
                  <input
                    name="assigner"
                    value={userInput.assigner}
                    placeholder="Assigner"
                    onChange={(e) => handleAssignerChange(e)}
                  />
                </Row>

                <Row>
                  <input
                    name="assignee"
                    value={userInput.assignee}
                    placeholder="Assignee"
                    onChange={(e) => handleAssigneeChange(e)}
                  />
                </Row>

                <Row>
                  <Button
                    variant="outline-info"
                    type="submit"
                    size="sm"
                    onClick={(e) => handleEdit(e)}>
                    Edit task
                  </Button>
                </Row>

              </form>
              <Button onClick={(e) => handleModal(e)}>Close form</Button>
            </Space>
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













const modalStyle ={ 
  content: {
    display: "flex",
    justifyContent: "center"
  }
}
