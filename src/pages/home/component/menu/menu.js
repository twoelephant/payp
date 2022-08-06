import React from "react";
import './menu.less';
import { Link } from "react-router-dom";

function Menu() {
    return (
        <>
            <div className="menu">
                <Link>工作台</Link>
                <Link>工单管理</Link>
                <Link>运营工单</Link>
                <Link>运维工单</Link>
                <Link>点位管理</Link>
                <Link>区域管理</Link>
                <Link>合作商管理</Link>
                <Link>设备管理</Link>
                <Link>设备类型管理</Link>
                <Link>设备状态</Link>
                <Link>商品管理</Link>
                <Link>商品类型管理</Link>
                <Link>订单管理</Link>
                <Link>策略管理</Link>
                <Link>对账管理</Link>
                <Link>对账统计</Link>
            </div>
        </>
    )
}

export default Menu;