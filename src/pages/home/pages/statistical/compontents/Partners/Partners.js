import React from "react";
import './Partners.less';
import { Pie } from '@ant-design/plots';
import {
    UnorderedListOutlined
} from '@ant-design/icons';

function Partners() {
    const data = [
        {
            type: '金燕龙合作商',
            value: 62.5,
        },
        {
            type: '天华物业',
            value: 12.5,
        },
        {
            type: '北京合作商',
            value: 12.5,
        },
        {
            type: '合作开发商',
            value: 8.33,
        },
        {
            type: 'likede',
            value: 4.17,
        },
    ];
    const config = {
        appendPadding: 10,
        data,
        angleField: 'value',
        colorField: 'type',
        radius: 0.8,
        label: {
            type: 'outer',
            content: '{name} {percentage}',
        },
        interactions: [
            {
                type: 'pie-legend-active',
            },
            {
                type: 'element-active',
            },
        ],
    };

    return (
        <div className="partners">
            <div className="parow1">
                <div>合作商点位数Top5</div>
                <UnorderedListOutlined style={{ color: "#5f84ff" }} />
            </div>
            <Pie {...config} />
            <div className="parow2">
                <div>点位数</div>
                <div className="parow3">26</div>
                <div>合作商</div>
                <div className="parow3">11</div>
            </div>
        </div>
    )

}

export default Partners;