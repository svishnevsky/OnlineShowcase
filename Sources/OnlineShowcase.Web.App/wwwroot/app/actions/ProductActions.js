import AppDispatcher from '../dispatcher/Dispatcher';
import ProductConstants from '../constants/ProductConstants';

class ProductActionsClass {
    save(product) {
        AppDispatcher.dispatch({
            actionType: ProductConstants.PRODUCT_SAVE,
            product: product
        });
    }

    delete(id) {
        AppDispatcher.dispatch({
            actionType: ProductConstants.PRODUCT_DELETE,
            id: id
        });
    }

    find(filter) {
        AppDispatcher.dispatch({
            actionType: ProductConstants.PRODUCT_FIND,
            filter: filter
        });
    }

    get(id) {
        AppDispatcher.dispatch({
            actionType: ProductConstants.PRODUCT_GET,
            id: id
        });
    }
}

const ProductActions = new ProductActionsClass();
export default ProductActions;