import AppDispatcher from '../dispatcher/Dispatcher';
import CategoryConstants from '../constants/CategoryConstants';
import CategoriesRepository from '../repositories/CategoriesRepository';
import { EventEmitter } from 'events';

const SAVE_EVENT = 'category_saved';

const categoryRepository = new CategoriesRepository();

function saveCategory(category){
    console.log(category);
    categoryRepository.saveCategory(category);
}

function deleteCategory(){

}

class CategoriesStoreClass extends EventEmitter {
    emitSave() {
        this.emit(SAVE_EVENT);
    }

    addSaveListener(callback) {
        this.on(SAVE_EVENT, callback);
    }

    removeSaveListener(callback) {
        this.removeListener(SAVE_EVENT, callback);
    }
}

const CategoriesStore = new CategoriesStoreClass();

CategoriesStore.dispatchToken = AppDispatcher.register(action => {
    console.log(action.actionType);
    switch(action.actionType) {
      
        case CategoryConstants.CATEGORY_SAVE:
            saveCategory(action.category);
            break;
      
        case CategoryConstants.CATEGORY_DELETE:
            deleteCategory(action.id);
            break;

        default:
    }
});

export default CategoriesStore;