import React, {Component} from "react";
import { DownOutlined,PlusOutlined } from '@ant-design/icons';
import { Menu, Dropdown, message, Tooltip, Button, Select, Row, Col } from 'antd';
// import { DownOutlined } from '@ant-design/icons';
import sortImg from './sort.svg' 

export default function SortBy({sortBoards}) {
    const {Option} = Select
    
    const handleClick = (e) => {
        sortBoards(e.key)
        // console.log(key)
    }
  
const dropdownSort = () => {
    return (
        <Menu onClick={e => handleClick(e)}>
          <Menu.Item key="1" value='date'>Date</Menu.Item>
          <Menu.Item key="2" value="title">Title</Menu.Item>
          <Menu.Item key="3" value="dDate">Date (descending)</Menu.Item>
          <Menu.Item key="4" value="dTitle">Title (descending)</Menu.Item>
        </Menu>
    )


}

const styleSortImg = {
    width: '25px',
    color: 'white'
}

    return (
        <>
        <Row>
            <Col>
                <p>Sort</p>
            </Col>
            <Col>
            <Dropdown overlay={dropdownSort}>
    <img src={sortImg} style={styleSortImg} onClick={e => e.preventDefault()}>
      
    </img>
  </Dropdown>

            </Col>
        </Row>
        </>
    )
}




// const onClick = ({ key }) => {
//   message.info(`Click on item ${key}`);
// };



// ReactDOM.render(
//   <Dropdown overlay={menu}>
//     <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
//       Hover me, Click menu item <DownOutlined />
//     </a>
//   </Dropdown>,
//   mountNode,
// );

// <Select defaultValue="title" onChange={handleChange} style={{width: "10em"}}>
// <Option value="date">Date</Option>
// <Option value="title">Title</Option>
// <Option value="dDate">Date (descending)</Option>
// <Option value="dTitle"> Title (descending)</Option>
// </Select>