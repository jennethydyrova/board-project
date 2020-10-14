import React, {Component} from "react";
import { DownOutlined,PlusOutlined } from '@ant-design/icons';
import { Menu, Dropdown, message, Tooltip, Button, Select, Row, Col } from 'antd';

export default function SortBy({sortBoards}) {
    const {Option} = Select
    
    const handleChange = (value) => {
        sortBoards(value)
    }

    return (
        <>
        <Row>
            <Col>
                <p>Sort by:</p>
            </Col>
            <Col>
                <Select defaultValue="title" onChange={handleChange} style={{width: "10em"}}>
                    <Option value="date">Date</Option>
                    <Option value="title">Title</Option>
                    <Option value="dDate">Date (descending)</Option>
                    <Option value="dTitle"> Title (descending)</Option>
                </Select>
            </Col>
        </Row>
        </>
    )
}