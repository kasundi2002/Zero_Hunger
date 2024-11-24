import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons"; // Make sure to install expo/vector-icons
import FoodNeeds from "./FoodNeeds";
import FoodNeedManage from "./FoodNeedManage";
import OrgProfilePage from "./OrgProfilePage";
import OrgEmailScreen from "./OrgEmailScreen";
const Tab = createBottomTabNavigator();

const OrgNavigator = ({ route }) => {
  const { orgName } = route.params; // Get organization name from navigation params

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 0,
          elevation: 5, // Adds a shadow effect
          height: 80, // Adjusts the height of the tab bar
        },
        tabBarActiveTintColor: "#2087f5", // Active tab color
        tabBarInactiveTintColor: "#7a7a7a", // Inactive tab color
        tabBarLabelStyle: {
          fontSize: 14,
          marginBottom: 5,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case "Home":
              iconName = focused ? "home" : "home-outline";
              break;
            case "AddFood":
              iconName = focused ? "add-circle" : "add-circle-outline";
              break;
            // case "Notifications":
            //   iconName = focused ? "notifications" : "notifications-outline";
            //   break;
            case "FoodManage": // Case for FoodManage tab
              iconName = focused
                ? "checkmark-circle"
                : "checkmark-circle-outline"; // Change icon here
              break;
            case "Profile":
              iconName = focused ? "person" : "person-outline";
              break;
          }

          // Return the icon component
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={OrgEmailScreen}
        initialParams={{ orgName }} // Pass organization name as initial params
      />
      <Tab.Screen
        name="AddFood"
        component={FoodNeeds}
        initialParams={{ orgName }}
      />
      <Tab.Screen
        name="FoodManage"
        component={FoodNeedManage}
        initialParams={{ orgName }}
      />
      <Tab.Screen
        name="Profile"
        component={OrgProfilePage}
        initialParams={{ orgName }}
      />
    </Tab.Navigator>
  );
};

export default OrgNavigator;
