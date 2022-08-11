import { Button, Table, Modal, Pagination, Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import './business.less';
import { PlusCircleOutlined } from '@ant-design/icons';
import axios from "axios";
import '../../../../../../api/api';


function Business() {
    const { Option } = Select;       //select选项
    const { TextArea } = Input;      //文本框
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisibl1, setIsModalVisible1] = useState(false);
    const [tabledata, setTabledata] = useState()
    const [tablelength, setTablelength] = useState(0)
    const [current, setCurrent] = useState(1)
    const [unitCode, setUnitcode] = useState()
    const [workType, setWorktype] = useState()
    const [workMode, setWorkMode] = useState()
    const [createDate, setCreateDate] = useState()
    const [person, setPerson] = useState()
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
        setUnitcode(e.unitCode)
        setWorktype(e.workType)
        setWorkMode(e.workMode)
        setCreateDate(e.createDate)
        setPerson(e.person)

    };
    const showModal1 = () => {
        setIsModalVisible1(true);

    };

    const handleOk1 = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const handleCancel1 = () => {
        setIsModalVisible1(false);
    };
    const handleCancel2 = () => {
        setIsModalVisible1(false);
    };

    const change = (page, pageSize) => {
        setCurrent(page)
    }
    const handAdd = () => {
        setIsModalVisible(false);
        setIsModalVisible1(true)
    }



    return (
        <div className="business">
            <Button
                className="button1"
                onClick={showModal1}
                icon={<PlusCircleOutlined />} >
                新建
            </Button>
            <Button className="button2">工单配置</Button>
            <Table dataSource={tabledata}        //数据来源
                pagination={                     //翻页
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
                        <div onClick={showModal.bind(this, text)}
                            className='busrow1'>查看详情</div>
                        // 获取值,this用于稳定
                    )} />
            </Table>
            <div style={{overflow:'hidden'}}>
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
            <Modal title="工单详情"         //查看详情
                visible={isModalVisible}   //显示状态
                // onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
            >
                <div className="outrow1">
                    <div>
                        <div>设备编号：{unitCode}</div>
                        <div>取消日期：{ }</div>
                        <div>工单类型：{workType}</div>
                        <div>工单方式：{workMode}</div>
                    </div>
                    <div>
                        <div>创建日期：{createDate}</div>
                        <div>运营人员：{person}</div>
                        <div>补货数量：{ }</div>
                        <div>取消原因：{ }</div>
                    </div>
                </div>
                <div className="taskbutout">
                    <Button className="taskbut1"
                        onClick={handAdd}>重新创建</Button>
                </div>
            </Modal>
            <Modal title="新增工单"        //新增工单
                visible={isModalVisibl1}
                // onOk={handleOk1}
                onCancel={handleCancel1}   //取消按钮及右上角x的功能
                maskClosable={false}       //点击蒙版关闭功能
                footer={null}
                destroyOnClose          //关闭清空内容
            >
                <Form
                    preserve={false}     //搭配destroyOnClose一起使用
                    style={{ margin: '0 20px' }}
                    labelCol={{      //可设置表单对齐
                        span: 5,
                    }}
                    name="addtask">
                    <Form.Item
                        name='tasknum'
                        label='设备编号'
                        rules={[
                            {
                                required: true,    //必填项
                                message: '请输入'   //不填时的提示
                            }
                        ]}>
                        <Input
                            placeholder="请输入"
                            showCount      //显示字数
                            maxLength={15} />
                    </Form.Item>
                    <Form.Item
                        name='tasktype'
                        label='工单类型'
                        rules={[
                            {
                                required: true,
                                message: '请选择'
                            }
                        ]}
                    >
                        <Select
                            allowClear
                            placeholder='请选择'>
                            <Option value='补货工单'></Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name='person'
                        label='运营人员'
                        rules={[
                            {
                                required: true,
                                message: '请选择'
                            }
                        ]}
                    >
                        <Select
                            allowClear      //允许清除
                            placeholder='请选择'>
                            {/* <Option value='补货工单'></Option> */}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name='remark'
                        label='备注'
                        rules={[
                            {
                                required: true,
                                message: '请输入'
                            }
                        ]}
                    >
                        <TextArea
                            placeholder="请输入备注(不超过40字)"
                            showCount
                            maxLength={40} />
                    </Form.Item>
                    <Form.Item>
                        <div className="addbutton">
                            <Button
                                className="button3"
                                onClick={handleCancel2}>取消</Button>
                            <Button
                                className="button4"
                                type="primary"
                                htmlType="submit"
                            >确定</Button>
                        </div>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default Business;