import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AppNavigation from "./src/Navigations/AppNavigation";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigation from "./src/Navigations/MainNavigation";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {  LogBox } from "react-native"
LogBox.ignoreAllLogs();
export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
