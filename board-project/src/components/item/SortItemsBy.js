import React, {Component} from "react";
import { DownOutlined,PlusOutlined } from '@ant-design/icons';
import { Menu, Dropdown, message, Tooltip, Button, Select, Row, Col } from 'antd';

export default function SortItemsBy({sortItems}) {
    const {Option} = Select
    
    const handleChange = (value) => {
        sortItems(value)
    }

    return (
        <>
        <Row>
            <Col>
                <p>Sort items by:</p>
            </Col>
            <Col>
                <Select defaultValue="title" onChange={handleChange} style={{width: "6em"}}>
                    <Option value="due">Due date</Option>
                    <Option value="title">Title</Option>
                    <Option value="dDue">Due date (descending)</Option>
                    <Option value="dTitle">Title (descending)</Option>
                </Select>
            </Col>
        </Row>
        </>
    )
}