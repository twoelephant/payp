import './region.less';
import React, { useEffect, useState } from "react";
import 'antd/dist/antd.css';
import { Button, Input, Table, Modal, Pagination, Form, Select } from "antd";
import { SearchOutlined, PlusCircleOutlined } from '@ant-design/icons';
import Column from "antd/lib/table/Column";
import axios from "axios";
import '../../../../api/api';

function Region() {
    const { Option } = Select;
    const [form] = Form.useForm();       //默认写法
    const { TextArea } = Input;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisible1, setIsModalVisible1] = useState(false);
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
            url: '/api/api5',
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
        setTimeout(() => {
            form.setFieldsValue({
                areanames: e.areanames,
                Remarks: e.Remarks,
            });
        }, 0);
    }
    const showModal1 = (e) => {
        setIsModalVisible1(true);
        console.log(e);
        // setTimeout(() => {
        //     form.setFieldsValue({
        //         areanames: e.areanames,
        //         Remarks: e.Remarks,
        //     });
        // }, 0);
    }

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const handleCancel2 = () => {
        console.log(1111111);
        setIsModalVisible(false);
    };
    const handleCancel21 = () => {
        setIsModalVisible1(false);
    };

    const change = (page, pageSize) => {
        setCurrent(page)
    }

    return (
        <>
            <div className="taskrow1">
                区域搜索:
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
                    <Column title='区域名称'
                        dataIndex='areanames'
                        key='areanames' />
                    <Column title='点位数'
                        dataIndex='bit'
                        key='bit' />
                    <Column title='备注说明'
                        dataIndex='Remarks'
                        key='Remarks' />
                    <Column title='操作'
                        key='operate'
                        render={(text) => (
                            <div className='outuserow1'>
                                <div onClick={showModal1.bind(this, text)}
                                    className='busrow1'>查看详情</div>
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
                            name="areanames"
                            label='区域名称'
                            rules={[
                                {
                                    required: true,
                                    message: '请输入'
                                },
                            ]}
                        >
                            <Input placeholder='请输入'
                                showCount
                                maxLength={15} />
                        </Form.Item>
                        <Form.Item
                            name='Remarks'
                            label='备注说明'
                            rules={[
                                {
                                    required: true,
                                    message: '请输入'
                                }
                            ]}
                        >
                            <TextArea placeholder='请输入'
                                showCount
                                maxLength={40} />
                        </Form.Item>
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
                <Modal title='区域详情'
                    visible={isModalVisible1}
                    footer={null}
                    onCancel={handleCancel21}
                >
                    <div>
                        <div>区域名称：</div>
                        <div className='regionarea'>包含点位：
                            <table>
                                <tbody>
                                    <tr>
                                        <th>序号</th>
                                        <th>点位名称</th>
                                        <th>设备数量</th>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
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


export default Region;