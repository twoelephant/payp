import React from "react";
import './monthsales.less';
import Dayseles from "../dayseles/dayseles";

function Monthsales() {
    return (
        <>
            <div className="usertask3">
                <div className="title">
                    <div className="sub-title">月销售统计</div>
                </div>
                <div className="status">
                    <div className="item">
                        <div className="stanumber">8000</div>
                        <div className="statext">当月销售量（个）</div>
                    </div>
                    <div className="item">
                        <div className="stanumber">1100</div>
                        <div className="statext">当月销售额（元）</div>
                    </div>
                    <div className="item">
                        <div className="stanumber">900</div>
                        <div className="statext">当月分成（元）</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Monthsales;