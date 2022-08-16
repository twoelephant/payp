import './vmtype.less';
import React, { useEffect, useState } from "react";
import 'antd/dist/antd.css';
import { Button, Input, Table, Modal, Pagination, Form, Select, Upload, message } from "antd";
import { SearchOutlined, PlusCircleOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import Column from "antd/lib/table/Column";
import axios from "axios";
import '../../../../api/api';
import ImgCrop from 'antd-img-crop';

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => resolve(reader.result);

        reader.onerror = (error) => reject(error);
    });

function Vmtype() {
    const [form] = Form.useForm();       //默认写法
    const [imageUrl, setImageUrl] = useState();
    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState([])



    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisible1, setIsModalVisible1] = useState(false);
    const [tabeldata, setTabledata] = useState()
    const [tablelength, setTablelength] = useState(0)
    const [current, setCurrent] = useState(1)



    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setPreviewImage(file.url || file.preview);
        setPreviewVisible(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };

    const uploadButton = (
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

    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }

        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }

        return isJpgOrPng && isLt2M;
    };

    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

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
            url: '/api/api8',
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
                typenames: e.typenames,
                typecode: e.typecode,
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

    const handleCancel5 = () => {   //图片预览弹窗
        setPreviewVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setFileList([]);
    };
    const handleCancel2 = () => {
        console.log(1111111);
        setIsModalVisible(false);
        setFileList([]);
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
                型号搜索:
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
                    <Column title='型号名称'
                        dataIndex='typenames'
                        key='typenames' />
                    <Column title='型号编码'
                        dataIndex='typecode'
                        key='typecode' />
                    <Column title='设备图片'
                        dataIndex='typeimg'
                        key='typeimg' />
                    <Column title='货道行'
                        dataIndex='Cargoline'
                        key='Cargoline' />
                    <Column title='货道列'
                        dataIndex='Cargorow'
                        key='Cargorow' />
                    <Column title='操作'
                        key='operate'
                        render={(text) => (
                            <div className='outuserow1'>
                                {/* <div onClick={showModal1.bind(this, text)}
                                    className='busrow1'>查看详情</div> */}
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
                            name="typenames"
                            label='型号名称'
                            rules={[
                                {
                                    required: true,
                                    message: '请输入'
                                },
                            ]}
                        >
                            <Input placeholder='请输入'
                                showCount
                                maxLength={10} />
                        </Form.Item>
                        <Form.Item
                            name='typecode'
                            label='型号编码'
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
                            label='型号图片'
                        // name='typeimg'
                        // rules={[
                        //     {
                        //         required: true,
                        //         message: '请添加图片'
                        //     }
                        // ]}
                        >
                            <ImgCrop grid rotate>
                                <Upload
                                    name='avatar'
                                    listType='picture-card'
                                    // showUploadList={false}
                                    action="http://106.15.65.54:8000/api/product/uploadimg"
                                    beforeUpload={beforeUpload}
                                    onChange={handleChange}
                                    fileList={fileList}
                                    onPreview={handlePreview}
                                >
                                    {/* {imageUrl ? (
                                    <img
                                        src={imageUrl}
                                        alt="avatar"
                                        style={{
                                            width: '100%',
                                        }}
                                    />
                                ) : (
                                    uploadButton
                                )} */}
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


                <Modal
                    zIndex='1001'
                    visible={previewVisible}
                    title={previewTitle}
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


export default Vmtype;