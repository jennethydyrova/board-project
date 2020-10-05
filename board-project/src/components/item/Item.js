import React, { useState, useEffect } from "react";

const Item = ({ task }) => {
  const style = {
    items: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between"
    }
  }
  return (
    <div style={style.items}>
      <p>{task.title}</p>
      <p>{task.assigner}</p>
      <p>{task.assignee}</p>
      <p>{task.due}</p>
    </div>
  );
};

export default Item;
