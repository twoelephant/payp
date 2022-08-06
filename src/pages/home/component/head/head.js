import React from "react";
import './head.less';
import Logo1 from '../../../../img/logo1.png';
import Avatar from '../../../../img/avatar.png';

function Head() {
    return (
        <div className="head">
            <img src={Logo1} />
            <img src={Avatar}/>
            欢迎您，admin
        </div>
    )
}

export default Head;