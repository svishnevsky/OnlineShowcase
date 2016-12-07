import React, { Component } from 'react'
import ProductActions from '../../actions/ProductActions'
import ProductsStore from '../../stores/ProductsStore'
import CategoriesStore from '../../stores/CategoriesStore'
import { browserHistory, Link } from 'react-router'
import BlockUi from 'react-block-ui'
import 'react-block-ui/style.css'
import Validation from 'react-validation';

function getSaved(){
    return ProductsStore.getSaved();
}

export default class ProductView extends Component {
    constructor() {
        super();

        this.save = this.save.bind(this);
        this.selectCategoryChanged = this.selectCategoryChanged.bind(this);
        this.removeCategory = this.removeCategory.bind(this);
        this.addCategory = this.addCategory.bind(this);
        this._getState = this._getState.bind(this);
        this._onSaved = this._onSaved.bind(this);
        this._onGot = this._onGot.bind(this);
    }

    save() {
        const state = this.state;
        state.isLoading = true;
        this.setState(state);
        ProductActions.save({
            id: this.state.id,
            name: this.form.components.name.state.value,
            description: this.form.components.description.state.value,
            categories: this.state.categories
        });
    }

    close() {
        browserHistory.goBack();
    }

    componentWillMount() {
        this.state = this._getState();

        ProductsStore.addSavedListener(this._onSaved);
        ProductsStore.addGotListener(this._onGot);
        CategoriesStore.addAllLoadedListener(this._onGot);

        if (this.props.params.productId){
            ProductActions.get(this.props.params.productId);
        }
    }

    componentWillUnmount() {
        ProductsStore.removeSavedListener(this._onSaved);
        ProductsStore.removeGotListener(this._onGot);
        CategoriesStore.removeAllLoadedListener(this._onGot);
    }

    handleSubmit(event){
        event.preventDefault();
        this.save();
    }

    addCategory(event){
        event.preventDefault();

        if (!this.state.selectedCategoryId){
            return;
        }

        var category = this.state.notAddedCategories.find(c => c.id == this.state.selectedCategoryId);

        const state = this.state;
        this.state.notAddedCategories.splice(this.state.notAddedCategories.indexOf(category), 1);
        this.state.categories.push(category);
        this.setState(state);
    }

    removeCategory(category){
        const state = this.state;

        this.state.categories.splice(this.state.categories.indexOf(category), 1);
        this.state.notAddedCategories.push(category);

        this.setState(state);
    }

    selectCategoryChanged(event){
        const id = event.target.value;
        const state = this.state;
        this.state.selectedCategoryId = id;
        this.setState(state);
    }

    render() {
        const paragraphs = this.state.description.split(/\r?\n+/);

        return (
                <BlockUi tag='div' blocking={this.state.isLoading} className='single_top'>
                    <Validation.components.Form ref={c => { this.form = c }} onSubmit={this.handleSubmit.bind(this)}>
                        <div className='single_grid'>

                            <div className='grid images_3_of_2'>
                                <img src='images/pic2.jpg' className='img-responsive watch-right' alt=''/>
                                <div className='clearfix'> </div>
                            </div>

                            <div className='desc1 span_3_of_2'>
                                <h4 className='view-element'>{this.state.name}</h4>
                                <Validation.components.Input type='text' className='edit-element' id='name' value={this.state.name} placeholder='Type product name' name='name' validations={['required']} errorClassName='validation-error' />
                                <h6>{this.state.viewCount} views.</h6>
                            </div>

                            <div className='desc1 span_3_of_2'>
                                {!this.state.categories ? null : this.state.categories.map(c => {
                                    return <Link to={`categories/${c.id}`} className='category' key={c.id}>{c.name}
                                                <span className='icon delete edit-element' onClick={(event) => {event.preventDefault(); this.removeCategory(c)}}></span>
                                            </Link>
                                    })
                                    }

                                <div className='edit-element'>
                                    <select onChange={this.selectCategoryChanged}>
                                        <option>Select category</option>
                                    {!this.state.notAddedCategories ? null : this.state.notAddedCategories.map(c => {
                                            return <option key={c.id} value={c.id}>{c.name}</option>
                                    })}
                                    </select>
                                    <button onClick={this.addCategory}>add</button>
                                </div>
                            </div>
                        <div className='clearfix'> </div>
                        </div>

                        <div className='toogle'>
                            <h3 className='m_3'>Product Details</h3>
                                    {paragraphs.map((p, i) => {
                                    return <p className='m_text view-element' key={i}>{p}</p>
                                    })}

                            <Validation.components.Textarea className='edit-element' id='description' value={this.state.description} placeholder='Type description' name='description' validations={['required']} errorClassName='validation-error' />
                        </div>

                        <div className='btn-group edit-element'>
                            <Validation.components.Button>Save</Validation.components.Button>
                            <a onClick={this.close} className='button'>Cancel</a>
                        </div>
                    </Validation.components.Form>
                </BlockUi>
            );
                                    }

_getState() {
    const product = !this.props.params.productId ? null : ProductsStore.getGot();

    let notAddedCategories = null;
    const categoryMap = CategoriesStore.getCategoryMap();
    if (!this.props.params.productId){
        notAddedCategories = categoryMap ? Object.keys(categoryMap).map(key => categoryMap[key]) : null;
                                    } else if (product && product.categories && categoryMap){
        notAddedCategories = new Array();
        for (let id in categoryMap){
            if (!product.categories.find(pc => { return id == pc.id; }))
                                    {
                notAddedCategories.push(categoryMap[id]);
                                    }
                                    }
                                    }

    return {
                                        isLoading: this.props.params.productId && !product ? true : false,
                                        id: this.props.params.productId,
                                        name: product ? product.name : '',
                                        description: product ? product.description : '',
                                        viewCount: product ? product.viewCount : 0,
                                        categories: product ? product.categories : [],
                                        notAddedCategories: notAddedCategories
                                    };
                                    }

_onSaved(){
    const saved = getSaved();
    const state = this.state;
    state.isLoading = false;
    this.setState(state);

    if (saved.status == 400){
        for(let name in saved.data){
            this.form.showError(name, saved.data[name][0]);
                                    }
                                    }

    if (saved.status == 200 || saved.status == 201 || saved.status == 204){
        this.close();
                                    }
                                    }

_onGot() {
    this.setState(this._getState());
                                    }
                                    }