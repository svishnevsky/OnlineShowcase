import AppDispatcher from '../dispatcher/Dispatcher';
import CategoryConstants from '../constants/CategoryConstants';

class CategoryActionsClass {
    saveCategory(category) {
        AppDispatcher.dispatch({
            actionType: CategoryConstants.CATEGORY_SAVE,
            category: category
        });
    }

    deleteCategory(id) {
        AppDispatcher.dispatch({
            actionType: CategoryConstants.CATEGORY_DELETE,
            id: id
        });
    }
}

const CategoryActions = new CategoryActionsClass();
export default CategoryActions;