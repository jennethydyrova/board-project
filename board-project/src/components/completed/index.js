import React, { useState, useEffect } from "react";
import db from "../../firebaseConfig";
import Item from "../item/Item";
import ItemForm from "../item/ItemForm";
import { DeleteOutlined } from "@ant-design/icons";
import { Collapse } from "antd";
import Button from "react-bootstrap/Button";
import * as firebase from "firebase/app";
import { Card, Row, Col } from 'antd';
// import SortItemsBy from "../../components/item/SortItemsBy"
// import {byTitle, byTitleD, byDeadline, byDeadlineD} from "../../functions"

const CompletedTasks = () => {
 const [completedTaskList, setCompletedTaskList] = useState([])
 const { Panel } = Collapse;
 const [modalOpened, setModalOpened] = useState({ modalOpen: false });

  const fetchCompletedTasks = async() => {
    const res = await db.collection("boards").get();
    const data = res.docs;
    for (let i = 0; i < data.length; i++) {
      setCompletedTaskList((prevState) => [...prevState, data[i].data()]);
      // console.log(data[i].data());
    }
    return completedTaskList
  }
 useEffect(() => {
  fetchCompletedTasks()
 }, [])

console.log(completedTaskList)
// const handleClick = (e) => {
//   db.collection("boards")
//     .doc(boardsId)
//     .update({
//       items: firebase.firestore.FieldValue.arrayRemove(task),
//     });
// };

const handleModal = () => {
  setModalOpened({
    modalOpen: modalOpened.modalOpen === true ? false : true,
  });
};

// const handleEdit = (e) => {
//   e.preventDefault();
//   editItem();
//   setModalOpened({
//     modalOpen: modalOpened.modalOpen === true ? false : true,
//   });
// };
// const editItem = async () => {
//   const modifiedItems = boardsItems;
//   const itemIndex = modifiedItems.findIndex((item) => item.id === task.id);
//   modifiedItems[itemIndex] = userInput;
//   await db.collection("boards").doc(boardsId).update({
//     items: modifiedItems,
//   });
// };

// const completeHandler = (e) => {
//   e.preventDefault()
//   completeStatus()
//   setShowResults(false)
//   }
  
//   const completeStatus = async() => {
//     const modifiedItems = [...boardsItems];
//     const itemIndex = modifiedItems.findIndex((item) => item.id === task.id);
//     modifiedItems[itemIndex].completed = !modifiedItems[itemIndex].completed;
//     await db.collection("boards").doc(boardsId).update({
//       items: modifiedItems,
//     });
  
//   }

const gridStyle = {
  width: '25%',
  textAlign: 'center',
  margin: '10px'
};
  
  return (
completedTaskList.map((item) => {
  return (
    <Collapse style={{ width: "100%" }} defaultActiveKey={["1"]}>
 <Panel header={item.title} key={item.id}>
{item.items.map((el) => {
  return (

        <Card.Grid title={el.title} style={gridStyle}>
          <p>Assigner: {el.assigner}</p>
          <p>Assignee: {el.assignee}</p>
          <p>Due date: {el.due}</p>
          {/* <Button
          variant="outline-info"
          type="submit"
          size="sm"
          onClick={(e) => handleModal(e)}
          >
            Edit
          </Button>
          <DeleteOutlined
            style={{ cursor: "pointer" }}
            onClick={(e) => handleClick(e)}
          /> */}
          
        </Card.Grid>

  )
})}
</Panel>
</Collapse>
  )
})
  );
};







export default CompletedTasks;




