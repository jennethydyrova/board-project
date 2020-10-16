import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import BoardsContainer from "./containers/boards/BoardsContainer";
import About from "./components/about/index";
import CompletedTasks from "./components/completed/index";
import Login from "./components/login/index";
import HeaderComponent from "./components/header/index";
import "antd/dist/antd.css";
import Sidebar from "./components/navbar/index";
import { Layout } from "antd";
import "./App.css";

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
            {window.location.pathname !== "/login" ? <HeaderComponent /> : null}
            {console.log(window.location.pathname)}
          </Header>
          <Content className="content">
            {" "}
            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={BoardsContainer}></Route>
            <Route path="/about" component={About} />
            <Route path="/completed" component={CompletedTasks} />
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
