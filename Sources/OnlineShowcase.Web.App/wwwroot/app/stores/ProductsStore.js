﻿import AppDispatcher from '../dispatcher/Dispatcher';
import ProductConstants from '../constants/ProductConstants';
import ProductsRepository from '../repositories/ProductsRepository';
import { EventEmitter } from 'events';

const SAVED_EVENT = 'product_saved';
const DELETED_EVENT = 'product_deleted';
const GOT_EVENT = 'product_got';
const FOUND_EVENT = 'product_found';

const productsRepository = new ProductsRepository();

const state = {
    filter: {
        skip: 0,
        take: 20,
        sort: 'popular'
    },
    availableSorts: {
        'new': 'created:desc',
        'popular': 'viewcount:desc'
    }
};

const isSameArrays = (a, b) => {
    if (!a && !b) {
        return true;
    }

    if ((a && !b) || (!a && b)) {
        return false;
    }

    return a.filter(x => b.indexOf(x) === -1).length === 0;
}

function saveProduct(product) {
    productsRepository.save(product).then(response => {
        state.saved = {
            status: response.status,
            data: response.data
        };

        if (state.got) {
            getProduct(state.got.id);
        }

        findProducts(state.filter, true);
        ProductsStore.emitSaved();
    });
}

function deleteProduct(id){
    productsRepository.delete(id).then(() => {
        findProducts(state.filter, true);
        ProductsStore.emitDeleted();
    });

    if (state.got && state.got.id === id) {
        state.got = null;
    }
}

function getProduct(id){
    productsRepository.get(id).then(response => {
        state.got = response.data;

        ProductsStore.emitGot();
    });
}

function findProducts(filter, force) {
    const sort = !filter.sort ? null : state.availableSorts[filter.sort];

    if (!force && state.found && state.found.filter.skip === filter.skip && state.found.filter.take === filter.take && state.found.filter.sort === sort && isSameArrays(state.found.filter.categories, filter.categories)) {
        return;
    }
    
    const newfilter = Object.assign({}, filter);
    newfilter.sort = sort;
    
    if (force) {
        newfilter.skip = 0;
    }

    productsRepository.find(newfilter).then(response => {
        newfilter.sort = filter.sort;
        state.found = {
            products: response.data,
            filter: newfilter
        };

        ProductsStore.emitFound();
    });
}

class ProductsStoreClass extends EventEmitter {
    emitSaved() {
        this.emit(SAVED_EVENT);
    }

    addSavedListener(callback) {
        this.on(SAVED_EVENT, callback);
    }

    removeSavedListener(callback) {
        this.removeListener(SAVED_EVENT, callback);
    }

    emitDeleted() {
        this.emit(DELETED_EVENT);
    }

    addDeletedListener(callback) {
        this.on(DELETED_EVENT, callback);
    }

    removeDeletedListener(callback) {
        this.removeListener(DELETED_EVENT, callback);
    }

    emitGot() {
        this.emit(GOT_EVENT);
    }

    addGotListener(callback) {
        this.on(GOT_EVENT, callback);
    }

    removeGotListener(callback) {
        this.removeListener(GOT_EVENT, callback);
    }

    emitFound() {
        this.emit(FOUND_EVENT);
    }

    addFoundListener(callback) {
        this.on(FOUND_EVENT, callback);
    }

    removeFoundListener(callback) {
        this.removeListener(FOUND_EVENT, callback);
    }

    getSaved() {
        return state.saved;
    }

    getGot() {
        return state.got;
    }

    getFound() {
        return state.found;
    }

    getDefaultFilter() {
        return Object.assign({}, state.filter);
    }

    getAvailableSorts() {
        return Object.keys(state.availableSorts);
    }
}

const ProductsStore = new ProductsStoreClass();

ProductsStore.dispatchToken = AppDispatcher.register(action => {
    switch(action.actionType) {
      
        case ProductConstants.PRODUCT_SAVE:
            saveProduct(action.product);
            break;
      
        case ProductConstants.PRODUCT_DELETE:
            deleteProduct(action.id);
            break;
      
        case ProductConstants.PRODUCT_GET:
            getProduct(action.id);
            break;
      
        case ProductConstants.PRODUCT_FIND:
            findProducts(action.filter);
            break;

        default:
    }
});

export default ProductsStore;