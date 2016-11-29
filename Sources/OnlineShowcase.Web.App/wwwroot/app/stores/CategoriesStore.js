import AppDispatcher from '../dispatcher/Dispatcher';
import CategoryConstants from '../constants/CategoryConstants';
import CategoriesRepository from '../repositories/CategoriesRepository';
import { EventEmitter } from 'events';

const SAVED_EVENT = 'category_saved';
const ALLLOADED_EVENT = 'category_allloaded';

const categoryRepository = new CategoriesRepository();

const state = {};

function saveCategory(category){
    return categoryRepository.saveCategory(category).then(response => {
        state.saved = {
            status: response.status,
            data: response.data
        };

        CategoriesStore.emitSaved();
    }).then(getCategories);
}

function deleteCategory() {
}

function getCategories(){
    categoryRepository.getCategories().then(response => {
        state.categories = response.data;
        CategoriesStore.emitAllLoaded();
    });
}

class CategoriesStoreClass extends EventEmitter {
    emitSaved() {
        this.emit(SAVED_EVENT);
    }

    addSavedListener(callback) {
        this.on(SAVED_EVENT, callback);
    }

    removeSavedListener(callback) {
        this.removeListener(SAVED_EVENT, callback);
    }

    emitAllLoaded() {
        this.emit(ALLLOADED_EVENT);
    }

    addAllLoadedListener(callback) {
        this.on(ALLLOADED_EVENT, callback);
    }

    removeAllLoadedListener(callback) {
        this.removeListener(ALLLOADED_EVENT, callback);
    }

    getSaved(){
        return state.saved;
    }

    getCategories() {
        return state.categories;
    }
}

const CategoriesStore = new CategoriesStoreClass();

CategoriesStore.dispatchToken = AppDispatcher.register(action => {
    switch(action.actionType) {
      
        case CategoryConstants.CATEGORY_SAVE:
            saveCategory(action.category);
            break;
      
        case CategoryConstants.CATEGORY_DELETE:
            deleteCategory(action.id);
            break;

        case CategoryConstants.CATEGORY_LOADALL:
            getCategories();
            break;

        default:
    }
});

export default CategoriesStore;