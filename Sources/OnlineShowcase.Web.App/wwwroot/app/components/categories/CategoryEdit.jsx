import React, { Component } from 'react'
import Modal from 'react-modal'
import CategoryActions from '../../actions/CategoryActions'
import CategoriesStore from '../../stores/CategoriesStore'
import { browserHistory } from 'react-router'

function getState(){
    return {
        id: null,
        name: null
    };
}

export default class CategoryEdit extends Component {
    constructor() {
        super();
        this.save = this.save.bind(this);
        this.close = this.close.bind(this);
        this.updateName = this.updateName.bind(this);

        this.state = getState();

        this._onChange = this._onChange.bind(this);
    }

save() {
    CategoryActions.saveCategory({
        id: this.state.id,
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
    CategoriesStore.addSaveListener(this._onChange);
}

componentWillUnmount() {
    CategoriesStore.removeSaveListener(this._onChange);
}

    render() {
        return (
            <Modal isOpen={true}>
            <label htmlFor='name'>Name:</label>
            <input type='text' id='name' placeholder='Type category name' onChange={this.updateName} />
            <button onClick={this.save}>Save</button>
            <button onClick={this.close}>Cancel</button>
            </Modal>
        )
            }

_onChange(){

}
}