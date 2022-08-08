import React from "react";
import Salestaus from "./compontents/Salestatus/Salestaus";
import Usertask from "./compontents/Usertask/Usertask";
import Linechart from "./compontents/Linechart/Linechart";
import Hot from "./compontents/Hot/Hot";
import './statistical.less';
import Partners from "./compontents/Partners/Partners";
import Abnormal from "./compontents/Abnormal/abnormal";

function Statistical() {
    return (
        <>
            <div className="statistical">
                <div className="statrow1">
                    <div className="statrow2">
                        <Usertask></Usertask>
                        <Salestaus></Salestaus>
                    </div>
                    <div className="st4">
                        <Linechart></Linechart>
                    </div>
                </div>
                <div className="statrow3"
                ><Hot></Hot></div>
            </div>
            <div className="statrow4">
                <Partners></Partners>
                <Abnormal></Abnormal>
            </div>
        </>
    )
}

export default Statistical;