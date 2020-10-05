import React from "react";
// import Board from "./components/board/Board.js";
import Boards from "./containers/boards/Boards";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import Navbar from "../src/components/navbar/index";
import { FileExcelFilled } from "@ant-design/icons";

function App() {
  return (
    <div>
      <Navbar />
      <Boards />
    </div>
  );
}

export default App;
