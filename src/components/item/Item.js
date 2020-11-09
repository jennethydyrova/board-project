import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { DeleteOutlined } from "@ant-design/icons";
import { Collapse } from "antd";
import db from "../../firebaseConfig";
import { Checkbox, Button, Col } from "antd";
import "antd/dist/antd.css";
import "moment/locale/zh-cn";
import EditForm from "../EditForm/EditForm";

const Item = ({ task, boardsId, boardsItems }) => {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 1);

  const [showResults, setShowResults] = React.useState(true);
  const [userInput, setUserInput] = useState({
    title: task.title,
    due: task.due,
    assigner: task.assigner,
    assignee: task.assignee,
    id: task.id,
    completed: task.completed,
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
    db.firestore()
      .collection("boards")
      .doc(boardsId)
      .update({
        items: db.firestore.FieldValue.arrayRemove(task),
      });
  };

  useEffect(() => {
    setEditedTask(userInput);
    setUserInput("");
  }, [userInput]);

  const handleModal = () => {
    setModalOpened({
      modalOpen: modalOpened.modalOpen === true ? false : true,
    });
  };

  const completeHandler = (e) => {
    e.preventDefault();
    completeStatus();
    setShowResults(false);
  };

  const completeStatus = async () => {
    const modifiedItems = [...boardsItems];
    const itemIndex = modifiedItems.findIndex((item) => item.id === task.id);
    modifiedItems[itemIndex].completed = !modifiedItems[itemIndex].completed;
    await db.firestore().collection("boards").doc(boardsId).update({
      items: modifiedItems,
    });
  };

  return (
    <div style={style.items}>
      <Collapse className="item-title" defaultActiveKey={["1"]}>
        <Panel header={task.title} key={task.id}>
          <p className="item-element">Assigner: {task.assigner}</p>
          <p className="item-element">Assignee: {task.assignee}</p>
          <p className="item-element">Due date: {task.due}</p>
          <Button
            variant="outline-info"
            type="submit"
            size="sm"
            onClick={(e) => handleModal(e)}
            className="form-btn"
          >
            Edit
          </Button>
          <EditForm
            showResults={showResults}
            task={task}
            boardsId={boardsId}
            boardsItems={boardsItems}
            modalOpened={modalOpened}
            editedTask={editedTask}
            setModalOpened={setModalOpened}
          />
        </Panel>
      </Collapse>
      <Col style={{ marginLeft: "1rem" }}>
        <DeleteOutlined
          style={{ cursor: "pointer" }}
          onClick={(e) => handleClick(e)}
        />
        <Checkbox
          onClick={(e) => completeHandler(e)}
          checked={task.completed === true ? true : false}
        ></Checkbox>
      </Col>
    </div>
  );
};

export default Item;
