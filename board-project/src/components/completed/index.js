import React, { useState, useEffect } from "react";
import db from "../../firebaseConfig";
import Item from "../item/Item";
import ItemForm from "../item/ItemForm";
import { DeleteOutlined } from "@ant-design/icons";
import { Collapse } from "antd";

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
      // if (data[i].data())
      setCompletedTaskList((prevState) => [...prevState, {...data[i].data(), id: data[i].id}]);
      console.log(data[i].data());
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


const gridStyle = {
  width: '25%',
  textAlign: 'center',
  margin: '10px'
};


  
  return (
completedTaskList.map((item) => {
  return (
    <Collapse style={{ width: "100%" }} defaultActiveKey={["1"]} className="completed">
 <Panel header={item.title} key={item.id}>
   
{item.items.filter((el) => el.completed === true ).map((el) => {
return (
  <Card.Grid title={el.title} style={gridStyle}>
    <p>Title: {el.title}</p>
    <p>Assigner: {el.assigner}</p>
    <p>Assignee: {el.assignee}</p>
    <p>Due date: {el.due}</p>
   
    
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




