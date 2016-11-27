import AppDispatcher from '../dispatcher/Dispatcher';
import CategoryConstants from '../constants/CategoryConstants';
import CategoriesRepository from '../repositories/CategoriesRepository';
import { EventEmitter } from 'events';

const SAVED_EVENT = 'category_saved';

const categoryRepository = new CategoriesRepository();

const state = {};

function saveCategory(category){
    return categoryRepository.saveCategory(category);
}

function deleteCategory(){

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

    getSaved(){
        return state.saved;
    }
}

const CategoriesStore = new CategoriesStoreClass();

CategoriesStore.dispatchToken = AppDispatcher.register(action => {
    switch(action.actionType) {
      
        case CategoryConstants.CATEGORY_SAVE:
            saveCategory(action.category).then(response => {
                state.saved = {
                    status: response.status,
                    data: response.data
                };

                CategoriesStore.emitSaved();
            });
            break;
      
        case CategoryConstants.CATEGORY_DELETE:
            deleteCategory(action.id);
            break;

        default:
    }
});

export default CategoriesStore;