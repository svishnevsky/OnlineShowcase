import React, { Component } from 'react'
import ProductActions from '../../actions/ProductActions'
import ProductsStore from '../../stores/ProductsStore'
import { browserHistory } from 'react-router'
import BlockUi from 'react-block-ui'
import 'react-block-ui/style.css'
import Validation from 'react-validation';

function getSaved(){
    return ProductsStore.getSaved();
}

export default class ProductEdit extends Component {
    constructor() {
        super();

        this.save = this.save.bind(this);
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
            description: this.form.components.description.state.value
        });
    }

    close() {
        browserHistory.goBack();
    }

    componentWillMount() {
        this.state = this._getState();

        ProductsStore.addSavedListener(this._onSaved);
        ProductsStore.addGotListener(this._onGot);

        if (this.props.params.id){
            ProductActions.get(this.props.params.id);
        }
    }

    componentWillUnmount() {
        ProductsStore.removeSavedListener(this._onSaved);
        ProductsStore.removeGotListener(this._onGot);
    }

    handleSubmit(event){
        event.preventDefault();
        this.save();
    }

    render() {
        return (
                <BlockUi tag='div' blocking={this.state.isLoading} className='single_top'>
                    <div className='single_grid'>
                <h3>{this.state.id ? 'Update product' : 'Create new product'}</h3>
                <Validation.components.Form ref={c => { this.form = c }} onSubmit={this.handleSubmit.bind(this)}>
            <label htmlFor='name'>Name*</label>
            <Validation.components.Input type='text' id='name' value={this.state.name} placeholder='Type product name' name='name' validations={['required']} errorClassName='validation-error' />
            <label htmlFor='description'>Description*</label>
            <Validation.components.Input type='textarea' id='description' value={this.state.description} placeholder='Type description' name='description' validations={['required']} errorClassName='validation-error' />
            <div className='btn-group'>
<Validation.components.Button>Save</Validation.components.Button>
<a onClick={this.close} className='button'>Cancel</a>
                </div>
</Validation.components.Form>
                        </div>
                        <div className='toogle'></div>
</BlockUi>
            );
}

_getState() {
    const product = !this.props.params.id ? null : ProductsStore.getGot();
    return {
        isLoading: this.props.params.id && !product ? true : false,
        id: this.props.params.id,
        name: product ? product.name : '',
        description: product ? product.description : ''
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

    if (saved.status == 200 || saved.status == 201){
        this.close();
    }
}

_onGot() {
    this.setState(this._getState());
}
}