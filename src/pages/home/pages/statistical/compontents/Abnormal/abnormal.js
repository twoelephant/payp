import React from "react";
import './abnormal.less';
import {
    UnorderedListOutlined
} from '@ant-design/icons';
import Empty from '../../../../../../img/home/empty.png';

function Abnormal() {
    return (
        <div className="abnormal">
            <div className="abrow1">
                <div>设备异常监控</div>
                <UnorderedListOutlined style={{ color: "#5f84ff" }} />
            </div>
            <div className="abrow2">
                <img src={Empty} />
                <div>暂无数据</div>
            </div>
        </div>
    )
}

export default Abnormal;