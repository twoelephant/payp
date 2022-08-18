import React from "react";
import './head.less';
import Logo1 from '../../../../img/logo1.png';
import Avatar from '../../../../img/avatar.png';
import { Button, Tooltip } from "antd";
import { ExportOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { useState } from "react";

function Head() {
    const navigate = useNavigate()
    const [username, setUsername] = useState("")

    useEffect(() => {
        let user = window.localStorage.getItem("username")
        setUsername(user)
    }, [])
    function handClick() {
        window.localStorage.clear()
        navigate('/')
    }
    return (
        <div className="head">
            <div style={{ marginLeft: '15px' }}>
                <img src={Logo1} />
            </div>
            <div style={{ marginRight: '15px' }}>
                <img src={Avatar} />
                <span style={{ margin: '0 15px' }}>
                    欢迎您，{username}
                </span>
                <Tooltip title="退出登录">
                    <Button
                        onClick={() => {
                            handClick()
                        }}
                        style={{ backgroundColor: '#5373e0', border: 'none' }}
                        type="primary" icon={<ExportOutlined />} />
                </Tooltip>
            </div>
        </div>
    )
}

// export default withRouter(Head);
export default Head;