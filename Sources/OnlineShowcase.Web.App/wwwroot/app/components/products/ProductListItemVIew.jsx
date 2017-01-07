import React, { Component } from 'react'
import ManageIcons from '../app/ManageIcons'
import { Link } from 'react-router'
import UrlBuilder from '../../utils/UrlBuilder'

export default class ProductListItemView extends Component {
    render() {
        const product = this.props.product;

        return (<div className='product-grid'>
               <ManageIcons basePath={`products/${product.id}`}/>
               <div className='content_box'>
                  <Link to={`products/${product.id}`}>
                     <div className='left-grid-view grid-view-left'>
                        <img src={UrlBuilder.buildFileUrl(product.imageId)} alt=''/>
                    </div>
                  </Link>
                  <h4>{product.name}</h4>
                  <p>{product.summary}</p>
         </div>
      </div>
            );
}
}