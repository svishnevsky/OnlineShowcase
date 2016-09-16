import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Router, hashHistory} from 'react-router'


var destination = document.querySelector('#container');

render((
      <Router history={hashHistory}>
        
      </Router>
    ), destination);