import React, { Component } from 'react'
import Modal from 'react-modal'
import CategoryActions from '../../actions/CategoryActions'
import CategoriesStore from '../../stores/CategoriesStore'
import { browserHistory } from 'react-router'
import BlockUi from 'react-block-ui'
import 'react-block-ui/style.css'

function getSavedState(){
    return CategoriesStore.getSaved();
}

export default class CategoryEdit extends Component {
    constructor() {
        super();
        this.save = this.save.bind(this);
        this.close = this.close.bind(this);
        this.updateName = this.updateName.bind(this);
        
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
            name: this.state.name
        });
    }

    close() {
        browserHistory.goBack();
    }

    updateName(e) {
        const state = this.state;
        state.name = e.target.value;
        this.setState(state);
    }

    componentWillMount() {
        CategoriesStore.addSavedListener(this._onSaved);
    }

    componentWillUnmount() {
        CategoriesStore.removeSavedListener(this._onSaved);
    }

    render() {
        return (
            <Modal isOpen={true}><BlockUi tag='div' blocking={this.state.isLoading}>
            <label htmlFor='name'>Name:</label>
    <input type='text' id='name' placeholder='Type category name' onChange={this.updateName} />
    <button onClick={this.save}>Save</button>
    <button onClick={this.close}>Cancel</button>
    </BlockUi>
    </Modal>
        )
            }

_onSaved(){
    const saved = getSavedState();
    const state = this.state;

    state.isLoading = false;

    if (saved.status == 400){
        state.errors = saved.data;
        console.log(state.errors);
    }

    this.setState(state);

    if (saved.status == 200 || saved.status == 201){
        this.close();
    }
}
}