import React from "react";
import { Route, Switch } from "react-router";
import { Outlet } from "react-router-dom";
import Head from "./component/head/head";
import Menus from "./component/menus/menus";
import './home.less';
import Statistical from "./pages/statistical/statistical";

function Home() {
    return (
        <>
            <Head></Head>
            <div className="out">
                <Menus></Menus>
                <div className="content">
                        <Outlet></Outlet>
                </div>
            </div>
        </>
    )
}

export default Home;