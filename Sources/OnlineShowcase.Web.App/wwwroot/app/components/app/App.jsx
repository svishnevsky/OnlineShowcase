import React, { Component } from 'react'
import Header from './Header.jsx'
import LeftMenu from './LeftMenu.jsx'
import UserStore from '../../stores/UserStore';

function getState(){
    return {
        isEditMode: UserStore.isContentEditor()
    };
}

export default class App extends Component {
    constructor(){
        super();

        this.onChange = this.onChange.bind(this);

        this.state = getState();
    }

    componentWillMount() {
        UserStore.addChangeListener(this.onChange);
    }

    componentWillUnmount() {
        UserStore.removeChangeListener(this.onChange);
    }

    render() {
        return (
            <div className={this.state.isEditMode ? 'edit-content' : ''}>
                <Header />
                <div className='container'>
                    {this.props.children}
                    <LeftMenu/>
                    <div className='clearfix'> </div>
                </div>
            </div>
        )
                    }

onChange(){
    this.setState(getState());
}
}