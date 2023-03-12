import React, { useEffect, useMemo, useState } from "react";
import { Text, View, ActivityIndicator } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import {
  Table,
  Row,
  Rows,
  TableWrapper,
  Cell,
} from "react-native-table-component";
import axios from "axios";
const AnalysisResultSpecialB = () => {
  const [categories, setCategories] = useState([]);

  const [value, setValue] = useState();
  const [open, setOpen] = useState(false);

  const [tableHead, setTableHead] = useState();
  const [tableData, setTableData] = useState([["Đầu", "", "Đít", ""]]);
  const widthArr = [115.5, 100, 98.5, 98];
  const [numberMin, setNumberMin] = useState();
  const [loading, setLoading] = useState(false);

  const onFetchCategories = async () => {
    let dataCate = [];
    const res = await axios.get("http://192.168.1.17:5000/api/v1/category");
    res.data.map((item) => {
      dataCate.push({
        label: item.categoryName,
        value: item.categoryId,
      });
    });
    setCategories(dataCate);
    setValue(dataCate[0].value);
  };

  const onFetchCalResult = async (categoryId) => {
    setLoading(true);
    let min = 0;
    let data = [["Đầu", "", "Đít", ""]];
    let head = ["Đề B"];
    let stringFirstHead = "";
    let stringSecondHead = "";
    let stringThirdHead = "";
    const res = await axios.get(
      `http://192.168.1.17:5000/api/v1/result/CalResultTail?type=specialprize&categoryId=${categoryId}`
    );
    if (res.status == 200) {
      res.data.map((item, index) => {
        let dataItem = [];
        dataItem.push(index);
        dataItem.push(item.FirstTail);
        dataItem.push(index);
        dataItem.push(item.SecondTail);
        data.push(dataItem);
      });
      setTableData(data);
      data.map((item) => {
        if (item[1] > 5 || item[3] > 5) {
          if (stringFirstHead.length < 3) {
            stringFirstHead += item[0];
          }
          if (stringSecondHead.length < 4) {
            stringSecondHead += item[0];
          }
          if (stringThirdHead.length < 5) {
            stringThirdHead += item[0];
          }
        }
      });
      head.push(stringFirstHead);
      head.push(stringSecondHead);
      head.push(stringThirdHead);
      setTableHead(head);
      for (var i = 0; i < data.length; i++) {
        if (Number(data[i][1]) > 5 || Number(data[i][3]) > 5) {
          min =
            Number(data[i][1]) > Number(data[i][3])
              ? Number(data[i][1])
              : Number(data[i][3]);
          setNumberMin(data[i][0]);
          break;
        }
      }
      data.forEach((item) => {
        if (item[1] > 5 || item[3] > 5) {
          let numberCheck =
            Number(item[1]) >= Number(item[3])
              ? Number(item[1])
              : Number(item[3]);
          if (numberCheck < min) {
            min = numberCheck;
            setNumberMin(item[0]);
          }
        }
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    onFetchCalResult(value);
  }, [value]);

  useMemo(() => {
    onFetchCategories();
  }, []);

  return (
    <View>
      <View style={{ backgroundColor: "#cbdfea", padding: 20 }}>
        <Text
          style={{
            textAlign: "center",
            fontSize: 20,
            fontWeight: "bold",
            color: "#01458e",
          }}
        >
          PHÂN TÍCH SỐ LIỆU ĐỀ B
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
              setValue(val);
              onFetchCalResult(val);
            }
          }}
        />
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
            {tableData.map((rowData, index) =>
              rowData[1] > 5 || rowData[3] > 5 ? (
                <TableWrapper
                  key={index}
                  style={{
                    flexDirection: "row",
                    backgroundColor:
                      rowData[0] == numberMin ? "purple" : "yellow",
                  }}
                >
                  {rowData.map((cellData, cellIndex) => (
                    <Cell
                      flex={widthArr[cellIndex]}
                      key={cellIndex}
                      data={cellData}
                      textStyle={{
                        textAlign: "center",
                        height: 30,
                        marginTop: 10,
                      }}
                    />
                  ))}
                </TableWrapper>
              ) : (
                <TableWrapper key={index} style={{ flexDirection: "row" }}>
                  {rowData.map((cellData, cellIndex) => (
                    <Cell
                      flex={widthArr[cellIndex]}
                      key={cellIndex}
                      data={cellData}
                      textStyle={{
                        textAlign: "center",
                        height: 30,
                        marginTop: 10,
                      }}
                    />
                  ))}
                </TableWrapper>
              )
            )}
          </Table>
        )}
      </View>
    </View>
  );
};

export default AnalysisResultSpecialB;
