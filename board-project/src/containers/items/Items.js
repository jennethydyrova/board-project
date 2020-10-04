import React, { useState, useEffect } from "react";
import db from "../../firebaseConfig";
import Item from "../../components/item/Item";
import ItemForm from "../../components/item/ItemForm";

const ItemsContainer = ({ boardsItems, boardTitle, boardsId }) => {
  const [items, setItems] = useState({
    items: [],
  });

  const [followedItems, setFollowedItems] = useState(0);

  db.collection("boards")
    .onSnapshot((snapshot) => {
      let changes = snapshot.docChanges();
      console.log("current",changes);
    });
 
  return (
    <>
      <div>
        {items.items.map((item) => {
          return <Item key={item.id} task={item} />;
        })}
      </div>
      <div>
        <ItemForm
          boardTitle={boardTitle}
          boardsItems={boardsItems}
          boardsId={boardsId}
          itemData={setFollowedItems}
        />
      </div>
    </>
  );
};

export default ItemsContainer;



 // useEffect(() => {
  //   async function fetchItems() {
  //     const itemsResponse = await db.collection("boards").doc(boardsId).get();
  //     const itemsData = itemsResponse.data();
  //     setItems(itemsData === undefined ? items : itemsData);

  //     //   console.log("data", itemsData);
  //     //   console.log("gds", items);
  //   }
  //   fetchItems();
  // }, [followedItems]);

  //   console.log("type", items.items[0].id);
