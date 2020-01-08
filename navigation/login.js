import React, {Component} from 'react';
import LoginScreen from '../screen/login';


import { createStackNavigator, createAppContainer} from 'react-navigation';

const AppNavigator = createStackNavigator({
    login: {
        screen: LoginScreen
    }
},{ headerMode: 'screen' });
export default createAppContainer(AppNavigator);