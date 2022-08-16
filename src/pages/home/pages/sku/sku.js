import './sku.less';
import React, { useEffect, useState } from "react";
import 'antd/dist/antd.css';
import { Button, Input, Table, Modal, Pagination, Form, Select, InputNumber, message, Upload } from "antd";
import { SearchOutlined, PlusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import Column from "antd/lib/table/Column";
import axios from "axios";
import '../../../../api/api';
import ImgCrop from 'antd-img-crop';

const getBase64 = (file) =>                    //图片转64位,写于括号外
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => resolve(reader.result);

        reader.onerror = (error) => reject(error);
    });

function Sku() {
    const { Option } = Select;
    const [form] = Form.useForm();
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

    const [fileList, setFileList] = useState([])          //文件列表
    const [previewVisible, setPreviewVisible] = useState(false);    //弹窗默认不显示
    const [previewImage, setPreviewImage] = useState('');     //弹窗内图片
    const [previewTitle, setPreviewTitle] = useState('');     //弹窗标题

    const handleCancel5 = () => setPreviewVisible(false);    //关闭弹窗

    const handlePreview = async (file) => {           //预览功能
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setPreviewImage(file.url || file.preview);
        setPreviewVisible(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };

    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);   //点击添加文件

    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';         //判断上传文件类型
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');      //错误提示
        }
        const isLt2M = file.size / 1024 / 1024 < 2;             //判断文件大小是否小于2M
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');        //错误提示
        }
        return isJpgOrPng && isLt2M;
    };

    const uploadButton = (             //无文件时的显示内容
        <div>
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );


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
        setTimeout(() => {
            form.setFieldsValue({
                names: e.names,
                brand: e.brand,
                price: e.price,
                type: e.type,
                specifications: e.specifications,
            });
        }, 0);
    }

    const handleCancel = () => {
        setIsModalVisible(false);
        setFileList([])
    };
    const handleCancel2 = () => {
        setIsModalVisible(false);
        setFileList([])
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
                        form={form}
                        labelCol={{
                            span: 5
                        }}
                        preserve={false}      //搭配destroyOnClose
                        name='goods'>
                        <Form.Item
                            name="names"
                            label='商品名称'
                            rules={[
                                {
                                    required: true,
                                    message: '请输入'
                                }
                            ]}
                        >
                            <Input placeholder='请输入'
                                showCount
                                maxLength={15} />
                        </Form.Item>
                        <Form.Item
                            name='brand'
                            label='品牌'
                            rules={[
                                {
                                    required: true,
                                    message: '请输入'
                                }
                            ]}
                        >
                            <Input placeholder='请输入'
                                showCount
                                maxLength={10} />
                        </Form.Item>
                        <Form.Item
                            name='price'
                            label='商品价格(元)'
                            rules={[
                                {
                                    required: true,
                                    message: '请输入'
                                }
                            ]}
                        >
                            <InputNumber
                                style={{ width: '100%' }}
                                placeholder='请输入'
                                step='0.01'
                                stringMode
                            />
                        </Form.Item>
                        <Form.Item
                            name='type'
                            label='商品类型'
                            rules={[
                                {
                                    required: false,
                                    // message: '请输入'
                                }
                            ]}
                        >
                            <Input placeholder='请输入'
                            />
                        </Form.Item>
                        <Form.Item
                            name='specifications'
                            label='规格'
                            rules={[
                                {
                                    required: true,
                                    message: '请输入'
                                }
                            ]}
                        >
                            <Input placeholder='请输入'
                                showCount
                                maxLength={10}
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
                        >
                            <ImgCrop grid rotate>
                                <Upload
                                    name='avatar'
                                    listType='picture-card'            //listType上传列表的内建样式，支持三种基本样式 text, picture 和 picture-card
                                    //className='avatar-uploader'
                                    //showUploadList={false}              //showUploadList是否展示文件列表,默认为true,关闭则不会预览文件
                                    action=""         //文件上传地址
                                    beforeUpload={beforeUpload}         //beforeUpload上传文件之前的钩子，参数为上传的文件,限制用户上传的图片格式和大小
                                    onChange={handleChange}            //改变时
                                    fileList={fileList}                //文件来源
                                    onPreview={handlePreview}          //预览功能
                                >
                                    {fileList.length >= 1 ? null : uploadButton}
                                </Upload>
                            </ImgCrop>
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
                <Modal                      //预览的弹窗
                    zIndex='1001'               //Modal默认zIndex为1000
                    visible={previewVisible}       //是否显示  
                    title={previewTitle}           //标题
                    footer={null}
                    onCancel={handleCancel5}>
                    <img
                        alt="example"
                        style={{
                            width: '100%',
                        }}
                        src={previewImage}
                    />
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


export default Sku;