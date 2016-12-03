import React, { Component } from 'react'
import { Link } from 'react-router'

export default class ManageIcons extends Component {
    render(){
        return (
            <div className='icon-group edit-element'>
                <Link to={`${this.props.basePath}/delete`} className='icon delete'/>
                <Link to={`${this.props.basePath}/edit`} className='icon edit'/>
            </div>
            );
}
}