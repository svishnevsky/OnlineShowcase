import React, { Component } from 'react'
import { Link } from 'react-router'

export default class ProductListHeaderView extends Component {
    renderSortItem(sortName) {
        const model = this.props.model;
        return <li key={sortName}>{!model.filter || model.filter.sort === sortName ? <span>{sortName}</span> : <Link to={model.location.pathname} query={Object.assign({}, model.location.query, {'sort': sortName})}>{sortName}</Link>}</li>
    }

    render() {
        const model = this.props.model;
        return (<div className='w_content'>
                  <div className='women'>
                      <h4>{!model.category ? null : model.category.name}</h4>
                      <ul className='w_nav'>
                         <li>Sort : </li>
                         {model.sorts.map(s => this.renderSortItem(s))}
                      </ul>
                      <div className='clearfix'> </div>
                    </div>
                </div>);
    }
}