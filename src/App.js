import Home from './pages/home/home';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/login/login';
import Statistical from './pages/home/pages/statistical/statistical';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/home/*' element={<Home />}>
          <Route index element={<Statistical />} />
          <Route path='statistical' element={<Statistical />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
