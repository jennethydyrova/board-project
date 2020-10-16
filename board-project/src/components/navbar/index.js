import React, { useState } from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { NavLink } from "react-router-dom";

import { Menu, Switch } from "antd";
import {
  HomeOutlined,
  ThunderboltOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

const { SubMenu } = Menu;
// const [collapsed, setCollapsed] = useState(true);

const Sider = () => {
  const [theme, setTheme] = useState({
    theme: "dark",
    current: "1",
  });

  const changeTheme = (value) => {
    setTheme({...theme,
      theme: value ? "dark" : "light",
    });
  };

  const handleClick = (e) => {
    console.log("click ", e);
    setTheme({...theme,
      current: e.key,
    });
  };

  const buttonBackground = {
    backgroundColor: "#36096d",
    backgroundImmage: "linear-gradient(315deg, #36096d 0%, #37d5d6 74%)"
  }

  return (
    <>
      <br />
      <br />
      <Menu
        theme={theme.theme}
        style={{ width: "100%", backgroundColor: "rgb(41, 44, 56)" }}
        defaultOpenKeys={["sub1"]}
        selectedKeys={[theme.current]}
        mode="inline"
        className="sider-element"
      >
        {/* <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One"> */}
        <Menu.Item className= "navbarItem1" key="1" icon={<HomeOutlined />} onClick= {(e) => handleClick(e)}>
          <NavLink to="/">Home</NavLink>
        </Menu.Item>
        <Menu.Item className= "navbarItem1" key="2" icon={<QuestionCircleOutlined />} onClick= {(e) => handleClick(e)}>
          <NavLink to="/about">About</NavLink>
        </Menu.Item>
        <Menu.Item className= "navbarItem1" key="3" icon={<ThunderboltOutlined />} onClick= {(e) => handleClick(e)}>
          <NavLink to="/completed">Completed</NavLink>
        </Menu.Item>
      </Menu>
    </>
  );
};

// ReactDOM.render(<Sider />, document.getElementById("container"));
export default Sider;
