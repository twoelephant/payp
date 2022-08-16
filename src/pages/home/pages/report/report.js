import { Select, DatePicker, Button, Table } from "antd";
import React, { useContext, useEffect, useState } from "react";
import Dayseles from "./component/dayseles/dayseles";
import Monthsales from "./component/monthsales/monthsales";
import './report.less';
import { SearchOutlined } from '@ant-design/icons';
import axios from "axios";
import moment from 'moment';
import { Context } from '../../../../App';

function Report() {
    const { Option } = Select
    const { Column } = Table
    const { RangePicker } = DatePicker
    const dateFormat = 'YYYY/MM/DD'
    const { enddate } = useContext(Context)
    const { startdate } = useContext(Context)
    const [tabledata, setTabledata] = useState()

    const onChange = (value, dateString) => {
        console.log('Selected Time', value);
        console.log('Formatted Selected Time:', dateString);
    }
    var mytime;

    useEffect(() => {
        clearTimeout(mytime)
        mytime = setTimeout(() => {
            showTable()
        }, 0)
    }, [])

    const showTable = () => {
        axios({
            method: 'get',
            url: '/api/api10',
        }).then((res) => {
            console.log(res);
            console.log(res.data.data.length);
            setTabledata(res.data.data)
            // setTablelength(res.data.data.length)
        })
    }
    return (
        <>
            <div className="reportrow1">
                <Dayseles></Dayseles>
                <Monthsales></Monthsales>
            </div>
            <div className="reportrow2">
                合作商：<Select
                    style={{ margin: '0 20px' }}
                    allowClear
                    placeholder='请选择'>
                    <Option value='天华物业'>天华物业</Option>
                </Select>
                日期:
                <RangePicker
                    style={{ margin: '0 20px' }}
                    onChange={onChange}
                    defaultValue={[moment(startdate, dateFormat), moment(enddate, dateFormat)]}
                    format={dateFormat} />
                <Button type="primary" icon={<SearchOutlined />} >
                    查询
                </Button>
                <div className="reportrow3">
                    <div>
                        笔数统计：
                        <span className="reportnum">8000</span>个
                    </div>
                    <div>
                        统计收入：
                        <span className="reportnum">168422</span>元
                    </div>
                    <div>
                        分成统计:
                        <span className="reportnum">48923</span>元
                    </div>
                </div>
                <Table dataSource={tabledata}>
                    <Column title='订单日期'
                        dataIndex='orderdate'
                        key='orderdate' />
                    <Column title='合作商'
                        dataIndex='partners'
                        key='partners' />
                    <Column title='分成比例'
                        dataIndex='share'
                        key='share' />
                    <Column title='收入（元）'
                        dataIndex='income'
                        key='income' />
                    <Column title='笔数'
                        dataIndex='sum'
                        key='sum' />
                    <Column title='分成金额（元）'
                        dataIndex='group'
                        key='group' />
                </Table>
            </div>
        </>
    )
}

export default Report;