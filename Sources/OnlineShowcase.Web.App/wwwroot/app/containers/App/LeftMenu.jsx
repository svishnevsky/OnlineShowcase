import React, { Component } from 'react'

export default class LeftMenu extends Component {
    render() {
        return  (
                        <div className='sub-cate'>
                <div className=' top-nav rsidebar span_1_of_left'>
                    <h3 className='cate'>CATEGORIES</h3>
          <ul className='menu'>
        <li className='item1'>
            <a href='#'>Curabitur sapien<img className='arrow-img' src='images/arrow1.png' alt='' /> </a>
            <ul className='cute'>
                <li className='subitem1'><a href='product.html'>Cute Kittens </a></li>
                <li className='subitem2'><a href='product.html'>Strange Stuff </a></li>
                <li className='subitem3'><a href='product.html'>Automatic Fails </a></li>
            </ul>
        </li>
        <li className='item2'>
            <a href='#'>Dignissim purus <img className='arrow-img ' src='images/arrow1.png' alt='' /></a>
            <ul className='cute'>
                <li className='subitem1'><a href='product.html'>Cute Kittens </a></li>
                <li className='subitem2'><a href='product.html'>Strange Stuff </a></li>
                <li className='subitem3'><a href='product.html'>Automatic Fails </a></li>
            </ul>
        </li>
        <li className='item3'>
            <a href='#'>Ultrices id du<img className='arrow-img img-arrow' src='images/arrow1.png' alt='' /> </a>
            <ul className='cute'>
                <li className='subitem1'><a href='product.html'>Cute Kittens </a></li>
                <li className='subitem2'><a href='product.html'>Strange Stuff </a></li>
                <li className='subitem3'><a href='product.html'>Automatic Fails</a></li>
            </ul>
        </li>
        <li className='item4'>
            <a href='#'>Cras iacaus rhone <img className='arrow-img img-left-arrow' src='images/arrow1.png' alt='' /></a>
            <ul className='cute'>
                <li className='subitem1'><a href='product.html'>Cute Kittens </a></li>
                <li className='subitem2'><a href='product.html'>Strange Stuff </a></li>
                <li className='subitem3'><a href='product.html'>Automatic Fails </a></li>
            </ul>
        </li>

          </ul>
                         <a className='view-all all-product' href='product.html'>VIEW ALL PRODUCTS<span> </span></a>
            </div>
            </div>
        )
    }
}