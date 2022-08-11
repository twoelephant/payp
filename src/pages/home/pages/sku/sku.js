import './sku';
import React, { useEffect, useState } from "react";
import 'antd/dist/antd.css';
import { Button, Input, Table, Modal, Pagination, Form, Select } from "antd";
import { SearchOutlined, PlusCircleOutlined } from '@ant-design/icons';
import Column from "antd/lib/table/Column";
import axios from "axios";
import '../../../../api/api';

function Sku() {
    const { Option } = Select;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [tabeldata, setTabledata] = useState()
    const [tablelength, setTablelength] = useState(0)
    const [current, setCurrent] = useState(1)
    const [names, setNames] = useState()
    const [brand, setBrand] = useState()
    const [price, setPrice] = useState()
    const [type, setType] = useState()
    const [specifications, setSpecifications] = useState()

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
            url: '/api/api3',
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
        setBrand(e.brand)
        setPrice(e.price)
        setType(e.type)
        setSpecifications(e.SearchOutlined)
    }

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const handleCancel2 = () => {
        setIsModalVisible(false);
    };

    const change = (page, pageSize) => {
        setCurrent(page)
    }

    return (
        <>
            <div className="taskrow1">
                商品搜索:
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
                    <Column title='商品名称'
                        dataIndex='names'
                        key='names' />
                    <Column title='商品图片'
                        dataIndex='img'
                        key='img' />
                    <Column title='品牌'
                        dataIndex='brand'
                        key='brand' />
                    <Column title='规格'
                        dataIndex='specifications'
                        key='specifications' />
                    <Column title='商品价格'
                        dataIndex='price'
                        key='price' />
                    <Column title='商品类型'
                        dataIndex='type'
                        key='type' />
                    <Column title='操作'
                        key='operate'
                        render={(text) => (
                            <div onClick={showModal.bind(this, text)}
                                className='busrow1'>修改</div>
                        )} />
                </Table>
                <Modal title="修改商品"         //查看详情
                    visible={isModalVisible}   //显示状态
                    // onOk={handleOk}
                    onCancel={handleCancel}
                    footer={null}
                    destroyOnClose           //关闭清空内容
                    maskClosable={false}
                >
                    <Form
                        labelCol={{
                            span: 5
                        }}
                        preserve={false}      //搭配destroyOnClose
                        name='editor'>
                        <Form.Item
                            // name="names"
                            label='商品名称'
                            rules={[
                                {
                                    required: true,
                                    message: '请输入'
                                }
                            ]}
                        >
                            <Input placeholder='请输入'
                                defaultValue={names}   //默认值
                                showCount
                                maxLength={15} />
                        </Form.Item>
                        <Form.Item
                            // name='job'
                            label='职业'
                            rules={[
                                {
                                    required: true,
                                    message: '请输入'
                                }
                            ]}
                        >
                            <Input placeholder='请输入'
                                defaultValue={brand}   //默认值
                                showCount
                                maxLength={10} />
                        </Form.Item>
                        <Form.Item
                            label='商品价格(元)'
                            rules={[
                                {
                                    required: true,
                                    message: '请输入'
                                }
                            ]}
                        >
                            <Input placeholder='请输入'
                                defaultValue={price}   //默认值
                            />
                        </Form.Item>
                        <Form.Item
                            label='商品类型'
                            rules={[
                                {
                                    required: false,
                                    // message: '请输入'
                                }
                            ]}
                        >
                            <Input placeholder='请输入'
                                defaultValue={type}   //默认值
                            />
                        </Form.Item>
                        <Form.Item
                            label='规格'
                            rules={[
                                {
                                    required: true,
                                    message: '请输入'
                                }
                            ]}
                        >
                            <Input placeholder='请输入'
                                defaultValue={specifications}   //默认值
                            />
                        </Form.Item>

                        <Form.Item
                            label='商品图片'
                            rules={[
                                {
                                    required: true,
                                    message: '请上传'
                                }
                            ]}
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


export default Sku;