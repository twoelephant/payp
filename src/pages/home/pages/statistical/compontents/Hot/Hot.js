import React, { useContext } from "react";
import { Context } from "../../../../../../App";
import './Hot.less';

function Hot() {
    const { startdate } = useContext(Context)
    const { enddate } = useContext(Context)

    return (
        <div className="hot">
            <div className="title">
                <div>商品热榜</div>
                <div className="sub-title">{startdate} ~ {enddate}</div>
            </div>
            <div className="top">
                <div className="tout">
                    <div className="tnum1">1</div>
                    星巴克
                    <div style={{float:'right'}}>473单</div>
                </div>
                <div className="tout">
                <div className="tnum2">2</div>
                    苹果
                    <div style={{float:'right'}}>443单</div>
                </div>
                <div className="tout">
                <div className="tnum3">3</div>
                    康师傅
                    <div style={{float:'right'}}>391单</div>
                </div>
                <div className="tout">
                <div className="tnum">4</div>
                    星巴克
                    <div style={{float:'right'}}>473单</div>
                </div>
                <div className="tout">
                <div className="tnum">5</div>
                    星巴克
                    <div style={{float:'right'}}>473单</div>
                </div>
                <div className="tout">
                <div className="tnum">6</div>
                    星巴克
                    <div style={{float:'right'}}>473单</div>
                </div>
                <div className="tout">
                <div className="tnum">7</div>
                    星巴克
                    <div style={{float:'right'}}>473单</div>
                </div>
                <div className="tout">
                <div className="tnum">8</div>
                    星巴克
                    <div style={{float:'right'}}>473单</div>
                </div>
                <div className="tout">
                <div className="tnum">9</div>
                    星巴克
                    <div style={{float:'right'}}>473单</div>
                </div>
                <div className="tout">
                <div className="tnum">10</div>
                    星巴克
                    <div style={{float:'right'}}>473单</div>
                </div>
            </div>
        </div>
    )
}

export default Hot;