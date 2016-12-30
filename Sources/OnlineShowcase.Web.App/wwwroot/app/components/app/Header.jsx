import React, { Component } from 'react'
import { Link } from 'react-router'
import UserStore from '../../stores/UserStore'

function getState() {
    return {
        user: UserStore.getUser(),
        isAuthenticated: UserStore.isAuthenticated()
    };
}

export default class Header extends Component {
    constructor() {
        super();

        this._onChange = this._onChange.bind(this);
        this.state = getState();
    }

    componentWillMount() {
        UserStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        UserStore.removeChangeListener(this._onChange);
    }

    render() {
        const { user } = this.state;

        return (
            <div className='header'>
                <div className='bottom-header'>
                    <div className='container'>
                        <div className='header-bottom-left'>
                            <div className='logo'>
                                <Link to='/'><img src='images/logo.png' alt='OnlineShowcase'/></Link>
                            </div>
                            <div className='links'>
                                <Link to='/aboutus'>About Us</Link>
                                <Link to='/contactus'>Contact Us</Link>
                            </div>
                            <div className='clearfix'> </div>
                        </div>

                        <div className='header-bottom-right'>
                            <div className='account'><a><span> </span>{this.state.isAuthenticated ? user.name : 'Guest' }</a>
                            </div>

                            <ul className='login'>
                                { !this.state.isAuthenticated ? <li><Link to='/login'><span> </span>Login or Sign Up</Link></li> : null }
                                { this.state.isAuthenticated ? <li><Link to='/logout'><span> </span>Sign Out</Link></li> : null }
                            </ul>
                            <div className='clearfix'> </div>
                        </div>
                        <div className='clearfix'> </div>
                    </div>
                </div>
            </div>
        )
    }

    _onChange() {
        this.setState(getState());
    }
}