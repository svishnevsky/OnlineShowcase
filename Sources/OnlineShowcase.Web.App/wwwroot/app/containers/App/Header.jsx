import React, { Component } from 'react'
import { Link } from 'react-router'

export default class Header extends Component {
    render() {
        return  (
            <div className='header'>
                <div className='bottom-header'>
			<div className='container'>
				<div className='header-bottom-left'>
					<div className='logo'>
						<Link to='/'><img src='images/logo.png' alt='OnlineShowcase' /></Link>
					</div>
					<div className='clearfix'> </div>
				</div>
				<div className='header-bottom-right'>
						<div className='account'><a href='login.html'><span> </span>YOUR ACCOUNT</a></div>
							<ul className='login'>
								<li><Link to='login'><span> </span>LOGIN</Link></li> |
								<li><Link to='register'>SIGNUP</Link></li>
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