import React from 'react'
import ReactDOM from 'react-dom'
import App from './Components/App/App.js'
import './index.css'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
ReactDOM.render(
  <Router history={hashHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={App} />
      <Route path='/:filter' component={App} />
    </Route>
  </Router>,
  document.getElementById('root')
)
