import React, { Component } from 'react'

export default class Login extends Component {
    render() {
        return  (
             <div className='account_grid'>
               <div className='login-right'>
                  <h3>REGISTERED CUSTOMERS</h3>
                <p>If you have an account with us, please log in.</p>
                <form>
                  <div>
                    <span>Email Address<label>*</label></span>
                    <input type='text' /> 
                  </div>
                  <div>
                    <span>Password<label>*</label></span>
                    <input type='text' /> 
                  </div>
                  <a className='forgot' href='#'>Forgot Your Password?</a>
                  <input type='submit' value='Login' />
                </form>
               </div>    
                <div className='login-left'>
                   <h3>NEW CUSTOMERS</h3>
                 <p>By creating an account with our store, you will be able to move through the checkout process faster, store multiple shipping addresses, view and track your orders in your account and more.</p>
                 <a className='acount-btn' href='register.html'>Create an Account</a>
               </div>
               <div className='clearfix'> </div>
             </div>
        )
    }
}