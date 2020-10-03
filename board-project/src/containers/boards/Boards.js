import React, { useState, useEffect } from "react";
import db from "../../firebaseConfig";
import Board from "../../components/board/Board";
import BoardsForm from "../../components/boardForm/BoardForm";

const BoardsContainer = () => {
  const [boards, setBoards] = useState([
    {
      title: "",
      items: [],
      id: "random string",
    },
  ]);
  const [fetchBoardData, setFetchData] = useState(0);

  //it console.logs now random string. it means that we don't assign newly generated id to board id

  // const docId = db.collection("boards").doc().id;

  // db.collection("cities").doc("SF")
  // .onSnapshot(function(doc) {
  //     console.log("Current data: ", doc.data());
  // });

  db.collection("boards")
    .orderBy("name")
    .onSnapshot((snapshot) => {
      let changes = snapshot.docChanges();
      console.log("Current data: ", changes);
    });

  // db.collection('collection')
  // .onSnapshot((snapshot) => {
  //     snapshot.docChanges().forEach((change) => {
  //         const payload = {
  //             id: change.doc.id,
  //             data: change.doc.data(),
  //         };

  //         ...... some action
  //     });
  // });

  // useEffect(() => {
  //   async function fetchBoardsData() {
  //     // const boardsResponse = await db.collection("boards").get();
  //     // const boardsData = boardsResponse.docs.map((board) => board.data());
  //     // setBoards(boardsData);
  //     // console.log(boardsResponse);

  //     db.collection("boards")
  //       .orderBy("name")

  //       .onSnapshot(function (doc) {
  //         console.log("Current data: ", doc.data());
  //       });
  //   }
  //   fetchBoardsData();
  // }, [fetchBoardData]);

  //add if i am missing smth
  //I will edit the same way i watched on youtube
  //oki doki

  // console.log("boards", boards);

  //   <Card border="info" style={{ width: '18rem' }}>
  //   <Card.Header>Header</Card.Header>
  //   <Card.Body>
  //     <Card.Title>Info Card Title</Card.Title>
  //     <Card.Text>
  //       Some quick example text to build on the card title and make up the bulk
  //       of the card's content.
  //     </Card.Text>
  //   </Card.Body>
  // </Card>
  // console.log("boards", boards.id)
  return (
    <>
      <div>
        <BoardsForm fetchBoardData={setFetchData} />
      </div>
      <div>
        {boards.map((el) => {
          return (
            <Board
              key={el.id}
              boardTitle={el.title}
              boardsItems={el.items}
              boardsId={el.id}
            />
          );
        })}
      </div>
    </>
  );

  //   db.collection("cities").doc("SF")
  //     .onSnapshot(function(doc) {
  //         console.log("Current data: ", doc.data());
  //     });
};

export default BoardsContainer;

/* <h3>{el.title}</h3> */

//           {/* <Board oneBoard={el} /> */}
//           {/* {el.items.map((item) => {
//             return <p>{item}</p>;
//           })} */}

// <div key={index + el}>{el}</div>
