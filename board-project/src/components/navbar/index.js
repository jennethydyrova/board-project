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
      <Switch
        checked={theme.theme === "dark"}
        onClick={(e) => changeTheme(e)}
        checkedChildren="Dark"
        unCheckedChildren="Light"
      />
      <br />
      <br />
      <Menu
        theme={theme.theme}
        // onClick={(e) => handleClick(e)}
        style={{ width: "100%" }}
        defaultOpenKeys={["sub1"]}
        selectedKeys={[theme.current]}
        mode="inline"
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
        {/* </SubMenu> */}
        {/* <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
          <Menu.Item key="5">Option 5</Menu.Item>
          <Menu.Item key="6">Option 6</Menu.Item>
          <SubMenu key="sub3" title="Submenu">
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </SubMenu>
        </SubMenu>
        <SubMenu key="sub4" icon={<SettingOutlined />} title="Navigation Three">
          <Menu.Item key="9">Option 9</Menu.Item>
          <Menu.Item key="10">Option 10</Menu.Item>
          <Menu.Item key="11">Option 11</Menu.Item>
          <Menu.Item key="12">Option 12</Menu.Item>
        </SubMenu> */}
      </Menu>
    </>
  );
};

// ReactDOM.render(<Sider />, document.getElementById("container"));
export default Sider;
