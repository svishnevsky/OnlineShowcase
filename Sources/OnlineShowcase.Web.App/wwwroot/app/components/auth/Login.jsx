import { Component } from 'react'
import UserStore from '../../stores/UserStore'

export default class Login extends Component {

    constructor() {
        super();
    }

    componentWillMount() {
        if (UserStore.isAuthenticated()) {
            return;
        }

        this.props.route.auth.login();
    }

    render() {
        return null;
    }
}