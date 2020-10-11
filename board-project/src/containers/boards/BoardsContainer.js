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

const BoardsContainer = () => {
  const [boards, setBoards] = useState([]);

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    return db.collection("boards").onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          setBoards((prevBoards) => [
            ...prevBoards,
            { ...change.doc.data(), id: change.doc.id },
          ]);
          setIsLoading(false)
        }
        if (change.type === "modified") {
          console.log(change.doc.data(), change.doc.id);
          setBoards((prevBoards) => {
            const newArrBoards = [...prevBoards];
            let index = newArrBoards.findIndex((el) => el.id === change.doc.id);
            console.log(index);
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

              console.log(newArrBoards);
            }
            return newArrBoards;
          });
          setIsLoading(false)
        }
      });
    });
  }, []);

  // const noData = () => {
  //   if (boards.length === 0) {
  //     setIsLoading(null)
  //   }
  // }

  const {Meta} = Card
  return (
    <div>
      <Container>
        <Row style={{display:"flex", justifyContent: "center"}}>
          {/* {isLoading? <Loading />: null}
          {setTimeout(noData, 4000)}
          {isLoading === null? <h3 >No data to display</h3>: null} */}
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
           <BoardsForm />
          </Col>
        </Row>
          
      </Container>
    </div>
  );
};

export default BoardsContainer;
