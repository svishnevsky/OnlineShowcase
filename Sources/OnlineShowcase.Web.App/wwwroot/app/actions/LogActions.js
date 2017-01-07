import AppDispatcher from '../dispatcher/Dispatcher';
import LogConstants from '../constants/LogConstants';

class LogActionsClass {
    logError(message, data) {
        AppDispatcher.dispatch({
            actionType: LogConstants.LOG_ERROR,
            message: message,
            data: data
        });
    }
}

const LogActions = new LogActionsClass();

export default LogActions;