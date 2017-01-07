import React from 'react';
import Validation from 'react-validation'

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

Object.assign(Validation.rules, {
    required: {
        rule: value => {
            return value && value.toString().trim();
        },
        hint: () => {
            return <span className='form-error is-visible'>Required</span>
        }
    },
    email: {
        rule: value => {
            return emailRegex.test(value);
        },
        hint: () => {
            return <span className='form-error is-visible'>Incorrect email format</span>
        }
    },
api: {
    hint: value => (
        <button
            className='form-error is-visible'
        >
            API Error on '{value}' value. Focus to hide.
        </button>
    )
    }
});