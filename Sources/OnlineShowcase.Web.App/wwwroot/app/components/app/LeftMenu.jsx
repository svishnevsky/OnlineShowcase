import React, { Component } from 'react'
import CategoryList from '../categories/CategoryList'

export default class LeftMenu extends Component {
    render() {
        return (
            <div className='sub-cate'>
                <div className=' top-nav rsidebar span_1_of_left'>
                    <h3 className='cate'>CATEGORIES</h3>
                    <CategoryList/>
                </div>
            </div>
        )
    }
}