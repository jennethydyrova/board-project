import React, { useState, useEffect } from "react";
import db from "../../firebaseConfig";
import Board from "../../components/board/Board";
import BoardsForm from "../../components/boardForm/BoardForm";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const BoardsContainer = () => {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    return db.collection("boards").onSnapshot((snapshot) => {
      // const boardData = [];
      snapshot.docChanges().forEach(
        // (doc) => boardData.push({ ...doc.data(), id: doc.id })
        (change) => {
          if (change.type === "added") {
            setBoards((prevBoards) => [
              ...prevBoards,
              { ...change.doc.data(), id: change.doc.id },
            ]);
            // boardData.push();
            // console.log(change.doc.data());
          }
          if (change.type === "modified") {
            console.log(change.doc.data(), change.doc.id);
            setBoards((prevBoards) => {
              const newArrBoards = [...prevBoards];
              let index = newArrBoards.findIndex(
                (el) => el.id === change.doc.id
              );
              console.log(index);
              if (index !== -1) {
                newArrBoards[index] = {
                  ...change.doc.data(),
                  id: change.doc.id,
                };
              }
              return newArrBoards;
            });
          }
          if (change.type === "removed") {
            setBoards((prevBoards) => {
              const newArrBoards = [...prevBoards];
              let index = newArrBoards.findIndex(
                (el) => el.id === change.doc.id
              );

              if (index !== -1) {
                newArrBoards.splice(index, 1);

                console.log(newArrBoards);
              }
              return newArrBoards;
            });
          }
        }
      );
      // setBoards([...boards, boardData]);
    });
  }, []);

  console.log(boards);
  return (
    <div>
      <Container>
        <Row>
          <Col>
            <BoardsForm />
          </Col>
        </Row>
        <Row>
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
        </Row>
      </Container>
    </div>
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
