import React, { useState, useEffect } from "react";
import db from "../../firebaseConfig";
import Item from "../../components/item/Item";
import ItemForm from "../../components/item/ItemForm";

const ItemsContainer = ({ boardsItems, boardTitle, boardsId }) => {
  const [items, setItems] = useState([]);

  console.log("boardsItem",boardsItems);

  // (boardsItems) => itemsData.push(boardsItems.data().items)
  // console.log(boardsItems.data().items
  return (
    <>
      <div>
        {boardsItems.map((item) => {
          return <Item key={item.id} task={item} boardsId={boardsId} />;
        })}
      </div>
      <div>
        <ItemForm
          boardTitle={boardTitle}
          boardsItems={boardsItems}
          boardsId={boardsId}
          // itemData={setFollowedItems}
        />
      </div>
    </>
  );
};

export default ItemsContainer;
