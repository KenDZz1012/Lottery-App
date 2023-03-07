import React, { Component } from "react";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
import Menu from "../pages/Menu";
import { Button, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import LotteryResult from "../pages/LotteryResult";
const screenOptionStyle = {
  title: "PHẦN MỀM PHÂN TÍCH SỔ XỐ",
  headerStyle: {
    backgroundColor: "#01458e",
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold",
  },
};
const MainNavigation = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="Menu"
        component={Menu}
        options={({ navigation }) => ({
          headerLeft: () => null,
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
              <MaterialCommunityIcons
                name="logout"
                size={26}
                style={{ color: "#fff" }}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="LotteryResult"
        component={LotteryResult}
        options={({ navigation }) => ({
          title: "KẾT QUẢ SỔ XỐ",
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
              <MaterialCommunityIcons
                name="logout"
                size={26}
                style={{ color: "#fff" }}
              />
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default MainNavigation;
