import React, { Component } from 'react';
import './loader.css';

export default class Loader extends Component {

    render(){

        return (
            <div className="main-loader">
                <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
            </div>
        );

    }

}