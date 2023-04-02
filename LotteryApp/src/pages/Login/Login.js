import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from "react-native";
import { TextInput } from "react-native-element-textinput";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { NavigationContainer } from "@react-navigation/native";
import Toast from "react-native-toast-message";

const Login = ({ navigation }) => {
  const [showPass, setShowPass] = useState(true);
  const [dataLogin, setDataLogin] = useState({
    userName: "admin",
    password: "",
  });

  const onSubmit = () => {
    if (dataLogin.userName == "admin" && dataLogin.password == "admin123") {
      setDataLogin({
        ...dataLogin,
        password: "",
      });
      navigation.navigate("Main", { screen: "Menu" });
    } else {
      Toast.show({
        type: "error",
        text1: "Sai tên đăng nhập hoặc mật khẩu",
      });
    }
  };
  return (
    <View
      style={{
        padding: 20,
        alignItems: "center",
        alignSelf: "center",
        backgroundColor: "#fff",
        height: "100%",
        width: "100%",
      }}
    >
      <View style={{ marginTop: 80 }}>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 20,
            textTransform: "uppercase",
            color: "#da251c",
            textAlign: "center",
          }}
        >
          Phần mềm
        </Text>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 20,
            marginTop: 20,
            textTransform: "uppercase",
            color: "#01458e",
            textAlign: "center",
          }}
        >
          Thần số học
        </Text>
        <Toast />

        {/* <Image
          source={require("../../assets/logo.jpg")}
          style={{
            width: 130,
            height: 130,
            alignSelf: "center",
            zIndex: 2,
            marginTop: 50,
          }}
        /> */}
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 20,
            marginTop: 80,
            textTransform: "uppercase",
            textAlign: "center",
          }}
        >
          Đăng nhập
        </Text>
      </View>
      <View style={{ marginTop: 20, flexDirection: "row", paddingRight: 20 }}>
        <MaterialCommunityIcons
          name="account"
          size={26}
          style={{ marginLeft: 10, marginTop: 8 }}
        />
        <TextInput
          placeholder="Tài khoản"
          value={dataLogin.userName}
          style={{
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
            fontSize: 20,
            width: 280,
            height: 40,
            padding: 10,
          }}
          onChangeText={(text) => {
            setDataLogin({
              ...dataLogin,
              userName: text,
            });
          }}
        ></TextInput>
      </View>
      <View style={{ marginTop: 40, flexDirection: "row", paddingLeft: 20 }}>
        <MaterialCommunityIcons
          name="lock"
          size={26}
          style={{ marginLeft: 10, marginTop: 16 }}
        />
        <TextInput
          value={dataLogin.password}
          secureTextEntry={showPass}
          placeholder="Mật khẩu"
          style={{
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
            fontSize: 20,
            width: 280,
            height: 40,
            marginTop: 10,
            padding: 10,
          }}
          onChangeText={(text) => {
            console.log(text);
            setDataLogin({
              ...dataLogin,
              password: text,
            });
          }}
        ></TextInput>
        <MaterialCommunityIcons
          onPress={() => {
            setShowPass(!showPass);
          }}
          name="eye"
          size={26}
          style={{ marginLeft: 10, marginTop: 20 }}
        />
      </View>
      <View style={{ marginTop: 40 }}>
        <TouchableOpacity
          style={{
            backgroundColor: "#01458e",
            padding: 10,
            width: 300,
            borderRadius: 20,
          }}
          onPress={onSubmit}
        >
          <Text style={{ color: "#fff", textAlign: "center" }}>Đăng nhập</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 40 }}></View>
    </View>
  );
};

export default Login;
