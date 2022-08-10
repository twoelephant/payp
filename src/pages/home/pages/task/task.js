import { Button, Input, Select } from "antd";
import React from "react";
import { Outlet } from "react-router";
import './task.less';
import { SearchOutlined } from '@ant-design/icons';

function Task() {

    const { Option } = Select;
    return (
        <>
            <div className="taskrow1">
                工单编号:
                <Input placeholder="请输入" />
                工单状态:
                <Select
                className="taskrow2"
                    allowClear
                    placeholder="请选择">
                    <Option value='待办'>待办</Option>
                    <Option value='进行'>进行</Option>
                    <Option value='取消'>取消</Option>
                    <Option value='完成'>完成</Option>
                </Select>
                <Button type="primary" icon={<SearchOutlined />} >
                    查询
                </Button>
            </div>
            <Outlet></Outlet>
        </>
    )
}

export default Task;