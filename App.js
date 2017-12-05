import React, { Component } from 'react';
import { Main } from './src/client/config/router';

export default class App extends React.Component {
    render() {
        return <Main />;
    }
}



/*
This is a fix for entryPoint in app.json not working.
See https://github.com/react-community/create-react-native-app/issues/152
 */