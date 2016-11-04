import Auth0Lock from 'auth0-lock'
import { browserHistory } from 'react-router'
import UserActions from '../actions/UserActions';
import LogActions from '../actions/LogActions';

export default class AuthService {
    constructor(clientId, domain) {
        this.lock = new Auth0Lock(clientId, domain, {});
        this.lock.on('authenticated', this._doAuthentication.bind(this));
        this.lock.on('authorization_error', this._authorizationError.bind(this));
        //this.lock.on('hide', this._goBack.bind(this));
        this.login = this.login.bind(this);
    }

    _goBack(length = -1) {
        browserHistory.go(length);
    }

    _doAuthentication(authResult) {
        this.lock.getProfile(authResult.idToken,
            (error, profile) => {
                if (error) {
                    LogActions.logError('Error loading the Profile', error);
                } else {
                    UserActions.setUser(profile, authResult.idToken);
                    //this._goBack(-2);
                }
            });
    }

    _authorizationError(error) {
        LogActions.logError('Authentication Error', error);
    }

    login() {
        this.lock.show();
    }
}