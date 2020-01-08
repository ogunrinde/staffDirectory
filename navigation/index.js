import React, {Component} from 'react';
import LoginScreen from '../screen/login';
import HomeScreen from '../screen/home';
import RegisterScreen from '../screen/register';
import ResetScreen from '../screen/reset';
import ProfileScreen from '../screen/profile';
import PaymentScreen from '../screen/payment';
import setPasswordScreen from '../screen/set_password';
import PaynowScreen from '../screen/paynow';
import AppTab from './tab';


import { createStackNavigator, createAppContainer, createSwitchNavigator} from 'react-navigation';
const AppNavigatorPayment = createStackNavigator({
    payment: {
        screen: PaymentScreen
    },
    paynow:{
        screen: PaynowScreen
    }
});
const AppNavigator = createStackNavigator({
    set_password:{
        screen: setPasswordScreen
    },
    register:{
        screen: RegisterScreen
    },
    profile:{
        screen: ProfileScreen
    },
    home:{
        screen: HomeScreen
    },
    tab:{
        screen: AppTab,
        navigationOptions: {
            header: null
        },
    },
    reset:{
        screen: ResetScreen
    }
},{ headerMode: 'screen' });
export default createAppContainer(createSwitchNavigator(
    {
        login: {
            screen: LoginScreen
        },
        AppPayment: AppNavigatorPayment,
        App: AppNavigator
    },
    {
        initialRouteName: 'login'
    }
));