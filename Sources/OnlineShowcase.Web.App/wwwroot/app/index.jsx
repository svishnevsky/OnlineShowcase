﻿import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Router, hashHistory, Route, IndexRoute } from 'react-router'
import App from './components/app/App.jsx'
import Login from './components/auth/Login.jsx'
import Logout from './components/auth/Logout.jsx'
import CategoryEdit from './components/categories/CategoryEdit.jsx'
import CategoryDelete from './components/categories/CategoryDelete.jsx'
import ProductList from './components/products/ProductList.jsx'
import ProductEdit from './components/products/ProductEdit.jsx'
import ProductDelete from './components/products/ProductDelete.jsx'
import ProductView from './components/products/ProductView.jsx'
import AuthService from './utils/AuthService';
import UserStore from './stores/UserStore';
import './utils/ValidationRules'

const auth = new AuthService('27SWqPeKuUfca8sdmhywNLGmHDYjlTmL', 'vishnevsky.eu.auth0.com');

const requireContentManager = (nextState, replace) => {
    if (!UserStore.isContentEditor()) {
        replace({ pathname: '/login' });
    }
}

render((
    <Router history={hashHistory}>
        <Route path='/' component={App}>
            <IndexRoute component={ProductList} />
            <Route path='login' component={Login} auth={auth} />
            <Route path='logout' component={Logout} />
            <Route path='access_token=:token' component={ProductList} />
            <Route path='categories'>
                <Route path='new' component={CategoryEdit} onEnter={requireContentManager} />
                <Route path=':id'>
                    <IndexRoute component={ProductList} />
                    <Route path='new' component={CategoryEdit} isNewChild={true} onEnter={requireContentManager} />
                    <Route path='edit' component={CategoryEdit} onEnter={requireContentManager} />
                    <Route path='delete' component={CategoryDelete} onEnter={requireContentManager} />
                </Route>
            </Route>
            <Route path='products'>
                <Route path='new' component={ProductEdit} onEnter={requireContentManager} />
                <Route path=':id'>
                    <IndexRoute component={ProductView} />
                    <Route path='edit' component={ProductEdit} onEnter={requireContentManager} />
                    <Route path='delete' component={ProductDelete} onEnter={requireContentManager} />
                </Route>
            </Route>
        </Route>
      </Router>
), document.getElementById('container'));