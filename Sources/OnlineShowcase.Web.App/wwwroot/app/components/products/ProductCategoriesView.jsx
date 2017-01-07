import React, { Component } from 'react'
import { Link } from 'react-router'

export default class ProductCategoriesView extends Component {
    constructor() {
        super();

        this.state = {};
    }

    addCategory(event) {
        event.preventDefault();
        this.props.controller.addCategory(this.state.selectedCategoryId);
    }

    selectedCategoryChanged(event) {
        const id = event.target.value;
        const state = this.state;
        this.state.selectedCategoryId = id;
        this.setState(state);
    }

    render() {
        const controller = this.props.controller;

        return (<div className='desc1 span_3_of_2'>
                   {
                       !this.props.model.categories
                            ? null
                       : this.props.model.categories.map(category =>
                                <Link to={`categories/${category.id}`} className='category' key={category.id}>{category.name}
                                   <span className='icon delete edit-element' onClick={(event) => { event.preventDefault(); controller.removeCategory(category) }}></span>
                               </Link>
                            )
                    }

                   <div className='edit-element'>
                       <select onChange={this.selectedCategoryChanged.bind(this)}>
                           <option>Select category</option>
                           {!this.props.model.notAddedCategories ? null : this.props.model.notAddedCategories.map(c => {return <option key={c.id} value={c.id}>{c.name}</option>})}
                       </select>
                       <button onClick={this.addCategory.bind(this)}>add</button>
                   </div>
               </div>);
    }
}