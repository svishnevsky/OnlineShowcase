import React from 'react';
import Validation from 'react-validation'

Object.assign(Validation.rules, {
    required: {
        rule: value => {
            return value && value.toString().trim();
        },
        hint: () => {
            return <span className='form-error is-visible'>Required</span>
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