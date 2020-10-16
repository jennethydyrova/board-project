import React, { useState } from "react";
// import Board from "./components/board/Board.js";
import BoardsContainer from "./containers/boards/BoardsContainer";
import "antd/dist/antd.css";
import Sidebar from "./components/navbar/index";
import { Row, Col, Layout, Menu } from "antd";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  useHistory,
} from "react-router-dom";
import About from "./components/about/index";
import CompletedTasks from "./components/completed/index";
import BoardForm from "./components/boardForm/BoardForm";
import "./App.css";
import Login from "./components/login/index";
import HeaderComponent from "./components/header/index";

const { Header, Sider, Content } = Layout;

function App() {
  return (
    <Router>
      <Layout style={{ height: "100vh" }}>
        <Sider className="sider-element" collapsible>
          <Sidebar />
        </Sider>
        <Layout className="layout">
          <Header className="header">
            <HeaderComponent />
          </Header>
          <Content className="content">
            {" "}
            <Route path="/login" component={Login} />
            <Route exact path="/" component={BoardsContainer}></Route>
            <Route path="/about" component={About} />
            <Route path="/completed" component={CompletedTasks} />
          </Content>
          {/* <Footer className="footer" style={{backgroundColor: "#1F212A"}}>Footer</Footer> */}
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
