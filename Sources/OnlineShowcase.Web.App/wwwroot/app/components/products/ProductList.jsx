import React, { Component } from 'react'
import { Link } from 'react-router'
import ProductsStore from '../../stores/ProductsStore'
import CategoriesStore from '../../stores/CategoriesStore'
import ProductActions from '../../actions/ProductActions'
import ManageIcons from '../app/ManageIcons'
import InfiniteScroll from 'react-infinite-scroll-component'
import BlockUi from 'react-block-ui'
import UrlBuilder from '../../utils/UrlBuilder'

export default class ProductList extends Component {
    constructor() {
        super();
        this._getState = this._getState.bind(this);
        this._onFound = this._onFound.bind(this);
        this._updateProps = this._updateProps.bind(this);
        this.loadMore = this.loadMore.bind(this);

        this.state = {};
    }

    componentWillMount() {
        ProductsStore.addFoundListener(this._onFound);
        CategoriesStore.addAllLoadedListener(this._updateProps);

        this.setState(this._getState());
    }

    componentWillReceiveProps(props) {
        this._updateProps(props);
    }

    componentWillUnmount() {
        ProductsStore.removeFoundListener(this._onFound);
        CategoriesStore.removeAllLoadedListener(this._updateProps);
    }

    render() {
        return (<div className='women-product'>
                    <div className=' w_content'>
            <div className='women'>
                <h4>{!this.state.category ? null : this.state.category.name}</h4>
                <ul className='w_nav'>
                    <li>Sort : </li>
    {this.props.sorts.map(s => {
        return <li key={s}>{!this.state.filter || this.state.filter.sort === s ? <span>{s}</span> : <Link to={this.props.location.pathname} query={Object.assign({}, this.props.location.query, {'sort': s})}>{s}</Link>}</li>
    })}

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

<InfiniteScroll
    next={this.loadMore}
    endMessage={<span/>}
    hasMore={this.state.hasMore}
    style={{overflow:'inherit'}}
    loader={<div className='product-grid'><BlockUi tag='div' blocking={true}/><div className='clearfix'></div></div>}>
    {this.state.products}
  </InfiniteScroll>
    <div className='clearfix'> </div>
  </div>
  </div>);
}

loadMore() {
    const filter = this.state.filter;
    filter.skip += filter.take;
    ProductActions.find(filter);
}

_getState() {
    const found = ProductsStore.getFound();
    return Object.assign({}, this.state, {
        filter: found ? found.filter : ProductsStore.getDefaultFilter(),
        products: !found ? [] : found.filter.skip === 0 ? found.products.map(this._renderProduct) : this.state.products.concat(found.products.map(this._renderProduct)),
        hasMore: !found || found.products.length === found.filter.take
    });
}

               _renderProduct(product) {
                   return <div className='product-grid' key={product.id}>
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
               }

_onFound() {
    this.setState(this._getState());
}

_updateProps(props = this.props) {
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
        state.category = null;
        state.filter.categories = null;
               }

    if (props.location.query.sort) {
        state.filter.sort = props.location.query.sort;
               }

    state.filter.skip = 0;

    ProductActions.find(state.filter);

    this.setState(state);
               }
               }

ProductList.defaultProps = {
                   sorts : ProductsStore.getAvailableSorts()
               }