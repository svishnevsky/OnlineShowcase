import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Router, hashHistory, Route, IndexRoute } from 'react-router'
import App from './containers/app/App.jsx'
import Home from './containers/home/Home.jsx'
import Login from './containers/auth/Login.jsx'
import Register from './containers/auth/Register.jsx'

render((
      <Router history={hashHistory}>
        <Route path='/' component={App}>
            <IndexRoute component={Home} />
            <Route path='login' component={Login} />
            <Route path='register' component={Register} />
        </Route>
      </Router>
    ), document.getElementById('container'));