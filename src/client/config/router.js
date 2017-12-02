import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';

import HomeScreen from '../components/home'
import LoginScreen from '../components/login';
import RegisterScreen from '../components/register';


export const Main = StackNavigator({
    Home: {
       screen: HomeScreen,
       navigationOptions: {
           title: 'Home',
       },
    },
    Login: {
        screen: LoginScreen,
        navigationOptions: {
            title: 'Login',
        },
    },

});