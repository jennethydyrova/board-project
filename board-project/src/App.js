import React from "react";
// import Board from "./components/board/Board.js";
import BoardsContainer from "./containers/boards/BoardsContainer";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import Sidebar from "./components/navbar/index";
import { Container } from "react-bootstrap";
import { Row, Col, Layout, Menu } from "antd";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
import { BrowserRouter as Router, Route } from "react-router-dom";
import About from "./components/about/index";
import CompletedTasks from "./components/completed/index";

const { Header, Footer, Sider, Content } = Layout;

function App() {
  return (
    <Router>
      <Layout style={{ height: "100vh" }}>
        <Sider collapsible>
          <Sidebar />
        </Sider>
        <Layout>
          <Header style={{ backgroundColor: "#f0f2ff" }}> Header</Header>
          <Content>
            {" "}
            <Route exact path="/" component={BoardsContainer} />
            <Route path="/about" component={About} />
            <Route path="/completed" component={CompletedTasks} />
          </Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;

// <Layout>
// <Sider>Sider</Sider>
// <Layout>
//   <Header>Header</Header>
//   <Content>Content</Content>
//   <Footer>Footer</Footer>
// </Layout>
// </Layout>
