import React from "react";
import './dayseles.less'

function Dayseles() {
    return (
        <div className="usertask4">
            <div className="title">
                <div className="sub-title">日销售统计</div>
            </div>
            <div className="status">
                <div className="item">
                    <div className="stanumber">501</div>
                    <div className="statext">当日销售量（个）</div>
                </div>
                <div className="item">
                    <div className="stanumber">1100</div>
                    <div className="statext">当日销售额（元）</div>
                </div>
                <div className="item">
                    <div className="stanumber">900</div>
                    <div className="statext">当日分成（元）</div>
                </div>
            </div>
        </div>
    )
}

export default Dayseles;