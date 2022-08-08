import React, { useState } from "react";
import './menus.less';
import 'antd/dist/antd.css';
import { Link } from "react-router-dom";
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
} from '@ant-design/icons';


function Menus() {

    const [collapsed, setCollapsed] = useState(false);

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };


    function getItem(label, key, icon, children, type) {
        return {
            key,
            icon,
            children,
            label,
            type,
        };
    }

    function handClick(e){
        console.log(e)
    }

    const items = [
        getItem('立可得', '1', <HomeOutlined />),
        getItem('工单管理', 'sub1', <AuditOutlined />, [
            getItem('运营工单', '2'),
            getItem('运维工单', '3'),
        ]),
        getItem('点位管理', 'sub2', <EnvironmentOutlined />, [
            getItem('区域管理', '4'),
            getItem('点位管理', '5'),
            getItem('合作商管理', '6'),
        ]),
        getItem('设备管理', 'sub3', <ShopOutlined />, [
            getItem('设备管理', '7'),
            getItem('设备状态', '8'),
            getItem('设备类型管理', '9'),
        ]),
        getItem('人员管理', 'sub4', <UserOutlined />, [
            getItem('人员列表', '10'),
            getItem('人员统计', '11'),
            getItem('工作量列表', '12'),
        ]),
        getItem('商品管理', 'sub5', <RestOutlined />, [
            getItem('商品类型', '13'),
            getItem('商品管理', '14'),
        ]),
        getItem('策略管理', '15', <BulbOutlined />),
        getItem('订单管理', '16', <CarryOutOutlined />),
        getItem('对账统计', '17', <AccountBookOutlined />),
    ]

    return (
        <>
            <div className="menus">
                <Menu
                // style={{overflowY:'auto'}}
                    defaultSelectedKeys={['1']}
                    // defaultOpenKeys={['sub1']}
                    mode="inline"
                    // theme="dark"
                    inlineCollapsed={collapsed}
                    items={items}
                    onClick={()=>{
                        handClick()
                    }}
                />
                <Button
                    type="primary"
                    onClick={toggleCollapsed}
                    style={{
                        marginTop: '16px',
                        width: '100%',
                    }}
                >
                    {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </Button>
            </div>
        </>
    )
}

export default Menus;