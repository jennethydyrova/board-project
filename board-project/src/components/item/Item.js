import React, { useState, useEffect } from "react";

const Item = ({ task }) => {
  return (
    <div>
      <p>{task}</p>
    </div>
  );
};

export default Item;
