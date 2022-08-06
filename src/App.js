import Home from './pages/home/home';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/login/login';

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route path='/'><Home></Home></Route>
        <Route path='/login' exact><Login></Login></Route>
      </Switch>
    </HashRouter>
  );
}

export default App;
