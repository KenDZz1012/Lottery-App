import React, { useState } from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
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

const LotteryResult = () => {
  const [modalTypeLottery, setModalTypeLottery] = useState(false);
  const [modalConfirmDelete, setModalConfirmDelete] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
  ]);
  const [value, setValue] = useState(items[0].value);
  const tableHead = ["Ngày", "Đề", "Nhất", ""];
  const tableData = [
    ["01/03/2023", "12345", "12345", "4"],
    ["a", "b", "c", "d"],
    ["1", "2", "3", "456\n789"],
    ["a", "b", "c", "d"],
    ["a", "b", "c", "d"],
    ["a", "b", "c", "d"],
    ["a", "b", "c", "d"],
    ["a", "b", "c", "d"],
    ["a", "b", "c", "d"],
    ["a", "b", "c", "d"],
    ["a", "b", "c", "d"],
    ["a", "b", "c", "d"],
    ["a", "b", "c", "d"],
    ["a", "b", "c", "d"],
    ["a", "b", "c", "d"],
  ];
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
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
        />
        <TouchableOpacity
          onPress={() => {
            setModalTypeLottery(true);
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
          }}
        >
          <MaterialCommunityIcons
            name="delete-circle-outline"
            size={40}
            style={{ marginLeft: 10 }}
          />
        </TouchableOpacity>
      </View>
      <View>
        <Table borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}>
          <Row
            data={tableHead}
            style={{ height: 40, backgroundColor: "#cbdfea" }}
            textStyle={{ textAlign: "center" }}
          />
          {tableData.map((rowData, index) => (
            <TableWrapper key={index} style={{ flexDirection: "row" }}>
              {rowData.map((cellData, cellIndex) => (
                <Cell
                  key={cellIndex}
                  data={
                    cellIndex === 3 ? (
                      <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity>
                          <MaterialCommunityIcons
                            name="pencil-circle-outline"
                            size={30}
                            style={{ marginLeft: 10 }}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity>
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
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity
            style={{ backgroundColor: "#cbdfea", padding: 16, width: "35%" }}
          >
            <Text style={{ textAlign: "center" }}>Trang trước</Text>
          </TouchableOpacity>
          <View style={{ borderBottomColor: "#ccc", borderBottomWidth: 1 }}>
            <Text style={{ marginTop: 16 }}>Trang 1 / 20</Text>
          </View>
          <TouchableOpacity
            style={{ backgroundColor: "#cbdfea", padding: 16, width: "35%" }}
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
          data={value}
        />
        <ConfirmDelete
          modal={modalConfirmDelete}
          onToggle={() => {
            setModalConfirmDelete(false);
          }}
          onDelete={() => {}}
        />
      </View>
    </View>
  );
};

export default LotteryResult;
