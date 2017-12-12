import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';

import HomeScreen       from '../components/home'
import LoginScreen      from '../components/login';
import RegisterScreen   from '../components/register';
import PickupScreen     from '../components/pickup';
import ResourceScreen   from '../components/resources';
import PickupForm       from '../components/pickup_form';
import PickupView       from '../components/pickup_view';
import VolInfo          from '../components/vol_info';
import PickupMap        from '../components/pickup_map';
import Profile          from '../components/profile';
import FDCOptions       from '../components/fdc_options';
import FDCInfo          from '../components/fdc_info';
import DelInfo          from '../components/delivery_set';

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
            title: 'Resources',
        },
    },
    Register: {
        screen: RegisterScreen,
        navigationOptions: {
            title: 'Register',
        }
    },
    Tabs: {
        screen: Tabs
    },
    PForm: {
        screen: PickupForm,
        navigationOptions: {
            title: 'Pickup Form',
        }
    },
    PView: {
        screen: PickupView,
        navigationOptions: {
            title: 'Pickup Requests',
        }
    },
    VInfo: {
        screen: VolInfo,
        navigationOptions: {
            title: 'Update Info',
        }
    },
    PMap: {
        screen: PickupMap
    },
    Profile: {
        screen: Profile,
        navigationOptions: {
            title: 'Profile',
        }
    },
    FDCOpt: {
        screen: FDCOptions,
        navigationOptions: {
            title: 'FDC Options',
        }
    },
    FDCInfo: {
        screen: FDCInfo,
        navigationOptions: {
            title: 'Update Info',
        }
    },
    DInfo: {
        screen: DelInfo,
        navigationOptions: {
            title: 'Delivery Instructions'
        }
    }
});