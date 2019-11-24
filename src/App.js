import React from 'react';
import {Route, HashRouter, Switch} from 'react-router-dom'

import './app.scss'
//key: G5K6qtfjqkC6D0IbFChy68ruIabQPqVd
//secret: MzFjJ4Y4kM2GlrWI

import Home from './components/home/Home'
import Article from './components/article/Article'

function App() {
  return (
    <HashRouter>
      <div className="App">
        <h1 className="main-title">The <span>GDIS</span> Times</h1>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/:article_url" component={Article}/>
        </Switch>
      </div>
    </HashRouter>
  );
}

export default App;
