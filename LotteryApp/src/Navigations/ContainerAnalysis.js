import React, { Component } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AnalysisResultSpecialA from "../pages/AnalysisResult/AnalysisResultSpecialA";
import AnalysisResultSpecialB from "../pages/AnalysisResult/AnalysisResultSpecialB";
import AnalysisResultFirstA from "../pages/AnalysisResult/AnalysisResultFirstA";
import AnalysisResultFirstB from "../pages/AnalysisResult/AnalysisResultFirstB";

const Tab = createMaterialBottomTabNavigator();

const ContainerAnalysis = () => {
  return (
    <Tab.Navigator
      initialRouteName="AnalysisResultSpecialA"
      activeColor="#e93434"
      inactiveColor="white"
      barStyle={{ backgroundColor: "#01458e" }}
      tabBarOptions={{
        showLabel: true,
      }}
    >
      <Tab.Screen
        name="AnalysisResultSpecialA"
        component={AnalysisResultSpecialA}
        options={{
          tabBarLabel: "Đề A",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cash" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="AnalysisResultSpecialB"
        component={AnalysisResultSpecialB}
        options={{
          tabBarLabel: "Đề B",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cash" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="AnalysisResultFirstA"
        component={AnalysisResultFirstA}
        options={{
          tabBarLabel: "Nhất A",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cash" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="AnalysisResultFirstB"
        component={AnalysisResultFirstB}
        options={{
          tabBarLabel: "Nhất B",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cash" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default ContainerAnalysis;
