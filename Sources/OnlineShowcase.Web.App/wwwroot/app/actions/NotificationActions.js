import AppDispatcher from '../dispatcher/Dispatcher';
import NotificationConstants from '../constants/NotificationConstants';

class NotificationActionsClass {
    add(payload) {
        AppDispatcher.dispatch({
            actionType: NotificationConstants.NOTIFICATION_ADD,
            payload: payload
        });
    }
}

const NotificationActions = new NotificationActionsClass();
export default NotificationActions;