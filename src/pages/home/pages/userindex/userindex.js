import './userindex.less';
import React, { useEffect, useState } from "react";
import 'antd/dist/antd.css';
import { Button, Input, Table, Modal, Pagination, Form, Select } from "antd";
import { SearchOutlined, PlusCircleOutlined } from '@ant-design/icons';
import Column from "antd/lib/table/Column";
import axios from "axios";
import '../../../../api/api';

function Userindex() {
    const { Option } = Select;
    const [form] = Form.useForm();       //默认写法
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [tabeldata, setTabledata] = useState()
    const [tablelength, setTablelength] = useState(0)
    const [current, setCurrent] = useState(1)
    const [names, setNames] = useState()
    const [phone, setPhone] = useState()
    const [job, setJob] = useState()
    const [area, setArea] = useState()

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
            url: '/api/api2',
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
        setNames(e.names)
        setPhone(e.phone)
        setJob(e.job)
        setArea(e.area)
        setTimeout(() => {
            form.setFieldsValue({
                phone: e.phone,
                names: e.names,
                job: e.job,
                area: e.area,
            });
        }, 0);
    }

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const handleCancel2 = () => {
        console.log(1111111);
        setIsModalVisible(false);
    };

    const change = (page, pageSize) => {
        setCurrent(page)
    }

    return (
        <>
            <div className="taskrow1">
                人员搜索:
                <Input placeholder="请输入" />
                <Button type="primary" icon={<SearchOutlined />} >
                    查询
                </Button>
            </div>
            <div className='order'>
                <Button
                    className="button1"
                    onClick={showModal}
                    icon={<PlusCircleOutlined />} >
                    新建
                </Button>
                <Table dataSource={tabeldata}
                    pagination={false}>
                    <Column title='序号'
                        dataIndex='num'
                        key='num' />
                    <Column title='人员名称'
                        dataIndex='names'
                        key='names' />
                    <Column title='归属区域'
                        dataIndex='area'
                        key='area' />
                    <Column title='职位'
                        dataIndex='job'
                        key='job' />
                    <Column title='联系电话'
                        dataIndex='phone'
                        key='phone' />
                    <Column title='操作'
                        key='operate'
                        render={(text) => (
                            <div className='outuserow1'>
                                <div onClick={showModal.bind(this, text)}
                                    className='busrow1'>修改</div>
                                <div className='del'>删除</div>
                            </div>
                        )} />
                </Table>
                <Modal title="编辑人员"         //查看详情
                    visible={isModalVisible}   //显示状态
                    // onOk={handleOk}
                    onCancel={handleCancel}
                    footer={null}
                    destroyOnClose           //关闭清空内容
                    maskClosable={false}
                >
                    <Form
                        form={form}        //用setIsModalVisible必须添加form={form} 
                        labelCol={{
                            span: 5
                        }}
                        preserve={false}      //搭配destroyOnClose
                        name='member'>
                        <Form.Item
                            name="names"
                            label='人员名单'
                            rules={[
                                {
                                    required: true,
                                    message: '请输入'
                                },
                            ]}
                        >
                            <Input placeholder='请输入'
                                // defaultValue={names}   //默认值
                                showCount
                                maxLength={5} />
                        </Form.Item>
                        <Form.Item
                            name='job'
                            label='职业'
                            rules={[
                                {
                                    required: true,
                                    message: '请选择'
                                }
                            ]}
                        >
                            <Select
                                // defaultValue={job}
                                placeholder='请选择'>
                                <Option value='维修者'>维修者</Option>
                                <Option value='运营者'>运营者</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name='phone'
                            label='联系电话'
                            rules={[
                                {
                                    required: true,
                                    message: '请输入'
                                }
                            ]}
                        >
                            <Input placeholder='请输入'
                                // defaultValue={phone}
                                showCount
                                maxLength={11} />
                        </Form.Item>
                        <Form.Item
                            label='负责区域'
                            name='area'
                            rules={[
                                {
                                    required: true,
                                    message: '请选择'
                                }
                            ]}
                        >
                            <Select
                                // defaultValue={area}
                                placeholder='请选择'>
                                <Option value='十一区'>十一区</Option>
                                <Option value='十二区'>十二区</Option>
                                <Option value='十三区'>十三区</Option>
                                <Option value='十四区'>十四区</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label='头像'
                            rules={[
                                {
                                    required: true,
                                    message: '请上传'
                                }
                            ]}
                        ></Form.Item>
                        <Form.Item
                            label='状态'
                        ></Form.Item>
                        <Form.Item>
                            <div className="addbutton">
                                <Button
                                    className="button3"
                                    onClick={handleCancel2}
                                >取消</Button>
                                <Button
                                    className="button4"
                                    type="primary"
                                    htmlType="submit"
                                >确定</Button>
                            </div>
                        </Form.Item>
                    </Form>
                </Modal>
                <div className="paginations">
                    <Pagination
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


export default Userindex;