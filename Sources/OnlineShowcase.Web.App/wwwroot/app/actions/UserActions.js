import AppDispatcher from '../dispatcher/Dispatcher';
import UserConstants from '../constants/UserConstants';

class UserActionsClass {
    setUser(profile, token) {
        AppDispatcher.dispatch({
            actionType: UserConstants.USER_SET,
            profile: profile,
            token: token
        });
    }

    clearUser() {
        AppDispatcher.dispatch({
            actionType: UserConstants.USER_CLEAR
        });
    }
}

const UserActions = new UserActionsClass();

export default UserActions;