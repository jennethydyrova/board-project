import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { DeleteOutlined } from "@ant-design/icons";
import { Collapse } from "antd";

import db from "../../firebaseConfig";
import * as firebase from "firebase/app";
import Modal from "react-modal";
import { DatePicker, message } from "antd";
import { Row, Space, Checkbox, Button } from "antd";
import "antd/dist/antd.css";
import "moment/locale/zh-cn";
import moment from "moment";


const Item = ({ task, boardsId, boardsItems, setItems }) => {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 1);
  const defaultDate = currentDate.toISOString().substr(0, 10);

  const [showResults, setShowResults] = React.useState(true)

  const [userInput, setUserInput] = useState({
    title: task.title,
    due: task.due,
    assigner: task.assigner,
    assignee: task.assignee,
    id: task.id,
    completed: task.completed
  });

  // const [checked, setChecked] = useState(false)

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
  const modalStyle = {
    content: {
      display: "flex",
      justifyContent: "center",
      width: "500px",
      height: "300px",
    },
  };
  
  console.log(task)

  const handleClick = (e) => {
    db.collection("boards")
      .doc(boardsId)
      .update({
        items: firebase.firestore.FieldValue.arrayRemove(task),
      });
  };


  const handleInputValue = (e) => {
    setUserInput({ ...userInput, title: e.target.value, id: task.id });
  };

  const handleDueChange = (value) => {
    message.info(
      `Selected Date: ${value ? value.format("YYYY-MM-DD") : "None"}`
    );
    setUserInput({
      ...userInput,
      due: value.toDate().toISOString().substr(0, 10),
    });
  };

  const editItem = async () => {
    const modifiedItems = boardsItems;
    const itemIndex = modifiedItems.findIndex((item) => item.id === task.id);
    modifiedItems[itemIndex] = userInput;
    await db.collection("boards").doc(boardsId).update({
      items: modifiedItems,
    });
   
  };

  const handleEdit = (e) => {
    e.preventDefault();
    editItem();
    setModalOpened({
      modalOpen: modalOpened.modalOpen === true ? false : true,
    });
   
  };
  useEffect(() => {
    setEditedTask(userInput);

    // completeHandler()
  }, [userInput]);

  const handleModal = () => {
    setModalOpened({
      modalOpen: modalOpened.modalOpen === true ? false : true,
    });
  };

  const handleAssignerChange = (e) => {
    setUserInput({ ...userInput, assigner: e.target.value });
  };

  const handleAssigneeChange = (e) => {
    setUserInput({ ...userInput, assignee: e.target.value });
  };

const completeHandler = (e) => {
e.preventDefault()
completeStatus()
setShowResults(false)
}

const completeStatus = async() => {
  const modifiedItems = [...boardsItems];
  const itemIndex = modifiedItems.findIndex((item) => item.id === task.id);
  modifiedItems[itemIndex].completed = !modifiedItems[itemIndex].completed;
  await db.collection("boards").doc(boardsId).update({
    items: modifiedItems,
  });

}

const collapseStyle={
  backgroundColor: '282934'
}

  return (
    <div style={style.items} >
      <Collapse style={{ width: "100%" }} defaultActiveKey={["1"]} >
        <Panel header={task.title} key={task.id} > 
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
                    className="task-title"
                    placeholder="Task title"
                    onChange={(e) => handleInputValue(e)}
                  />
                {/* </Row>

                <Row> */}
                  <DatePicker
                    onChange={(e) => handleDueChange(e)}
                    defaultValue={moment(defaultDate)}
                  />
                {/* </Row>

                <Row> */}
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
                    onClick={(e) => handleEdit(e)}
                  >
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
        style={{ cursor: "pointer" ,  marginTop: '10px'}}
        onClick={(e) => handleClick(e)}
      />
      <Checkbox onClick={e => completeHandler(e)} checked={task.completed === true ? true : false}></Checkbox>
    </div>
  );
};

export default Item;

