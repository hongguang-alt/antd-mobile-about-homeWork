import React from 'react';
import Login from './page/login/index.js'
import Upload from './page/upload/index.js'
import { HashRouter, Switch, Route } from 'react-router-dom'
import './static/css/App.css';
import './static/css/normalize.css'
import 'antd-mobile/dist/antd-mobile.css'

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Switch>
          <Route path='/' exact component={Login} />
          <Route path='/login' exact component={Login} />
          <Route path='/upload' exact component={Upload} />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
