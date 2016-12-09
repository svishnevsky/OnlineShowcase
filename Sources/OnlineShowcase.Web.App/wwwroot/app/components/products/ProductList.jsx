import React, { Component } from 'react'
import { Link } from 'react-router'
import ProductsStore from '../../stores/ProductsStore'
import CategoriesStore from '../../stores/CategoriesStore'
import ProductActions from '../../actions/ProductActions'
import ManageIcons from '../app/ManageIcons'

export default class ProductList extends Component {
    constructor() {
        super();
        this._getState = this._getState.bind(this);
        this._onFound = this._onFound.bind(this);
        this._changeCategory = this._changeCategory.bind(this);

        this.state = this._getState();
    }

    componentWillMount() {
        ProductsStore.addFoundListener(this._onFound);
        CategoriesStore.addAllLoadedListener(this._changeCategory);
    }

    componentWillReceiveProps(props) {
        this._changeCategory(props);
    }

    componentWillUnmount() {
        ProductsStore.removeFoundListener(this._onFound);
        CategoriesStore.removeAllLoadedListener(this._changeCategory);
    }

    render() {
        return (<div className='women-product'>
                    <div className=' w_content'>
            <div className='women'>
                <h4>{!this.state.category ? null : `${this.state.category.name} -`}<span>{!this.state.count ? null : `${this.state.count} items`}</span> </h4>
                <ul className='w_nav'>
                    <li>Sort : </li>
        <li><a className='active' href='#'>popular</a></li> |
        <li><a href='#'>new </a></li>
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
            products: ProductsStore.getFound(),
            filter: ProductsStore.getLatestFilter()
        };
        }

    _onFound() {
        this.setState(this._getState());
        }

    _changeCategory(props = this.props) {
        const state = this.state;

        const categoryId = !props.params || !props.params.categoryId ? null : props.params.categoryId;
        
        if (categoryId) {
            const category = CategoriesStore.getCategory(categoryId);
            state.category = category;
            if (!category) {
                return;
            }

            const categories = [categoryId];

            for (let child of category.children) {
                categories.push(child.id);
        }
            state.filter.categories = categories;
        } else {
            state.filter.category = null;
            state.filter.categories = null;
        }

        ProductActions.find(state.filter);

        this.setState(state);
        }
        }