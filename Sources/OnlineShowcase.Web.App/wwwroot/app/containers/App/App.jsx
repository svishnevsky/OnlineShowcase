import React, { Component } from 'react'
import Header from './Header.jsx'
import LeftMenu from './LeftMenu.jsx'

export default class App extends Component {
    render() {
        return  (
            <div>
              <Header />
              <div className='container'>
                  {this.props.children}
              <LeftMenu />
	<div className='clearfix'> </div>
        </div>
            </div>
        )
    }
}