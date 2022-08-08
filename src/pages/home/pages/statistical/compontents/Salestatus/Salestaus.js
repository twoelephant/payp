import React from "react";
import './Salestaus.less';

function Salestaus() {
    return (
        <div className="salestaus">
            <div className="title">
                <div>销售统计</div>
                <div className="sub-title">2022.08.07 ~ 2022.08.08</div>
            </div>
            <div className="status">
                <div className="item">
                    <div className="stanumber">4278</div>
                    <div className="statext">订单量（个）</div>
                </div>
                <div className="item">
                    <div className="stanumber">0</div>
                    <div className="statext">销售额（元）</div>
                </div>
            </div>
        </div>
    )
}

export default Salestaus;