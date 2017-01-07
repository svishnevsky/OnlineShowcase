import AppDispatcher from '../dispatcher/Dispatcher';
import UserConstants from '../constants/UserConstants';
import { EventEmitter } from 'events';
import { isTokenExpired } from '../utils/jwtHelpers'

const CHANGE_EVENT = 'user_changed';

function setUser(profile, token) {
    localStorage.setItem('profile', JSON.stringify(profile));
    localStorage.setItem('id_token', token);
}

function clearUser() {
    localStorage.removeItem('profile');
    localStorage.removeItem('id_token');
}

function checkToken(){
    const token = localStorage.getItem('id_token');
    if (!token)
    {
        return false;
    }

    if (isTokenExpired(token))
    {
        clearUser();
        return false;
    }

    return true;
}

class UserStoreClass extends EventEmitter {
    emitChange() {
        this.emit(CHANGE_EVENT);
    }

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
  
    isAuthenticated() {
        return checkToken();
    }

    isInRoles(...roles) {
        const profile = this.getUser();
        
        if (!this.isAuthenticated() || !profile.groups) {
            return false;
        }

        const intersect = profile.groups.filter((el) => roles.indexOf(el) !== -1);
        return intersect.length > 0;
    }

    isContentEditor() {
        return this.isInRoles('Admin', 'Contant Manager');
    }
  
    getUser() {
        const profile = localStorage.getItem('profile');
        return profile ? JSON.parse(localStorage.profile) : {};
    }
  
    getJwt() {
        return localStorage.getItem('id_token');
    }
}

const UserStore = new UserStoreClass();

UserStore.dispatchToken = AppDispatcher.register(action => {

    switch(action.actionType) {
      
        case UserConstants.USER_SET:
            setUser(action.profile, action.token);
            UserStore.emitChange();
            break;
      
        case UserConstants.USER_CLEAR:
            clearUser();
            UserStore.emitChange();
            break;

        default:
    }
});

export default UserStore;