import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Modal, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-element-textinput";
import Toast from "react-native-toast-message";

const TypeLottery = ({ modal, onToggle, data, isEdit, onFetchCategories }) => {
  const [dataPost, setDataPost] = useState({
    categoryId: 0,
    categoryName: "",
  });
  useEffect(() => {
    if (isEdit) {
      setDataPost({
        categoryId: data.value,
        categoryName: data.label,
      });
    }
  }, [modal]);

  const onSubmit = async () => {
    if (dataPost.categoryName == "") {
      Toast.show({
        type: "error",
        text1: "Không để trống dữ liệu",
      });
      return;
    }
    if (!isEdit) {
      await axios
        .post("http://118.70.81.222:8081/api/v1/category", dataPost)
        .then((response) => {
          Toast.show({
            type: "success",
            text1: "Thêm mới thành công",
          });
          setTimeout(() => {
            onToggle();
            onFetchCategories();
          }, 1500);
        })
        .catch((ex) => {
          Toast.show({
            type: "error",
            text1: ex.response.data,
          });
        });
    } else {
      await axios
        .put("http://118.70.81.222:8081/api/v1/category", dataPost)
        .then((response) => {
          Toast.show({
            type: "success",
            text1: "Sửa dữ liệu thành công",
          });
          setTimeout(() => {
            onToggle();
            onFetchCategories();
          }, 1500);
        })
        .catch((ex) => {
          Toast.show({
            type: "error",
            text1: ex.response.data,
          });
        });
    }
  };

  return (
    <Modal
      visible={modal}
      animationType="slide"
      onRequestClose={onToggle}
      transparent={true}
    >
      <Toast />

      <View
        style={{
          backgroundColor: "#fff",
          marginTop: "50%",
          width: "70%",
          alignSelf: "center",
          padding: 20,
          borderColor: "#ccc",
          borderWidth: 1,
        }}
      >
        <Text>Thêm mới loại xổ số</Text>
        <TextInput
          value={isEdit ? dataPost.categoryName : ""}
          style={{
            borderColor: "#01458e",
            borderWidth: 1,
            height: 40,
            paddingLeft: 10,
            marginTop: 10,
          }}
          onChangeText={(text) => {
            setDataPost({
              ...dataPost,
              categoryName: text,
            });
          }}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            marginTop: 10,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "#dff0d8",
              padding: 10,
              width: 70,
              marginRight: 20,
              borderRadius: 6,
            }}
            onPress={onSubmit}
          >
            <Text style={{ textAlign: "center" }}>Lưu</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "#f2dede",
              padding: 10,
              width: 70,
              borderRadius: 6,
            }}
            onPress={onToggle}
          >
            <Text style={{ textAlign: "center" }}>Đóng</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default TypeLottery;
