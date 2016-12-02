import React, { Component } from 'react'
import Modal from 'react-modal'
import '../../utils/ModalStyles'
import CategoryActions from '../../actions/CategoryActions'
import CategoriesStore from '../../stores/CategoriesStore'
import { browserHistory } from 'react-router'
import BlockUi from 'react-block-ui'
import 'react-block-ui/style.css'
import Validation from 'react-validation';


function getSaved(){
    return CategoriesStore.getSaved();
}

export default class CategoryEdit extends Component {
    constructor() {
        super();

        this.save = this.save.bind(this);
        this._getState = this._getState.bind(this);
        this._onSaved = this._onSaved.bind(this);
        this._onLoaded = this._onLoaded.bind(this);
    }

    save() {
        const state = this.state;
        state.isLoading = true;
        this.setState(state);
        CategoryActions.saveCategory({
            parentId: this.state.parentId,
            id: this.state.id,
            name: this.form.components.name.state.value
        });
    }

    close() {
        browserHistory.goBack();
    }
    
    componentWillMount() {
        this.state = this._getState();

        CategoriesStore.addSavedListener(this._onSaved);
        CategoriesStore.addAllLoadedListener(this._onLoaded);
    }

    componentWillUnmount() {
        CategoriesStore.removeSavedListener(this._onSaved);
        CategoriesStore.removeAllLoadedListener(this._onLoaded);
    }

    handleSubmit(event){
        event.preventDefault();
        this.save();
    }

    render() {
        return (
            <Modal isOpen={true}><BlockUi tag='div' blocking={this.state.isLoading}>
                <h3>{this.state.id ? 'Update category' : 'Create new category'}</h3>
                <Validation.components.Form ref={c => { this.form = c }} onSubmit={this.handleSubmit.bind(this)}>
            <label htmlFor='name'>Name*</label>
            <Validation.components.Input type='text' id='name' value={this.state.name} placeholder='Type category name' name='name' validations={['required']} errorClassName='validation-error' />
            <div className='btn-group'>
<Validation.components.Button>Save</Validation.components.Button>
<a onClick={this.close} className='button'>Cancel</a>
                </div>
</Validation.components.Form>
</BlockUi>
</Modal>
        )
}

_getState() {
    const isNewChild = this.props.params.id && this.props.route.isNewChild;
    const category = !this.props.params.id || isNewChild ? null : CategoriesStore.getCategory(this.props.params.id);
    return {
        isLoading: this.props.params.id && !isNewChild && !category ? true : false,
        id: category ? category.id : null,
        parentId: isNewChild ? this.props.params.id : null,
        name: category ? category.name : ''
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

_onLoaded() {
    this.setState(this._getState());
}
}