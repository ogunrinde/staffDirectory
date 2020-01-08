/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleSheet
} from 'react-native';
import AppNavigator from './navigation/index';
import {  Provider } from 'react-redux';
import store from './store/index';


const App = () => {
  return (
    <Provider store={store}>
         <AppNavigator />
    </Provider>
  );
};

const styles = StyleSheet.create({
  
});

export default App;
