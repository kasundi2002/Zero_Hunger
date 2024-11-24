import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // Make sure to install expo/vector-icons
import VolunteerHomeScreen from './VolunteerHomeScreen';
import FoodWastageList from './FoodWastageList';
import HomeScreen from '../src/screens/HomeScreen';
import FoodNeedsList from './FoodNeedsList';

const Tab = createBottomTabNavigator();

const VolunteerNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0,
          elevation: 5, // Adds a shadow effect
          height: 60, // Adjusts the height of the tab bar
        },
        tabBarActiveTintColor: '#2087f5', // Active tab color
        tabBarInactiveTintColor: '#7a7a7a', // Inactive tab color
        tabBarLabelStyle: {
          fontSize: 14,
          marginBottom: 5,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'wastagelist':
              iconName = focused ? 'list' : 'list-outline';
              break;
            case 'reports':
              iconName = focused ? 'bar-chart' : 'bar-chart-outline'; // Updated to bar-chart icon
              break;
            case 'Foodneelist':
              iconName = focused ? 'fast-food' : 'fast-food-outline'; // Updated to fast-food icon
              break;
            default:
              iconName = 'help-circle-outline';
          }

          // Return the icon component
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={VolunteerHomeScreen}   // Pass email as initial params if needed
      />

      <Tab.Screen 
        name="wastagelist" 
        component={FoodWastageList} 
      />

      <Tab.Screen 
        name="reports" 
        component={HomeScreen} 
      />

      {/* <Tab.Screen 
        name="Foodneelist" 
        component={FoodNeedsList} 
      /> */}
    </Tab.Navigator>
  );
};

export default VolunteerNavigator;
