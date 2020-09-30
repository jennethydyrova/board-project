import React, { useState, useEffect } from "react";
import db from "../../firebaseConfig";
// import Board from "./";

const BoardsContainer = () => {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    async function fetchBoardsData() {
      const boardsResponse = await db.collection("boards").get();
      const boardsData = boardsResponse.docs.map((board) => board.data());
      //   console.log(boardsData);
      setBoards(boardsData);
    }
    fetchBoardsData();
  }, []);
  console.log(boards);

  return (
    <div>
      {boards.map((el, index) => {
        return (
          <div key={index}>
            <h3>{el.title}</h3>

            {/* {el.items.map((item) => {
              return <p>{item}</p>;
            })} */}
          </div>
        );
      })}
    </div>
  );

  //   db.collection("cities").doc("SF")
  //     .onSnapshot(function(doc) {
  //         console.log("Current data: ", doc.data());
  //     });
};

export default BoardsContainer;

// const [recipe, setRecipe] = useState([]);

//   useEffect(() => {
//     async function fetchRecipeData() {
//       const recipeResponse = await db.collection("recipe").doc("FAL1").get();
//       const recipeData = recipeResponse.data();
//       // const items = inventoryResponse.docs.map((item) => item.data());
//       setRecipe(recipeData.ingredients);
//     }
//     fetchRecipeData();
//   }, []);
//   return (
//     <div className="recipesContainer">
//       <RecipeTable recipe={recipe} />
//       <AddRecipeForm />
//     </div>
//   );
