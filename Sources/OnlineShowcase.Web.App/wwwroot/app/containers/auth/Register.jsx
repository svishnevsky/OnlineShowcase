import React, { Component } from 'react'

export default class Register extends Component {
    render() {
        return  (
        <div className='register'>
                <form> 
                 <div className='register-top-grid'>
                    <h3>PERSONAL INFORMATION</h3>
                    <div className='mation'>
                        <span>First Name<label>*</label></span>
                        <input type='text' /> 
                    
                        <span>Last Name<label>*</label></span>
                        <input type='text' /> 
                     
                         <span>Email Address<label>*</label></span>
                         <input type='text' /> 
                    </div>
                     <div className='clearfix'> </div>
                       <a className='news-letter' href='#'>
                         <label className='checkbox'><input type='checkbox' name='checkbox' checked='' /><i> </i>Sign Up</label>
                       </a>
                     </div>
                     <div className='register-bottom-grid'>
                            <h3>LOGIN INFORMATION</h3>
                            <div className='mation'>
                                <span>Password<label>*</label></span>
                                <input type='text' />
                                <span>Confirm Password<label>*</label></span>
                                <input type='text' />
                            </div>
                     </div>
                </form>
                <div className='clearfix'> </div>
                <div className='register-but'>
                   <form>
                       <input type='submit' value='submit' />
                       <div className='clearfix'> </div>
                   </form>
                </div>
           </div>
        )
    }
}