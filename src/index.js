import React from 'react'
import ReactDOM from 'react-dom'
import App from './Components/App/App.js'
import './index.css'
import { Router, Route, hashHistory } from 'react-router'
ReactDOM.render(
  <Router history={hashHistory}>
    <Route path='/(:filter)' component={App} />
  </Router>,
  document.getElementById('root')
)
