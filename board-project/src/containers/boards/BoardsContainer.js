import React, { useState, useEffect } from "react";
import db from "../../firebaseConfig";
import Board from "../../components/board/Board";
import BoardsForm from "../../components/boardForm/BoardForm";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "antd/dist/antd.css";
import {Card, List, Switch, Menu, Dropdown} from "antd"
import {byTitle, byTitleD, byDate, byDateD} from "../../functions"
import SortBy from '../../components/sortBy/SortBy'
import ListView from '../../components/listView'
import BoardViewImg from './chess-board.svg' 


const BoardsContainer = () => {
  const [boards, setBoards] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const [sortedBy, setSortedBy] = useState("")
  const [listView, setListView] = useState(true)


  const sortBoards = (sortedBy) => {
    console.log(sortedBy)
    switch(sortedBy){
      case "2":
        setBoards((prevBoards) => {
          const newBoards = [...prevBoards];
          let newBoard = newBoards.sort(byTitle)
          return newBoard
        })
          break
      case "4":
        setBoards((prevBoards) => {
          const newBoards = [...prevBoards];
          let newBoard = newBoards.sort(byTitleD)
          return newBoard
        })
          break
      case "1":
        setBoards((prevBoards) => {
          const newBoards = [...prevBoards];
          let newBoard = newBoards.sort(byDate)
          return newBoard
        })
          break
      case "3":
        setBoards((prevBoards) => {
          const newBoards = [...prevBoards];
          let newBoard = newBoards.sort(byDateD)
          return newBoard
        })
          break
      default:
        setBoards((prevBoards) => {
          const newBoards = [...prevBoards];
          let newBoard = newBoards.sort(byTitle)
          return newBoard
        })
    }
  }

  useEffect(() => {
    return db.collection("boards").onSnapshot((snapshot) => {
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


 const handleChange = () => {
    setListView(!listView)
  }

  const gridStyle = {
    margin: '15px',
    width: '30%'
  }

const dropdownView = () => {
  return (
    <Menu onClick={e => handleChange(e)}>
      <Menu.Item key="1">Board</Menu.Item>
      <Menu.Item key="2">List</Menu.Item>
    </Menu>
)
}
  const boardViewStyle = {
    width: '15px',
    color: 'white'
  }

  return (
    <div>
      <Row className="content-header">
      
          <Col>
            <BoardsForm />
          </Col>
          </Row>
      <Row>
       <Col>
       <p>View</p>
       </Col>
       <Col>
       <Dropdown overlay={dropdownView}>
    <img src={BoardViewImg} style={boardViewStyle} onClick={e => e.preventDefault()} />
  </Dropdown>
       </Col>
       </Row>

          <Col>
            <SortBy sortBoards={sortBoards}/>
          </Col>
        

        <Row>
{ listView ? 
    boards.map((el) => {
            return (
              <Card.Grid style={gridStyle}>
                <Board
                  key={el.id}
                  boardTitle={el.title}
                  boardsItems={el.items ? el.items : []}
                  boardsId={el.id}
                />
               </Card.Grid>
            )
          })
            :
           boards.map((el) => {
            return (
              <List.Item >
                <ListView
                  key={el.id}
                  boardTitle={el.title}
                  boardsItems={el.items ? el.items : []}
                  boardsId={el.id}
                />
               </List.Item>
            );
          })
        }
        </Row>

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