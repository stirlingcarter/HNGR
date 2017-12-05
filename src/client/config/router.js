import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';

import HomeScreen       from '../components/home'
import LoginScreen      from '../components/login';
import RegisterScreen   from '../components/register';
import PickupScreen     from '../components/pickup';
import ResourceScreen   from '../components/resources';


export const Tabs = TabNavigator({
    Pickup: {
        screen: PickupScreen,
        navigationOptions: {
            tabBarLabel: 'Main'
        },
    },
    Resources: {
        screen: ResourceScreen,
        navigationOptions: {
            tabBarLabel: 'Resources'
        },
    },
});

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
    Resources: {
        screen: ResourceScreen,
        navigationOptions: {
            title: 'Login',
        },
    },
    Register: {
        screen: RegisterScreen,
    },
    Tabs: {
        screen: Tabs
    }
});