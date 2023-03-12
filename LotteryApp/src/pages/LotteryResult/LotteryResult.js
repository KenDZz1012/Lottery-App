import React, { useEffect, useMemo, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  Table,
  Row,
  Rows,
  TableWrapper,
  Cell,
} from "react-native-table-component";
import TypeLottery from "./Modal/TypeLottery";
import ConfirmDelete from "./Modal/ConfirmDelete";
import Result from "./Modal/Result";
import axios from "axios";
import Toast from "react-native-toast-message";

const LotteryResult = () => {
  const tableHead = ["Id", "Ngày", "Đề", "Nhất", ""];
  const widthArr = [0, 115.5, 100, 98.5, 98];
  const [isCreateResult, setIsCreateResult] = useState(false);
  const [modalTypeLottery, setModalTypeLottery] = useState(false);
  const [modalConfirmDelete, setModalConfirmDelete] = useState(false);
  const [isDeleteResult, setIsDeleteResult] = useState(false);
  const [dataResults, setDataResults] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const [isEditResult, setIsEditResult] = useState(false);
  const [row, setRow] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [value, setValue] = useState();
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [totalSize, setTotalSize] = useState(0);
  const [loading, setLoading] = useState(false);
  const onFetchCategories = async () => {
    let dataCate = [];
    const res = await axios.get("http://118.70.81.222:8081/api/v1/category");
    res.data.map((item) => {
      dataCate.push({
        label: item.categoryName,
        value: item.categoryId,
      });
    });
    setCategories(dataCate);
    setValue(dataCate[0].value);
  };

  useEffect(() => {
    onFetchResults(value);
  }, [value, page]);

  const onFetchResults = async (categoryId) => {
    setLoading(true);
    let table = [];
    const res = await axios.get(
      `http://118.70.81.222:8081/api/v1/Result?categoryId=${categoryId}&page=${page}`
    );
    setDataResults(res.data.ResultVMs);
    setTotalSize(res.data.totalSize);
    console.log(res.data);
    res.data.ResultVMs.map((item) => {
      let arrItem = [];
      item.dateIn = new Date(item.dateIn).toLocaleString("vi-VN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      for (const key of Object.keys(item)) {
        arrItem.push(item[key]);
      }
      table.push(arrItem);
    });
    setTableData(table);
    setLoading(false);
  };

  useMemo(() => {
    onFetchCategories();
  }, []);

  const onDelete = async () => {
    const res = await axios.delete(
      `http://118.70.81.222:8081/api/v1/category/${value}`
    );
    if (res.status == 200) {
      Toast.show({
        type: "info",
        text1: "Xóa thành công",
      });
      setModalConfirmDelete(false);
      onFetchCategories();
    }
  };

  const onDeleteResult = async () => {
    const res = await axios.delete(
      `http://118.70.81.222:8081/api/v1/result/${row.resultId}`
    );
    if (res.status == 200) {
      Toast.show({
        type: "info",
        text1: "Xóa thành công",
      });
      setModalConfirmDelete(false);
      onFetchResults(value);
      setIsDeleteResult(false);
    }
  };

  return (
    <View style={{ backgroundColor: "#fff", height: "100%" }}>
      <View style={{ backgroundColor: "#cbdfea", padding: 20 }}>
        <Text
          style={{
            textAlign: "center",
            fontSize: 20,
            fontWeight: "bold",
            color: "#01458e",
          }}
        >
          QUẢN LÝ KẾT QUẢ SỔ XỐ
        </Text>
      </View>
      <View
        style={{
          width: "60%",
          marginTop: 20,
          flexDirection: "row",
          padding: 10,
          zIndex: 10,
        }}
      >
        <DropDownPicker
          open={open}
          value={value}
          items={categories}
          setOpen={setOpen}
          setValue={setValue}
          onChangeValue={(val) => {
            if (val != null) {
              setPage(1);
              setValue(val);
            }
          }}
        />
        <TouchableOpacity
          onPress={() => {
            setModalTypeLottery(true);
            setIsEdit(false);
          }}
        >
          <MaterialCommunityIcons
            name="plus-circle-outline"
            size={40}
            style={{ marginLeft: 10 }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setModalTypeLottery(true);
            setIsEdit(true);
          }}
        >
          <MaterialCommunityIcons
            name="pencil-circle-outline"
            size={40}
            style={{ marginLeft: 10 }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setModalConfirmDelete(true);
            setIsDeleteResult(false);
          }}
        >
          <MaterialCommunityIcons
            name="delete-circle-outline"
            size={40}
            style={{ marginLeft: 10 }}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          backgroundColor: "#cbdfea",
          padding: 10,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setIsEditResult(false);
            setIsCreateResult(true);
          }}
        >
          <MaterialCommunityIcons
            name="plus-circle-outline"
            size={30}
            style={{ marginLeft: 10 }}
          />
        </TouchableOpacity>
        <Text
          style={{
            textAlign: "center",
            fontSize: 20,
            fontWeight: "bold",
            color: "#01458e",
          }}
        >
          Kết quả
        </Text>
        <Text></Text>
      </View>
      <View>
        {loading ? (
          <ActivityIndicator
            size={"large"}
            color="#01458e"
            style={{ marginTop: 100, marginBottom: 385 }}
          />
        ) : (
          <Table borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}>
            <Row
              data={tableHead}
              style={{ height: 40, backgroundColor: "#cbdfea" }}
              textStyle={{ textAlign: "center" }}
              widthArr={widthArr}
            />
            {tableData.map((rowData, index) => (
              <TableWrapper
                key={index}
                style={{ flexDirection: "row", height: 48 }}
              >
                {rowData.map((cellData, cellIndex) => (
                  <Cell
                    flex={widthArr[cellIndex]}
                    key={cellIndex}
                    data={
                      cellIndex === 4 ? (
                        <View style={{ flexDirection: "row" }}>
                          <TouchableOpacity
                            onPress={() => {
                              setIsCreateResult(true);
                              setIsEditResult(true);
                              setRow(
                                dataResults.find(
                                  (i) => i.resultId == rowData[0]
                                )
                              );
                            }}
                          >
                            <MaterialCommunityIcons
                              name="pencil-circle-outline"
                              size={30}
                              style={{ marginLeft: 10 }}
                            />
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => {
                              setRow(
                                dataResults.find(
                                  (i) => i.resultId == rowData[0]
                                )
                              );
                              setModalConfirmDelete(true);
                              setIsDeleteResult(true);
                            }}
                          >
                            <MaterialCommunityIcons
                              name="delete-circle-outline"
                              size={30}
                              style={{ marginLeft: 10 }}
                            />
                          </TouchableOpacity>
                        </View>
                      ) : (
                        cellData
                      )
                    }
                    textStyle={{ textAlign: "center" }}
                  />
                ))}
              </TableWrapper>
            ))}
          </Table>
        )}
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity
            onPress={() => {
              if (page != 1) {
                setPage(page - 1);
              }
            }}
            style={{
              backgroundColor: "#cbdfea",
              padding: 16,
              width: "35%",
            }}
          >
            <Text style={{ textAlign: "center" }}>Trang trước</Text>
          </TouchableOpacity>
          <View style={{ borderBottomColor: "#ccc", borderBottomWidth: 1 }}>
            <Text style={{ marginTop: 16 }}>
              Trang {page} / {Math.ceil(totalSize / 10)}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: "#cbdfea",
              padding: 16,
              width: "35%",
            }}
            onPress={() => {
              if (page != Math.ceil(totalSize / 10) && totalSize != 0) {
                setPage(page + 1);
              }
            }}
          >
            <Text style={{ textAlign: "center" }}>Trang sau</Text>
          </TouchableOpacity>
        </View>
        <TypeLottery
          modal={modalTypeLottery}
          onToggle={() => {
            setModalTypeLottery(false);
          }}
          isEdit={isEdit}
          data={categories.find((item) => item.value == value)}
          onFetchCategories={onFetchCategories}
        />
        <ConfirmDelete
          modal={modalConfirmDelete}
          onToggle={() => {
            setModalConfirmDelete(false);
          }}
          onDelete={isDeleteResult ? onDeleteResult : onDelete}
        />
        <Result
          modal={isCreateResult}
          isEdit={isEditResult}
          data={row}
          onToggle={() => {
            setIsCreateResult(false);
            setIsEdit(false);
          }}
          categoryId={value}
          onFetchResults={onFetchResults}
        />
      </View>
    </View>
  );
};

export default LotteryResult;
