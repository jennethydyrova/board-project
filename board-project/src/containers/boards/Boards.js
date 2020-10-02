import React, { useState, useEffect } from "react";
import db from "../../firebaseConfig";
import Board from "../../components/board/Board";
import BoardsForm from "../../components/boardForm/BoardForm";

const BoardsContainer = () => {
  const [boards, setBoards] = useState([
    {
      title: "",
      items: [],
      id: "random string"
    },
  ]);
  const [fetchBoardData, setFetchData] = useState(0);

  useEffect(() => {
    async function fetchBoardsData() {
      const boardsResponse = await db.collection("boards").get();
      const boardsData = boardsResponse.docs.map((board) => board.data());
      setBoards(boardsData);
    }
    fetchBoardsData();
  }, [fetchBoardData]);

  // console.log("boards", boards);

  return (
    <>
      <div>
          <BoardsForm fetchBoardData={setFetchData} />
      </div>
      <div>
        {boards.map((el, index) => {
          return (
            <Board
              key={el + index}
              boardTitle={el.title}
              boardsItems={el.items}
              boardsId = {el.id}
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
