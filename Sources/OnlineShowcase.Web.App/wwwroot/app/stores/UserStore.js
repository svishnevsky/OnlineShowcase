import AppDispatcher from '../dispatcher/Dispatcher';
import UserConstants from '../constants/UserConstants';
import { EventEmitter } from 'events';
import { isTokenExpired } from '../utils/jwtHelpers'

const CHANGE_EVENT = 'change';

function setUser(profile, token) {
    if (!localStorage.getItem('id_token')) {
        localStorage.setItem('profile', JSON.stringify(profile));
        localStorage.setItem('id_token', token);
    }
}

function clearUser() {
    localStorage.removeItem('profile');
    localStorage.removeItem('id_token');
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
        const token = this.getJwt();
        return !!token && !isTokenExpired(token);
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