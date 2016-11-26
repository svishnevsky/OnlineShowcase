import { Component } from 'react'
import UserStore from '../../stores/UserStore'
import UserActions from '../../actions/UserActions'
import { browserHistory } from 'react-router'

export default class Logout extends Component {

    constructor() {
        super();
    }

    componentWillMount() {
        if (UserStore.isAuthenticated()) {
            UserActions.clearUser();
        }

        browserHistory.goBack();
    }

    render() {
        return null;
    }
}