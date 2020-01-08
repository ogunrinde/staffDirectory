import React, {Component} from 'react';
import { createBottomTabNavigator, createAppContainer} from 'react-navigation';
import OfficialScreen from '../screen/official';
import ArchdeaconryScreen from '../screen/archdeaconary';
import  ChurchScreen  from '../screen/church';
import  PriestScreen from '../screen/priest';
import  BishopScreen from '../screen/bishop';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AppTab = createBottomTabNavigator({
  Bishop:{
    screen:BishopScreen,
    navigationOptions: {
      header: null,
    }
  },
  Officials:{
    screen:OfficialScreen,
    navigationOptions: {
      header: null,
    }
  },
  Archdeaconries:ArchdeaconryScreen,
  Churches:ChurchScreen,
  Priests:PriestScreen
},
{
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Bishop') {
          iconName = `ios-person`; 
        }
        else if (routeName === 'Officials') {
          iconName = `ios-home`; 
        } else if (routeName === 'Archdeaconries') {
          iconName = `ios-compass`;
        } else if (routeName === 'Churches') {
            iconName = `ios-pin`;
        } else if (routeName === 'Priests') {
            iconName = `ios-person`;
        }
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#E50DE5',
      inactiveTintColor: '#FFFFFF',
      style:{
        backgroundColor:'#2C0A25'
      },
    },
  }
);
AppTab.navigationOptions = {
  header: null,
};
export default createAppContainer(AppTab);