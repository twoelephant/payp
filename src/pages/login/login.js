import React, { useEffect, useState } from "react";
import './login.less';
import 'antd/dist/antd.css';
import Logo from '../../img/logo.png';
import common from "./common/common";
import { Form, Input, Button, } from 'antd';
import { MobileOutlined, LockOutlined, SafetyCertificateOutlined } from '@ant-design/icons';   //logo
import { useNavigate } from "react-router";
import { Link } from 'react-router-dom';


function Login() {
    const navigate = useNavigate();
    const [loginName, setLoginName] = useState('admin')
    const [clientToken, setClientToken] = useState('')

    const onFinish = (values) => {        //固定写法
        console.log('Received values of form: ', values);
    };

    // const handClick =() => {
    //     navigate('/home')
    // }

    useEffect(() => {
    }, [])

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
                            placeholder="请输入验证码" />
                    </Form.Item>
                    <Button type="primary" htmlType="submit">
                        登录
                    </Button>
                </Form>
            </div>
            <Link to='/home'>登录</Link>
        </div>
    )
}

export default Login;