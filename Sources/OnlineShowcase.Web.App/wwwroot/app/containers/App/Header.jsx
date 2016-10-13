import React, { Component } from 'react'

export default class Header extends Component {
    render() {
        return  (
            <div className='header'>
                <div className='bottom-header'>
			<div className='container'>
				<div className='header-bottom-left'>
					<div className='logo'>
						<a href='index.html'><img src='images/logo.png' alt='OnlineShowcase' /></a>
					</div>
					<div className='clearfix'> </div>
				</div>
				<div className='header-bottom-right'>
						<div className='account'><a href='login.html'><span> </span>YOUR ACCOUNT</a></div>
							<ul className='login'>
								<li><a href='login.html'><span> </span>LOGIN</a></li> |
								<li><a href='register.html'>SIGNUP</a></li>
							</ul>
						<div className='cart'><a href='#'><span> </span>CART</a></div>
					<div className='clearfix'> </div>
				</div>
				<div className='clearfix'> </div>
			</div>
                </div>
                </div>
        )
    }
}