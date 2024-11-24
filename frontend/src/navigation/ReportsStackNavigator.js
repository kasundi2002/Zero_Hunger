// navigation/ReportStackNavigator.js

//You need to add navigation so users 
//can switch between the ReportsScreen and ReportDetailsScreen.

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ReportsScreen from '../screens/ReportsScreen';
import ReportDetailsScreen from '../screens/ReportDisplayScreen';

const Stack = createStackNavigator();

const ReportStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Reports">
      <Stack.Screen name="Reports" component={ReportsScreen} />
      <Stack.Screen name="ReportDetails" component={ReportDetailsScreen} />
    </Stack.Navigator>
  );
};

export default ReportStackNavigator;
