import React, { Component } from "react";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
import Login from "../pages/Login";
import MainNavigation from "./MainNavigation";
const screenOptionStyle = {
  headerShown: false,
};
const AppNavigation = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Main" component={MainNavigation} />
    </Stack.Navigator>
  );
};

export default AppNavigation;
