import React, { useEffect, useState } from "react";
import './Linechart.less';
import { Area, Column } from '@ant-design/plots';
import Data1 from './data.json';

function Llinchart() {

    const [dateselect, setDateselect] = useState(1)
    const [data, setData] = useState([]);
    const data2 = [
        {
            type: '北京1街道',
            sales: 648232.04
        },
        {
            type: '北京2街道',
            sales: 625693.35
        },
    ]

    // const asyncFetch = () => {
    //     fetch("./data.json")
    //         .then((response) => response.json())
    //         .then((json) => setData(json))
    //         .catch((error) => {
    //             console.log('fetch data failed', error);
    //         });
    // };
    const config = {
        data,
        // data: Data1,
        xField: 'Date',
        yField: '销售额',
        xAxis: {
            range: [0, 1],
            tickCount: 5,
        },
        meta: {
            Data: {
                alias: '时间',
            },
            sales: {
                alias: '销售额',
            },
        },
        smooth: true,
        color: '#ff5757',
        point: {
            color: 'black',
        },
        areaStyle: () => {
            return {
                fill: 'l(270) 0:#ffffff 0.5:#ff5757 1:#ff5757',
            };
        },
    };

    const config1 = {
        data: data2,
        xField: 'type',
        yField: 'sales',
        label: {
            // 可手动配置 label 数据标签位置
            position: 'middle',
            // 'top', 'bottom', 'middle',
            // 配置样式
            style: {
                fill: '#FFFFFF',
                opacity: 0.6,
            },
        },
        xAxis: {
            label: {
                autoHide: true,
                autoRotate: false,
            },
        },
        meta: {
            type: {
                alias: '地区',
            },
            sales: {
                alias: '销售额',
            },
        },
    }

    useEffect(() => {
        // asyncFetch();
        setData(Data1)
    }, [])


    const handClick = () => {
        if (dateselect != 1) {
            setDateselect(1)
        }
    }
    const handClick2 = () => {
        if (dateselect != 2) {
            setDateselect(2)
        }
    }
    const handClick3 = () => {
        if (dateselect != 3) {
            setDateselect(3)
        }
    }

    return (
        <div className="linechart">
            <div className="title">
                <div style={{ display: "flex", alignItems: "center" }}>
                    <div>销售数据</div>
                    <div className="sub-title">2022.08.07 ~ 2022.08.08</div>
                </div>
                <div className="dateselect">
                    <div className={dateselect === 1 ? "week" : ""}
                        onClick={handClick}>周</div>
                    <div className={dateselect === 2 ? "week" : ""}
                        onClick={handClick2}>月</div>
                    <div className={dateselect === 3 ? "week" : ""}
                        onClick={handClick3}>年</div>
                </div>
            </div>
            <div className="plots">
                <Area {...config} style={{ width: '50%' }} />
                <Column {...config1} style={{ width: '50%' }} />
            </div>
        </div >
    )
}

export default Llinchart;