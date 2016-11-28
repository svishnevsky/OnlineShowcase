import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Router, hashHistory, Route, IndexRoute } from 'react-router'
import App from './components/app/App.jsx'
import Home from './components/home/Home.jsx'
import Login from './components/auth/Login.jsx'
import Logout from './components/auth/Logout.jsx'
import CategoryEdit from './components/categories/CategoryEdit.jsx'
import AuthService from './utils/AuthService';
import UserStore from './stores/UserStore';
import './utils/ValidationRules'

const auth = new AuthService('27SWqPeKuUfca8sdmhywNLGmHDYjlTmL', 'vishnevsky.eu.auth0.com');

const requireAuth = (nextState, replace) => {
    if (!UserStore.isAuthenticated()) {
        replace({ pathname: '/login' });
    }
}

render((
      <Router history={hashHistory}>
        <Route path='/' component={App}>
            <IndexRoute component={Home} />
            <Route path='login' component={Login} auth={auth} />
            <Route path='logout' component={Logout} />
            <Route path='access_token=:token' component={Home} />
            <Route path='categories'>
                <Route path='new' component={CategoryEdit} onEnter={requireAuth} />
            </Route>
        </Route>
      </Router>
    ), document.getElementById('container'));