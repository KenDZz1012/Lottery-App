import React, { useEffect, useState } from "react";
import { Button, Modal, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-element-textinput";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment/moment";
import axios from "axios";
import Toast from "react-native-toast-message";

const Result = ({
  modal,
  onToggle,
  data,
  isEdit,
  categoryId,
  onFetchResults,
}) => {
  const [isPickerShow, setIsPickerShow] = useState(false);
  const [dataPost, setDataPost] = useState({
    resultId: 0,
    dateIn: new Date(),
    firstPrize: "",
    specialPrize: "",
    categoryId: 0,
  });

  useEffect(() => {
    if (isEdit) {
      let [day, month, year] = data.dateIn.split("/");
      const dateObj = new Date(+year, +month - 1, +day);
      setDataPost({
        resultId: data.resultId,
        dateIn: dateObj,
        firstPrize: data.firstPrize,
        specialPrize: data.specialPrize,
        categoryId: categoryId,
      });
    } else {
      setDataPost({
        resultId: 0,
        dateIn: new Date(),
        firstPrize: "",
        specialPrize: "",
        categoryId: categoryId,
      });
    }
  }, [modal]);

  const onChange = (event, value) => {
    setDataPost({ ...dataPost, dateIn: value });
  };

  const onSubmit = async () => {
    if (!isEdit) {
      await axios
        .post("http://118.70.81.222:8081/api/v1/result", dataPost)
        .then((response) => {
          Toast.show({
            type: "success",
            text1: "Thêm mới thành công",
          });
          setTimeout(() => {
            onToggle();
            onFetchResults(categoryId);
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
        .put("http://118.70.81.222:8081/api/v1/Result", dataPost)
        .then((response) => {
          Toast.show({
            type: "success",
            text1: "Sửa dữ liệu thành công",
          });
          setTimeout(() => {
            onToggle();
            onFetchResults(categoryId);
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
    <Modal visible={modal} onRequestClose={onToggle} transparent={true}>
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
        <Text>{!isEdit ? "Thêm mới kết quả" : "Sửa đổi kết quả"}</Text>
        <View style={{ marginTop: 10 }}>
          <DateTimePicker
            locale="vi"
            value={dataPost.dateIn}
            mode={"date"}
            display={"default"}
            onChange={onChange}
            is24Hour={true}
            style={{ alignSelf: "center" }}
            maximumDate={new Date()}
            disabled={isEdit}
          />
          <TextInput
            keyboardType="numeric"
            placeholder="Đề"
            style={{
              borderColor: "#ccc",
              borderWidth: 1,
              fontSize: 20,
              height: 40,
              marginTop: 10,
              padding: 10,
            }}
            onChangeText={(text) => {
              setDataPost({
                ...dataPost,
                specialPrize: text,
              });
            }}
            value={isEdit ? dataPost.specialPrize : ""}
          />

          <TextInput
            keyboardType="numeric"
            placeholder="Nhất"
            style={{
              borderColor: "#ccc",
              borderWidth: 1,
              fontSize: 20,
              height: 40,
              marginTop: 20,
              padding: 10,
            }}
            onChangeText={(text) => {
              setDataPost({
                ...dataPost,
                firstPrize: text,
              });
            }}
            value={isEdit ? dataPost.firstPrize : ""}
          />
        </View>
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

export default Result;
