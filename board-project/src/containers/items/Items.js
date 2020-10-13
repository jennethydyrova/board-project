import React, { useState, useEffect } from "react";
import db from "../../firebaseConfig";
import Item from "../../components/item/Item";
import ItemForm from "../../components/item/ItemForm";
import SortItemsBy from "../../components/item/SortItemsBy"
import {byTitle, byTitleD, byDeadline, byDeadlineD} from "../../functions"

const ItemsContainer = ({ boardsItems, boardTitle, boardsId }) => {
  const [items, setItems] = useState(boardsItems);
  // (boardsItems) => itemsData.push(boardsItems.data().items)
  // console.log(boardsItems.data().items
  const [sortedBy, setSortedBy] = useState("title")

  useEffect(() => {
    switch(sortedBy){
      case "title":
          setItems(items.sort(byTitle))
          break
      case "dTitle":
          setItems(items.sort(byTitleD))
          break
      case "due":
          setItems(items.sort(byDeadline))
          break
      case "dDue":
          setItems(items.sort(byDeadlineD))
          break
      default: setItems(items.sort(byTitle))

    }
  }, [sortedBy])

  useEffect(()=> {
    console.log("boards",boardsItems)
    setItems(boardsItems)
  },[boardsItems])

  const notCompletedItems = items.filter((item) => item.completed === false)
 
  return (
    <>
      <SortItemsBy sortItems={setSortedBy} />
      <div>
       
        {notCompletedItems.map((item) => {
          return <Item key={item.id} task={item} boardsId={boardsId} 
          boardsItems={boardsItems} setItems={setItems}/>;
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

