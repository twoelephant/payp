import React from "react";
import './head.less';
import Logo1 from '../../../../img/logo1.png';
import Avatar from '../../../../img/avatar.png';
import { Button, Tooltip } from "antd";
import { ExportOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

function Head() {
    const navigate = useNavigate()
    function handClick(){
        navigate('/')
    }
    return (
        <div className="head">
            <div style={{ marginLeft: '15px' }}>
                <img src={Logo1} />
            </div>
            <div style={{ marginRight: '15px' }}>
                <img src={Avatar} />
                <span style={{margin:'0 15px'}}>
                    欢迎您，admin
                </span>
                <Tooltip title="退出登录">
                    <Button 
                    onClick={()=>{
                        handClick()
                    }}
                    style={{backgroundColor:'#5373e0',border:'none'}}
                    type="primary" icon={<ExportOutlined />} />
                </Tooltip>
            </div>
        </div>
    )
}

// export default withRouter(Head);
export default Head;