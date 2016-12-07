import React, { Component } from 'react'
import Modal from 'react-modal'
import '../../utils/ModalStyles'
import CategoryActions from '../../actions/CategoryActions'
import CategoriesStore from '../../stores/CategoriesStore'
import { browserHistory } from 'react-router'
import BlockUi from 'react-block-ui'
import 'react-block-ui/style.css'

export default class CategoryDelete extends Component {
    constructor() {
        super();

        this.delete = this.delete.bind(this);
        this._onDeleted = this._onDeleted.bind(this);
    }

    close() {
        browserHistory.goBack();
    }
    
    componentWillMount() {
        this.state = {
            id: this.props.params.categoryId,
            isLoading: false
    }

        CategoriesStore.addDeletedListener(this._onDeleted);
    }

    componentWillUnmount() {
        CategoriesStore.removeDeletedListener(this._onDeleted);
    }

    delete() {
        const state = this.state;
        state.isLoading = true;
        this.setState(state);

        CategoryActions.delete(this.state.id);
    }

    render() {
        return (
             <Modal isOpen={true}>
                 <BlockUi tag='div' blocking={this.state.isLoading}>
                     <h3>Are you sure?</h3>
                     <div className='btn-group'>
                        <button onClick={this.delete}>Confirm</button>
                        <a onClick={this.close} className='button'>Cancel</a>
                     </div>
                 </BlockUi>
             </Modal>
                 );
}

_onDeleted() {
    this.close();
}
}