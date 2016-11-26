import React, { Component } from 'react'
import { Link } from 'react-router'
import UserStore from '../../stores/UserStore'

function getState() {
    return {
        isEditMode: UserStore.isContentEditor()
    };
}

export default class CategoryList extends Component {
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
        return (
            <ul className='menu'>
                <li className='item1'>
                    <a href='#'>Curabitur sapien<img className='arrow-img' src='images/arrow1.png' alt=''/> </a
                    >
                    <ul className='cute'>
                        <li className='subitem1'><a href='product.html'>Cute Kittens </a></li>
                        <li className='subitem2'><a href='product.html'>Strange Stuff </a></li>
                        <li className='subitem3'><a href='product.html'>Automatic Fails </a></li>
                    </ul>
                </li>
                <li className='item2'>
                    <a href='#'>Dignissim purus <img className='arrow-img ' src='images/arrow1.png' alt=''/></a
                    >
                    <ul className='cute'>
                        <li className='subitem1'><a href='product.html'>Cute Kittens </a></li>
                        <li className='subitem2'><a href='product.html'>Strange Stuff </a></li>
                        <li className='subitem3'><a href='product.html'>Automatic Fails </a></li>
                    </ul>
                </li>
                <li className='item3'>
                    <a href='#'>Ultrices id du<img className='arrow-img img-arrow' src='images/arrow1.png' alt=
                                                   ''/> </a>
                    <ul className='cute'>
                        <li className='subitem1'><a href='product.html'>Cute Kittens </a></li>
                        <li className='subitem2'><a href='product.html'>Strange Stuff </a></li>
                        <li className='subitem3'><a href='product.html'>Automatic Fails</a></li>
                    </ul>
                </li>
                <li className='item4'>
                    <a href='#'>Cras iacaus rhone <img className='arrow-img img-left-arrow' src=
                                                       'images/arrow1.png' alt=''/></
                    a>
                    <ul className='cute'>
                        <li className='subitem1'><a href='product.html'>Cute Kittens </a></li>
                        <li className='subitem2'><a href='product.html'>Strange Stuff </a></li>
                        <li className='subitem3'><a href='product.html'>Automatic Fails </a></li>
                    </ul>
                </li>
                { this.state.isEditMode ? <li><Link to='categories/new'>Add category</Link></li> : null }

            </ul>
        )
    }

    _onChange() {
        this.setState(getState());
    }
}