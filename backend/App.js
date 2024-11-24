import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen"; // Import the login screen component
import SignUpScreen from "./screens/SignUpScreen"; // Import the sign-up screen component
import UserEmailScreen from "./screens/UserEmailScreen"; // Import the UserEmail screen component
import BottomTabNavigator from "./screens/BottomNavigator"; // Import the BottomTabNavigator
import OrgLogScreen from "./screens/OrgLogScreen";
import OrgSignScreen from "./screens/OrgSignScreen";
import SplashScreen from "./screens/SplashScreen";
// import FoodNeeds from "./screens/FoodNeeds";
// import FoodNeedManage from "./screens/FoodNeedManage";
import OrgNavigator from "./screens/OrgNavigator";
// import UserSelectionScreen from "./screens/UserSelectionScreen";
import LoginSelection from "./screens/LogonSelection";
import AddVolunteerForm from "./screens/AddVolunteer";
import VolunteerLogin from "./screens/Volunteerlogin";

import ReportSelectionScreen from './src/screens/ReportSelectionScreen';
import ReportDisplayScreen from './src/screens/ReportDisplayScreen';

import HomeScreen from './src/screens/HomeScreen';

import MyReportScreen from './src/screens/MyReportsScreen';
import MyReportDisplayScreen from './src/screens/MyReportDisplayScreen';
import AdminBottomNavigator from "./screens/AdminBottomNavigator";
import Adminlog from"./src/screens/LoginScreen";

import Summary from"./app/(home)/summary";
import Event from"./app/(home)/event";
import Addevent from"./app/(home)/addevent";
import VolunteerNavigator from "./screens/VolunteerNavigator"

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        {/* Define screens as part of the stack */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="OrgLog" component={OrgLogScreen} />
        <Stack.Screen name="OrgSign" component={OrgSignScreen} />
        <Stack.Screen name="Nav" component={OrgNavigator} />
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="addvolunteer" component={AddVolunteerForm} />
        <Stack.Screen name="vlogin" component={VolunteerLogin} />
        <Stack.Screen name="vdash" component={VolunteerNavigator} />



        <Stack.Screen name="Loginselect" component={LoginSelection} />
        {/* <Stack.Screen name="Selection" component={UserSelectionScreen} /> */}
        {/* <Stack.Screen name="Food" component={FoodNeeds} />
        <Stack.Screen name="FoodManage" component={FoodNeedManage} /> */}

        {/* Define the bottom tab navigator as a stack screen */}
        <Stack.Screen name="MainTabs" component={BottomTabNavigator} />


        <Stack.Screen name="home" component={HomeScreen} />
        <Stack.Screen name="ReportSelection" component={ReportSelectionScreen} />
        <Stack.Screen name="ReportDisplay" component={ReportDisplayScreen} />
        <Stack.Screen name="MyReportScreen" component={MyReportScreen} />
        <Stack.Screen name="MyReportDisplayScreen" component={MyReportDisplayScreen} />
        <Stack.Screen name="AdminScreen" component={AdminBottomNavigator} />
        <Stack.Screen name="Adminlog" component={Adminlog} />

        <Stack.Screen name="Summary" component={Summary} />
        <Stack.Screen name="Event" component={Event} />
        <Stack.Screen name="addevent" component={Addevent} />



      </Stack.Navigator>
    </NavigationContainer>
  );
}
