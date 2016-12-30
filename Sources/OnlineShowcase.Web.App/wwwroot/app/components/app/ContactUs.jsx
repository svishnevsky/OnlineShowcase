import React, { Component } from 'react'
import Validation from 'react-validation';
import NotificationsActions from '../../actions/NotificationActions'

export default class ContactUs extends Component
{
    constructor () {
        super();

        this.state = {};
    }

    handleSubmit(event) {
        event.preventDefault();
        NotificationsActions.add({
            name: this.form.components.name.state.value,
            email: this.form.components.email.state.value,
            message: this.form.components.message.state.value,
            type: 'contact-us'
        });

        const state = this.state;
        state.isSent = true;
        this.setState(state);
    }

    render() {
        return (
         <div className='main'>
            <div className='reservation_top'>
                   <div className='contact_right'>
                       <h3>Contact Form</h3>
                       <div className='contact-form'>
                           {!this.state.isSent ?
                          <Validation.components.Form ref={c => { this.form = c }} onSubmit={this.handleSubmit.bind(this)}>
                              <Validation.components.Input type='text' className='textbox' id='name' value='' placeholder='Type your name' name='name' validations={['required']} errorClassName='validation-error' />
                              <Validation.components.Input type='text' className='textbox' id='email' value='' placeholder='Type your email' name='email' validations={['required', 'email']} errorClassName='validation-error' />
                              <Validation.components.Textarea className='edit-element' id='message' value='' placeholder='Type message' name='message' validations={['required']} errorClassName='validation-error' />
                              
                              <Validation.components.Button>Send</Validation.components.Button>
                              <div className='clearfix'> </div>
                          </Validation.components.Form>
                          : <p>Thanks for yor massege!</p>}
                       </div>
                   </div>
            </div>
         </div>
        )
    }
}