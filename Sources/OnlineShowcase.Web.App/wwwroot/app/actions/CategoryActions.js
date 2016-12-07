import AppDispatcher from '../dispatcher/Dispatcher';
import CategoryConstants from '../constants/CategoryConstants';

class CategoryActionsClass {
    save(category) {
        AppDispatcher.dispatch({
            actionType: CategoryConstants.CATEGORY_SAVE,
            category: category
        });
    }

    delete(id) {
        AppDispatcher.dispatch({
            actionType: CategoryConstants.CATEGORY_DELETE,
            id: id
        });
    }
}

const CategoryActions = new CategoryActionsClass();
export default CategoryActions;