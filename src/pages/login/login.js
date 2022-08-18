import React, { useEffect, useState } from "react";
import './login.less';
import 'antd/dist/antd.css';
import Logo from '../../img/logo.png';
import common from "./common/common";
import { Form, Input, Button, message, } from 'antd';
import { MobileOutlined, LockOutlined, SafetyCertificateOutlined } from '@ant-design/icons';   //logo
import { useNavigate } from "react-router";
import { Link } from 'react-router-dom';
import axios from "axios";


function Login() {
    const navigate = useNavigate();
    const [loginName, setLoginName] = useState('admin')
    const [clientToken, setClientToken] = useState('')
    const [codeImage, setCodeImage] = useState('')

    const [imgcode, setImgcode] = useState('')
    const [imgurl, setImgurl] = useState('')
    const [load, setLoad] = useState(false)


    const onFinish = (values) => {        //固定写法
        console.log('Received values of form: ', values);
        axios({
            method: 'get',
            url: `http://106.15.65.54:8100/api/user/login`,
            params: {
                mobile: values.username,
                captchaKey: imgcode,
                captchaCode: values.code,
                password: values.password,
            }
        }).then((res) => {
            console.log(res);
            if (res.data.message === "") {
                setLoad(true)
                window.localStorage.setItem("token", res.data.data)
                window.localStorage.setItem("username", values.username)
                navigate('/home')
            } else {
                message.warning(res.data.message)
            }
        }).catch((error) => {
            console.log(error);
        })
    };

    var mytime

    // const handClick =() => {
    //     navigate('/home')
    // }

    useEffect(() => {
        clearTimeout(mytime)
        mytime = setTimeout(() => {
            time1()
        }, 0);
    }, [])

    const time1 = () => {
        axios({
            method: 'get',
            url: `http://106.15.65.54:8100/api/user/captcha/create`,
        }).then((res) => {
            console.log(res);
            setImgurl(res.data.data.url)
            setImgcode(res.data.data.key)
        }).catch((error) => {
            console.log(error);
        })
    }

    const handImg = () => {
        time1()
    }

    return (
        <div className="login-c">
            <div className="login-f">
                <img className="login-logo" src={Logo} />
                <Form
                    name="normal_login"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}>
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: '请输入账号',   //提示错误信息
                            }
                        ]}>
                        <Input
                            prefix={<MobileOutlined className="inputicon" />}
                            placeholder="请输入账号" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: '请输入密码',   //提示错误信息
                            }
                        ]}>
                        <Input
                            prefix={<LockOutlined className="inputicon" />}
                            placeholder="请输入密码" />
                    </Form.Item>
                    <Form.Item
                        name="code"
                        rules={[
                            {
                                required: true,
                                message: '请输入验证码',   //提示错误信息
                            }
                        ]}>
                        <Input
                            // bordered={false}
                            prefix={<SafetyCertificateOutlined className="inputicon" />}
                            placeholder="请输入验证码"
                            addonAfter={<img src={imgurl} alt=""
                                onClick={handImg} />} />

                    </Form.Item>
                    <Button type="primary"
                        htmlType="submit"
                        loading={load}>
                        登录
                    </Button>
                </Form>
            </div>
            <Link to='/home'>登录</Link>
        </div>
    )
}

export default Login;