import React, { useState } from "react";
import './menus.less';
import 'antd/dist/antd.css';
import { NavLink } from "react-router-dom";
import { Button, Menu } from 'antd';
import {
    HomeOutlined,
    AuditOutlined,
    EnvironmentOutlined,
    ShopOutlined,
    UserOutlined,
    RestOutlined,
    BulbOutlined,
    CarryOutOutlined,
    AccountBookOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    RightOutlined,
    LeftOutlined,
} from '@ant-design/icons';


function Menus() {

    const [collapsed, setCollapsed] = useState(false);

    const toggleCollapsed = () => {        //menu缩放按钮
        setCollapsed(!collapsed);
    };


    function getItem(label, key, icon, children, type) {    //menu固定写法
        return {
            key,
            icon,
            children,
            label,
            type,
        };
    }

    const items = [
        getItem(<NavLink to="/home/statistical">立可得</NavLink>, '1', <HomeOutlined />),
        getItem('工单管理', 'sub1', <AuditOutlined />, [
            getItem(<NavLink to="/home/task/business">运营工单</NavLink>, '2'),
            getItem(<NavLink to="/home/task/operation">运维工单</NavLink>, '3'),
        ]),
        getItem('点位管理', 'sub2', <EnvironmentOutlined />, [
            getItem(<NavLink to="/home/node/region">区域管理</NavLink>, '4'),
            getItem(<NavLink to="/home/node/node">点位管理</NavLink>, '5'),
            getItem(<NavLink to="/home/node/partner">合作商管理</NavLink>, '6'),
        ]),
        getItem('设备管理', 'sub3', <ShopOutlined />, [
            getItem(<NavLink to="/home/vm/index">设备管理</NavLink>, '7'),
            getItem(<NavLink to="/home/vm/status">设备状态</NavLink>, '8'),
            getItem(<NavLink to="/home/vm/type">设备类型管理</NavLink>, '9'),
        ]),
        getItem('人员管理', 'sub4', <UserOutlined />, [
            getItem(<NavLink to="/home/user/index">人员列表</NavLink>, '10'),
            getItem(<NavLink to="/home/user/task">人效统计</NavLink>, '11'),
            getItem(<NavLink to="/home/user/work">工作量列表</NavLink>, '12'),
        ]),
        getItem('商品管理', 'sub5', <RestOutlined />, [
            getItem(<NavLink to="/home/sku/skuclass">商品类型</NavLink>, '13'),
            getItem(<NavLink to="/home/sku/sku">商品管理</NavLink>, '14'),
        ]),
        getItem(<NavLink to="/home/policy/index">策略管理</NavLink>, '15', <BulbOutlined />),
        getItem(<NavLink to="/home/order/index">订单管理</NavLink>, '16', <CarryOutOutlined />),
        getItem(<NavLink to="/home/report/index">对账统计</NavLink>, '17', <AccountBookOutlined />),
    ]

    return (
        <>
            <div className="menus">
                <Menu
                    defaultSelectedKeys={['1']}
                    // defaultOpenKeys={['sub1']}
                    mode="inline"
                    // theme="dark"
                    inlineCollapsed={collapsed}
                    items={items}
                />
                <Button                   //Button实现menu收缩
                    type="primary"
                    onClick={toggleCollapsed}
                    style={{
                        marginTop: '16px',
                        width: '100%',
                    }}
                >
                    {/* Button的坍塌前后logo */}
                    {collapsed ? <RightOutlined /> : <LeftOutlined />}
                </Button>
            </div>
        </>
    )
}

export default Menus;