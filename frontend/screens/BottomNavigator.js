import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // Make sure to install expo/vector-icons
import ProfileScreen from './Screen1';
import AddFoodWastage from './AddFoodWastage';
import UserEmailScreen from './UserEmailScreen';
import MyFoodWastageList from './MyFoodWastageList';


const Tab = createBottomTabNavigator();

const BottomTabNavigator = ({ route }) => {
  const { hotelowner } = route.params;  // Get email from navigation params

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
              iconName = focused ? 'home' : 'home-outline'; // Home tab
              break;
            case 'AddFood':
              iconName = focused ? 'add-circle' : 'add-circle-outline'; // Add Food tab
              break;
            case 'FoodDetails':
              iconName = focused ? 'list' : 'list-outline'; // Food details tab
              break;
            case 'Reports':
              iconName = focused ? 'bar-chart' : 'bar-chart-outline'; // Reports tab
              break;
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline'; // Profile tab
              break;
          }

          // Return the icon component
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={UserEmailScreen} 
        initialParams={{ hotelowner }}  // Pass email as initial params
      />
      <Tab.Screen 
        name="AddFood" 
        component={AddFoodWastage} 
      />
      <Tab.Screen 
        name="FoodDetails" 
        component={MyFoodWastageList} 
      />

      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
