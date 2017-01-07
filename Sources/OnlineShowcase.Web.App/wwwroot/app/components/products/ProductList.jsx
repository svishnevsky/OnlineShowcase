import React, { Component } from 'react'
import { Link } from 'react-router'
import ProductsStore from '../../stores/ProductsStore'
import CategoriesStore from '../../stores/CategoriesStore'
import ProductActions from '../../actions/ProductActions'
import InfiniteScroll from 'react-infinite-scroll-component'
import BlockUi from 'react-block-ui'
import ProductListHeaderView from './ProductListHeaderView'
import ProductListItemView from './ProductListItemView'

export default class ProductList extends Component {
    constructor() {
        super();
        this.updateState = this.updateState.bind(this);
        this.updateProps = this.updateProps.bind(this);
        this.loadMore = this.loadMore.bind(this);

        this.state = {
            model: {
                sorts: ProductsStore.getAvailableSorts()
            }
        };
    }

    componentWillMount() {
        ProductsStore.addFoundListener(this.updateState);
        CategoriesStore.addAllLoadedListener(this.updateProps);

        this.updateState();
    }

    componentWillReceiveProps(props) {
        this.updateProps(props);
    }

    componentWillUnmount() {
        ProductsStore.removeFoundListener(this.updateState);
        CategoriesStore.removeAllLoadedListener(this.updateProps);
    }

    render() {
        return (<div className='women-product'>
                    <ProductListHeaderView model={this.state.model}/>
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
    hasMore={this.state.model.hasMore}
    style={{overflow:'inherit'}}
    loader={<div className='product-grid'><BlockUi tag='div' blocking={true}/><div className='clearfix'></div></div>}>
    {this.state.model.products}
  </InfiniteScroll>
    <div className='clearfix'> </div>
  </div>
  </div>);
}

loadMore() {
    const filter = this.state.model.filter;
    filter.skip += filter.take;
    ProductActions.find(filter);
}

updateState() {
    const found = ProductsStore.getFound();

    const state = this.state;
    state.model.filter = found ? found.filter : ProductsStore.getDefaultFilter();
    state.model.products = !found ? [] : found.filter.skip === 0 ? found.products.map(p => <ProductListItemView product={p} key={p.id}/>) : this.state.model.products.concat(found.products.map(p => <ProductListItemView product={p} key={p.id}/>));
    state.model.hasMore = !found || found.products.length === found.filter.take;
    state.model.location = this.props.location;

    this.setState(state);
}

updateProps(props = this.props) {
    const state = this.state;

    const categoryId = !props.params || !props.params.categoryId ? null : props.params.categoryId;

    if (categoryId) {
        const category = CategoriesStore.getCategory(categoryId);
        state.model.category = category;
        if (!category) {
            return;
               }

        const categories = [categoryId];

        for (let child of category.children) {
            categories.push(child.id);
               }
        state.model.filter.categories = categories;
               } else {
        state.model.category = null;
        state.model.filter.categories = null;
               }

    if (props.location.query.sort) {
        state.model.filter.sort = props.location.query.sort;
               }

    state.model.filter.skip = 0;

    ProductActions.find(state.model.filter);

    this.setState(state);
               }
               }