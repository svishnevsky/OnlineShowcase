import React, { Component } from 'react'

export default class ProductImageView extends Component {
    render() {
        const image = this.props.image;
        const controller = this.props.controller;

        return (<div className='product-grid grid-view-left product-image'>
                     <span className='icon delete edit-element' onClick={(event) => {event.preventDefault(); controller.removeImage(image)}}></span>
                     <span className='edit-element set-primary' onClick={(event) => {event.preventDefault(); controller.setAsPrimaryImage(image)}}>Set as primary</span>
                     <img src={controller.buildImageUrl(image)} alt=''/>
                </div>);
    }
}