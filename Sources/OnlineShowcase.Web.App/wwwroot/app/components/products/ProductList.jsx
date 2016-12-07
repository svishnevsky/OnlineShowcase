import React, { Component } from 'react'
import { Link } from 'react-router'
import ProductsStore from '../../stores/ProductsStore'
import ProductActions from '../../actions/ProductActions'
import ManageIcons from '../app/ManageIcons'

export default class ProductList extends Component {
    constructor() {
        super();

        this._getState = this._getState.bind(this);
        this._onFound = this._onFound.bind(this);

        this.state = {
            products:[]
        }
    }

    componentWillMount() {
        ProductsStore.addFoundListener(this._onFound);
        ProductActions.find(!this.props.params || !this.props.params.categoryId ? null
            : {
                categories: [this.props.params.categoryId]
            });
    }

    componentWillUnmount() {
        ProductsStore.removeFoundListener(this._onFound);
    }

    render() {
        return (<div className='women-product'>
                    <div className=' w_content'>
            <div className='women'>
                <a href='#'><h4>Enthecwear - <span>4449 itemms</span> </h4></a>
                <ul className='w_nav'>
                    <li>Sort : </li>
        <li><a className='active' href='#'>popular</a></li> |
        <li><a href='#'>new </a></li> |
        <li><a href='#'>discount</a></li> |
        <li><a href='#'>price: Low High </a></li>
    <div className='clearfix'> </div>
    </ul>
    <div className='clearfix'> </div>
</div>
</div>
<div className='grid-product'>
   <div className='product-grid edit-element'>
      <div className='content_box'>
         <Link to='products/new'>
               <img src='/images/plus.svg' className='img-responsive' alt='Add new product'/>
         </Link>
     </div>
  </div>

        {!this.state.products ? null :
            this.state.products.map(product => {
                return <div className='product-grid' key={product.id}>
                   <ManageIcons basePath={`products/${product.id}`}/>
                   <div className='content_box'>
                      <Link to={`products/${product.id}`}>
                         <div className='left-grid-view grid-view-left'>
                            <img src='images/pic2.jpg' className='img-responsive watch-right' alt=''/>
                        </div>
                      </Link>
                      <h4>{product.name}</h4>
                      <p>{product.summary}</p>
             </div>
          </div>
        })
        }
        <div className='clearfix'> </div>
      </div>
      </div>);
        }

    _getState() {
        return {
            products: ProductsStore.getFound()
        };
        }

    _onFound() {
        this.setState(this._getState());
        }
        }