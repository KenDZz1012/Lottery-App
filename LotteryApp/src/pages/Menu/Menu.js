import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
const Menu = ({ navigation }) => {
  return (
    <View style={{ backgroundColor: "#fff", height: "100%" }}>
      <View style={{ marginTop: 80 }}>
        <Image
          source={require("../../assets/logoIcon.png")}
          style={{
            width: 130,
            height: 130,
            alignSelf: "center",
            zIndex: 2,
            marginTop: 50,
          }}
        />
        <View style={{ marginTop: 60 }}>
          <TouchableOpacity
            style={{
              backgroundColor: "#01458e",
              padding: 10,
              width: 300,
              borderRadius: 20,
              alignSelf: "center",
              height: 100,
            }}
            onPress={() => navigation.navigate("LotteryResult")}
          >
            <Text
              style={{
                color: "#fff",
                textAlign: "center",
                marginTop: 30,
                fontSize: 20,
              }}
            >
              QUẢN LÝ KẾT QUẢ XỔ SỐ
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 40 }}>
          <TouchableOpacity
            style={{
              backgroundColor: "#da251c",
              padding: 10,
              width: 300,
              borderRadius: 20,
              alignSelf: "center",
              height: 100,
            }}
          >
            <Text
              style={{
                color: "#fff",
                textAlign: "center",
                marginTop: 30,
                fontSize: 20,
              }}
            >
              PHÂN TÍCH SỐ LIỆU
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Menu;
