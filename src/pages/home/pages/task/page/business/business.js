import { Button, Table, Modal, Pagination } from "antd";
import React, { useEffect, useState } from "react";
import './business.less';
import { PlusCircleOutlined } from '@ant-design/icons';
import axios from "axios";
import '../../../../../../api/api';


function Business() {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [tabledata, setTabledata] = useState()
    const [tablelength, setTablelength] = useState(0)
    const [current, setCurrent] = useState(1)
    const { Column } = Table
    var mytime;

    useEffect(() => {
        // 通过clearTimeout来解决两次循环
        clearTimeout(mytime)
        mytime = setTimeout(() => {
            showTable()
        }, 0)
    }, [])

    const showTable = () => {
        axios({
            method: 'get',
            url: '/api/api',
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

    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const change = (page, pageSize) => {
        setCurrent(page)
    }



    return (
        <div className="business">
            <Button
                className="button1"
                icon={<PlusCircleOutlined />} >
                新建
            </Button>
            <Button className="button2">工单配置</Button>
            <Table dataSource={tabledata}
                pagination={
                    false
                }>
                <Column title='序号'
                    dataIndex='num'
                    key='num' />
                <Column title='工单编号'
                    dataIndex='taskCode'
                    key='taskCode' />
                <Column title='设备编号'
                    dataIndex='unitCode'
                    key='unitCode' />
                <Column title='工单类型'
                    dataIndex='workType'
                    key='workType' />
                <Column title='工单方式'
                    dataIndex='workMode'
                    key='workMode' />
                <Column title='工单状态'
                    dataIndex='taskStatus'
                    key='taskStatus' />
                <Column title='运营人员'
                    dataIndex='person'
                    key='person' />
                <Column title='创建日期'
                    dataIndex='createDate'
                    key='createDate' />
                <Column title='操作'
                    // dataIndex='operate'      
                    key='operate'
                    render={(text) => (
                        <div onClick={showModal.bind(this,text)}>查看详情</div>
                        // 获取值,this用于稳定
                    )} />
            </Table>
            <Pagination
                style={{ marginTop: '10px' }}
                current={current}  //当前
                total={tablelength}   //数据总条数
                onChange={change}     //点击事件
                defaultCurrent={1}       //初始页
                defaultPageSize={10}        //初始显示条数
                pageSizeOptions={[5, 10, 15]}
                showSizeChanger     
                showQuickJumper
                showTotal={(total) => `一共 ${total} 条`}
            />
            <Modal title="工单详情"
                visible={isModalVisible}   //显示状态
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
            >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </div>
    )
}

export default Business;