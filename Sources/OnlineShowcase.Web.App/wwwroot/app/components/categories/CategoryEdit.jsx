import React, { Component } from 'react'
import Modal from 'react-modal'
import CategoryActions from '../../actions/CategoryActions'
import CategoriesStore from '../../stores/CategoriesStore'
import { browserHistory } from 'react-router'
import BlockUi from 'react-block-ui'
import 'react-block-ui/style.css'
import Validation from 'react-validation';


function getSavedState(){
    return CategoriesStore.getSaved();
}

export default class CategoryEdit extends Component {
    constructor() {
        super();
        this.save = this.save.bind(this);
        this.close = this.close.bind(this);

        this.state = {
            isLoading: false
        };

        this._onSaved = this._onSaved.bind(this);
    }

    save() {
        const state = this.state;
        state.isLoading = true;
        this.setState(state);

        CategoryActions.saveCategory({
            id: this.props.location.query.id,
            name: this.form.components.name.state.value
        });
    }

    close() {
        browserHistory.goBack();
    }
    
    componentWillMount() {
        CategoriesStore.addSavedListener(this._onSaved);
    }

    componentWillUnmount() {
        CategoriesStore.removeSavedListener(this._onSaved);
    }

    handleSubmit(event){
        event.preventDefault();
        this.save();
    }

    render() {
        return (
            <Modal isOpen={true}><BlockUi tag='div' blocking={this.state.isLoading}>
                <Validation.components.Form ref={c => { this.form = c }} onSubmit={this.handleSubmit.bind(this)}>
            <label htmlFor='name'>Name:</label>
            <Validation.components.Input type='text' id='name' value='' placeholder='Type category name' name='name' validations={['required']} errorClassName='validation-error' />
<Validation.components.Button>Save</Validation.components.Button>
<a onClick={this.close}>Cancel</a>
</Validation.components.Form>
</BlockUi>
</Modal>
        )
            }

_onSaved(){
    const saved = getSavedState();
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
}