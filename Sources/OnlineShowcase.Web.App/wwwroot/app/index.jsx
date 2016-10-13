import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Router, hashHistory, Route, IndexRoute } from 'react-router'
import App from './containers/app/App.jsx'
import Home from './containers/Home/Home.jsx'

render((
      <Router history={hashHistory}>
        <Route path='/' component={App}>
            <IndexRoute component={Home} />
        </Route>
      </Router>
    ), document.getElementById('container'));