import React, { Component } from 'react'
import Modal from 'react-modal'
import CategoryActions from '../../actions/CategoryActions'
import CategoriesStore from '../../stores/CategoriesStore'
import { browserHistory } from 'react-router'
import BlockUi from 'react-block-ui'
import Validation from 'react-validation';


function getSaved(){
    return CategoriesStore.getSaved();
}

export default class CategoryEdit extends Component {
    constructor() {
        super();

        this.save = this.save.bind(this);
        this.getState = this.getState.bind(this);
        this.onSaved = this.onSaved.bind(this);
        this.onLoaded = this.onLoaded.bind(this);
    }

    save() {
        const state = this.state;
        state.isLoading = true;
        this.setState(state);

        CategoryActions.save({
            parentId: this.state.parentId,
            id: this.state.id,
            name: this.form.components.name.state.value
        });
    }

    close() {
        browserHistory.goBack();
    }
    
    componentWillMount() {
        this.state = this.getState();

        CategoriesStore.addSavedListener(this.onSaved);
        CategoriesStore.addAllLoadedListener(this.onLoaded);
    }

    componentWillUnmount() {
        CategoriesStore.removeSavedListener(this.onSaved);
        CategoriesStore.removeAllLoadedListener(this.onLoaded);
    }

    handleSubmit(event){
        event.preventDefault();
        this.save();
    }

    render() {
        return (
            <Modal isOpen={true} contentLabel={''}><BlockUi tag='div' blocking={this.state.isLoading}>
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

getState() {
    const isNewChild = this.props.params.categoryId && this.props.route.isNewChild;
    const category = !this.props.params.categoryId || isNewChild ? null : CategoriesStore.getCategory(this.props.params.categoryId);
    return {
        isLoading: this.props.params.categoryId && !isNewChild && !category ? true : false,
        id: category ? category.id : null,
        parentId: isNewChild ? this.props.params.categoryId : category ? category.parentId : null,
        name: category ? category.name : ''
    };   
}

onSaved(){
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

onLoaded() {
    this.setState(this.getState());
}
}