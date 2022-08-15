import Home from './pages/home/home';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/login/login';
import Statistical from './pages/home/pages/statistical/statistical';
import Task from './pages/home/pages/task/task';
import Business from './pages/home/pages/task/page/business/business';
import Operation from './pages/home/pages/task/page/operation/operation';
import Region from './pages/home/pages/region/region';
import Node from './pages/home/pages/node/node';
import Partner from './pages/home/pages/partner/partner';
import Vm from './pages/home/pages/vm/vm';
import Vmstatus from './pages/home/pages/vmstatus/vmstatus';
import Vmtype from './pages/home/pages/vmtype/vmtype';
import Userindex from './pages/home/pages/userindex/userindex';
import Usertask from './pages/home/pages/usertask/usertask';
import Userwork from './pages/home/pages/userwork/userwork';
import Skuclass from './pages/home/pages/skuclass/skuclass';
import Sku from './pages/home/pages/sku/sku';
import Policy from './pages/home/pages/policy/policy';
import Order from './pages/home/pages/order/order';
import Report from './pages/home/pages/report/report';
import { createContext } from 'react';

export const Context = createContext()

let date = new Date()   //现在时间
let today = date.getDate()    //现在几号
let today1 = today < 10 ? '0' + today : today
let month = date.getMonth() + 1
let month1 = month < 10 ? '0' + month : month
let year = date.getFullYear()
let enddate = year + '.' + month1 + '.' + today1
let startdate = year + '.' + month1 + '.' + '01'
let d = date.getDay()  //现在周几
let tweek = today + 1 - d
let weekstart = year + '.' + month1 + '.' + tweek
let yearstart = year + '.' + '01' + '.' + '01'

function App() {
  return (
    <Context.Provider value={{ startdate, enddate, weekstart, yearstart }}>
      <HashRouter>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          {/* 二级路由 */}
          <Route path='/home/*' element={<Home />}>
            <Route index element={<Statistical />} />
            <Route path='statistical' element={<Statistical />} />
            {/* 三级路由 */}
            <Route path='task/*' element={<Task />} >
              <Route index element={<Business />} />
              <Route path='business' element={<Business />} />
              <Route path='operation' element={<Operation />} />
            </Route>
            <Route path='node/region' element={<Region />} />
            <Route path='node/node' element={<Node />} />
            <Route path='node/partner' element={<Partner />} />
            <Route path='vm/index' element={<Vm />} />
            <Route path='vm/status' element={<Vmstatus />} />
            <Route path='vm/type' element={<Vmtype />} />
            <Route path='user/index' element={<Userindex />} />
            <Route path='user/task' element={<Usertask />} />
            <Route path='user/work' element={<Userwork />} />
            <Route path='sku/skuclass' element={<Skuclass />} />
            <Route path='sku/sku' element={<Sku />} />
            <Route path='policy/index' element={<Policy />} />
            <Route path='order/index' element={<Order />} />
            <Route path='report/index' element={<Report />} />
          </Route>
        </Routes>
      </HashRouter>
    </Context.Provider>

  );
}

export default App;
