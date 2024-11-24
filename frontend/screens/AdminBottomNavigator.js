import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // Ensure you have expo/vector-icons installed
import AdminScreen from '../src/screens/AdminScreen';
import IndexScreen from '../app/(home)/index';
import Adminfdlist from './Adminfdlist';

const Tab = createBottomTabNavigator();

const AdminBottomNavigator = ({ route }) => {
  const { hotelowner } = route.params; // Get email from navigation params

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0,
          elevation: 5, // Adds a shadow effect
          height: 60, // Adjust the height of the tab bar
        },
        tabBarActiveTintColor: '#2087f5', // Active tab color
        tabBarInactiveTintColor: '#7a7a7a', // Inactive tab color
        tabBarLabelStyle: {
          fontSize: 14,
          marginBottom: 5,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          // Set the appropriate icon for each screen
          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline'; // Home icon
              break;
            case 'functions':
              iconName = focused ? 'add-circle' : 'add-circle-outline'; // Add icon
              break;
            case 'Wastagelist':
              iconName = focused ? 'list' : 'list-outline'; // Wastage list icon
              break;
            default:
              iconName = 'help-circle'; // Fallback icon
          }

          // Return the icon component for the tab bar
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={AdminScreen}

      />

      <Tab.Screen
        name="functions"
        component={IndexScreen}
      />

      <Tab.Screen
        name="Wastagelist"
        component={Adminfdlist}
      />
    </Tab.Navigator>
  );
};

export default AdminBottomNavigator;
