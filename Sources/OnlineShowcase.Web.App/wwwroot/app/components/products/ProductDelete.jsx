import React, { Component } from 'react'
import Modal from 'react-modal'
import ProductActions from '../../actions/ProductActions'
import ProductsStore from '../../stores/ProductsStore'
import { browserHistory } from 'react-router'
import BlockUi from 'react-block-ui'

export default class ProductDelete extends Component {
    constructor() {
        super();

        this.delete = this.delete.bind(this);
        this.onDeleted = this.onDeleted.bind(this);
    }

    close() {
        browserHistory.goBack();
    }
    
    componentWillMount() {
        this.state = {
            id: this.props.params.productId,
            isLoading: false
        }

        ProductsStore.addDeletedListener(this.onDeleted);
    }

    componentWillUnmount() {
        ProductsStore.removeDeletedListener(this.onDeleted);
    }

    delete() {
        const state = this.state;
        state.isLoading = true;
        this.setState(state);

        ProductActions.delete(this.state.id);
    }

    render() {
        return (
             <Modal isOpen={true} contentLabel={''}>
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

onDeleted() {
    this.close();
}
}