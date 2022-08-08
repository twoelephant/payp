import React from "react";
import './Usertask.less';

function Usertask() {
    return (
        <div className="usertask">
            <div className="title">
                <div>工单统计</div>
                <div className="sub-title">2022.08.07 ~ 2022.08.08</div>
            </div>
            <div className="status">
                <div className="item">
                    <div className="stanumber">0</div>
                    <div className="statext">工单总数（个）</div>
                </div>
                <div className="item">
                    <div className="stanumber">0</div>
                    <div className="statext">完成工单（个）</div>
                </div>
                <div className="item">
                    <div className="stanumber">0</div>
                    <div className="statext">进行工单（个）</div>
                </div>
                <div className="item">
                    <div className="stanumber">0</div>
                    <div className="statext">取消工单（个）</div>
                </div>
            </div>
        </div>
    )
}

export default Usertask;