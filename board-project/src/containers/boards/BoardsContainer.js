import React, { useState, useEffect } from "react";
import db from "../../firebaseConfig";
import Board from "../../components/board/Board";
import BoardsForm from "../../components/boardForm/BoardForm";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "antd/dist/antd.css";
import {Card} from "antd"
import Loading from "../../components/board/Loading"
import {byTitle, byTitleD, byDate, byDateD} from "../../functions"

const BoardsContainer = () => {
  const [boards, setBoards] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const [sortedBy, setSortedBy] = useState("title")

  useEffect(() => {
    return db.collection("boards").orderBy(sortedBy).onSnapshot((snapshot) => {
      if (snapshot.docChanges().length === 0){
        setIsLoading(false)
      }
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          setBoards((prevBoards) => [
            ...prevBoards,
            { ...change.doc.data(), id: change.doc.id },
          ]);
          setIsLoading(false)
        }
        if (change.type === "modified") {
          setBoards((prevBoards) => {
            const newArrBoards = [...prevBoards];
            let index = newArrBoards.findIndex((el) => el.id === change.doc.id);
            if (index !== -1) {
              newArrBoards[index] = {
                ...change.doc.data(),
                id: change.doc.id,
              };
            }
            return newArrBoards;
          });
          setIsLoading(false)
        }
        if (change.type === "removed") {
          setBoards((prevBoards) => {
            const newArrBoards = [...prevBoards];
            let index = newArrBoards.findIndex((el) => el.id === change.doc.id);

            if (index !== -1) {
              newArrBoards.splice(index, 1);
            }
            return newArrBoards;
          });
          
        }
      });
    });
  }, []);

  useEffect(() => {

    switch(sortedBy){
      case "title":
        setBoards(boards.sort(byTitle))
        break
      case "dTitle":
          setBoards(boards.sort(byTitleD))
          break
      case "date":
        setBoards(boards.sort(byDate))
        break
      case "dDate":
        setBoards(boards.sort(byDateD))
        break
    }
  }, [sortedBy])

  return (
    <div>
      <Container>
        <Row style={{display:"flex", justifyContent: "center"}}>
          {isLoading? <Loading />: null}
          {/* {setTimeout(noData, 4000)} */}
        </Row>
        <Row>
          {boards.map((el) => {
            return (
              <Board
                key={el.id}
                boardTitle={el.title}
                boardsItems={el.items ? el.items : []}
                boardsId={el.id}
              />
            );
          })}
          <Col>
            {!isLoading? <BoardsForm sortBoards={setSortedBy}/>: null}
          </Col>
        </Row>
          
      </Container>
    </div>
  );
};

export default BoardsContainer;




// function byTitle( a, b ) {
//   if ( a.title < b.title ){
//     return -1;
//   }
//   if ( a.title > b.title){
//     return 1;
//   }
//   return 0;
// }

// function byTitleD( a, b ) {
//   if ( a.title < b.title ){
//     return 1;
//   }
//   if ( a.title > b.title){
//     return -1;
//   }
//   return 0;
// }

// function byDate( a, b ) {
//   if ( a.date < b.date ){
//     return -1;
//   }
//   if ( a.date > b.date){
//     return 1;
//   }
//   return 0;
// }

// function byDateD( a, b ) {
//   if ( a.date < b.date ){
//     return 1;
//   }
//   if ( a.date > b.date){
//     return -1;
//   }
//   return 0;
// }