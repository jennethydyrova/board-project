import React from "react";
// import Board from "./components/board/Board.js";
import BoardsContainer from "./containers/boards/BoardsContainer";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import Sider from "./components/navbar/index";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter as Router, Route } from "react-router-dom";
import About from "./components/about/index";
import CompletedTasks from "./components/completed/index";

function App() {
  return (
    <Router>
      <div>
        <Container>
          <Row>
            <Col lg={4}>
              <Sider />
            </Col>
            <Col lg={8}>
              {/* <BoardsContainer /> */}
              <Route exact path="/" component={BoardsContainer} />
              <Route path="/about" component={About} />
              <Route path="/completed" component={CompletedTasks} />
            </Col>
          </Row>
        </Container>
      </div>
    </Router>
  );
}

export default App;
