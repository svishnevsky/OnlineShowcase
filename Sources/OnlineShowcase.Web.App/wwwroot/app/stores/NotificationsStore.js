import AppDispatcher from '../dispatcher/Dispatcher';
import NotificationConstants from '../constants/NotificationConstants';
import NotificationsRepository from '../repositories/NotificationsRepository';
import { EventEmitter } from 'events';

function addNotification(payload) {
    NotificationsRepository.add(payload);
}

class NotificationsStoreClass extends EventEmitter {
    
}

const NotificationsStore = new NotificationsStoreClass();

NotificationsStore.dispatchToken = AppDispatcher.register(action => {
    switch(action.actionType) {
      
        case NotificationConstants.NOTIFICATION_ADD:
            addNotification(action.payload);
            break;

        default:
    }
});

export default NotificationsStore;