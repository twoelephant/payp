import React, { useEffect, useState } from "react";
import './order.less';
import 'antd/dist/antd.css';
import { Button, Input, DatePicker, Table, Modal, Pagination } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import Column from "antd/lib/table/Column";
import axios from "axios";
import '../../../../api/api'

function Order() {
    const { RangePicker } = DatePicker   //日期选择器
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [tabeldata, setTabledata] = useState()
    const [tablelength, setTablelength] = useState(0)
    const [current, setCurrent] = useState(1)
    const [ordernum, setOrdernum] = useState()
    const [money, setMoney] = useState()
    const [date, setDate] = useState()
    const [unitCode, setUnitcode] = useState()
    const [name, setName] = useState()

    var mytime;
    const onChange = (value, dateString) => {       //获取日期value
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
    }
    useEffect(() => {
        clearTimeout(mytime)
        mytime = setTimeout(() => {
            showTable()
        }, 0)
    }, [])

    const showTable = () => {
        axios({
            method: 'get',
            url: '/api/api1',
        }).then((res) => {
            console.log(res);
            console.log(res.data.data.length);
            setTabledata(res.data.data)
            setTablelength(res.data.data.length)
        })
    }

    const showModal = (e) => {
        setIsModalVisible(true);
        console.log(e);
        setOrdernum(e.ordernum)
        setMoney(e.money)
        setDate(e.date)
        setUnitcode(e.unitCode)
        setName(e.name)
    }

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const change = (page, pageSize) => {
        setCurrent(page)
    }

    return (
        <>
            <div className="taskrow1">
                订单编号:
                <Input placeholder="请输入" />
                选择日期:
                {/* 大小通过Input修改 */}
                <RangePicker className="picker"
                    onChange={onChange} />
                <Button type="primary" icon={<SearchOutlined />} >
                    查询
                </Button>
            </div>
            <div className="order">
                <Table dataSource={tabeldata}
                    pagination={false}>
                    <Column title='序号'
                        dataIndex='num'
                        key='num' />
                    <Column title='订单编号'
                        dataIndex='ordernum'
                        key='ordernum' />
                    <Column title='商品名称'
                        dataIndex='name'
                        key='name' />
                    <Column title='订单金额(元)'
                        dataIndex='money'
                        key='money' />
                    <Column title='设备编号'
                        dataIndex='unitCode'
                        key='unitCode' />
                    <Column title='订单状态'
                        dataIndex='ordertype'
                        key='ordertype' />
                    <Column title='订单日期'
                        dataIndex='date'
                        key='date' />
                    <Column title='操作'
                        key='operate'
                        render={(text) => (
                            <div onClick={showModal.bind(this, text)}
                                className='busrow1'>查看详情</div>)} />
                </Table>
                <Modal title="工单详情"         //查看详情
                    visible={isModalVisible}   //显示状态
                    // onOk={handleOk}
                    onCancel={handleCancel}
                    footer={null}
                >
                    <div className="outrow1">
                        <div>
                            <div>订单编号：{ordernum}</div>
                            <div>订单金额：{money}</div>
                            <div>创建时间：{date}</div>
                            <div>支付方式：微信</div>
                        </div>
                        <div>
                            <div>商品名称：{name}</div>
                            <div>设备编号：{unitCode}</div>
                            <div>完成时间：{ }</div>
                            <div>设备地址：{ }</div>
                        </div>
                    </div>
                </Modal>
                <div style={{ overflow: 'hidden' }}>
                    <Pagination
                        style={{ marginTop: '10px', float: 'right' }}
                        current={current}  //当前
                        total={tablelength}   //数据总条数
                        onChange={change}     //点击事件
                        defaultCurrent={1}       //初始页
                        defaultPageSize={10}        //初始显示条数
                        pageSizeOptions={[5, 10, 15]}
                        showSizeChanger
                        showQuickJumper
                        showTotal={(total) => `共 ${total} 条`}
                    />
                </div>
            </div>
        </>
    )
}

export default Order;