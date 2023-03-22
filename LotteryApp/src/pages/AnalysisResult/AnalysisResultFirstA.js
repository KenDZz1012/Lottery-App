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

const AnalysisResultFirstA = () => {
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

  const onFetchCalResult = async (categoryId) => {
    setLoading(true);
    let min = 0;
    let data = [["Nhất A"], ["Đầu", "", "Đít", ""]];
    let stringFirstHead = "";
    let stringSecondHead = "";
    let stringThirdHead = "";
    let strNumberHead = [];

    const res = await axios.get(
      `http://118.70.81.222:8081/api/v1/result/CalResultHead?type=firstprize&categoryId=${categoryId}`
    );
    if (res.status == 200) {
      res.data.map((item, index) => {
        let dataItem = [];
        dataItem.push(index);
        dataItem.push(item.FirstHead);
        dataItem.push(index);
        dataItem.push(item.SecondHead);
        data.push(dataItem);
      });
      data.map((item) => {
        if (item[1] > 5 && item[3] > 5) {
          strNumberHead.push(item);
        }
      });
     let sortData = strNumberHead.sort(
        (a, b) => 
        {
          if(Number(b[1]) + Number(b[3]) - Number(a[1]) - Number(a[3]) < 0){
            return -1
          }
          else if(Number(b[1]) + Number(b[3]) - Number(a[1]) - Number(a[3]) == 0 && Math.max(Number(b[1]),Number(b[3])) - Math.max(Number(a[1]),Number(a[3])) < 0 ){
            
            return -1
          }
          return 0
        }
      );
      for (let i = 0; i < sortData.length; i++) {
        if (stringFirstHead.length < 3) {
          stringFirstHead += sortData[i][0];
        }
        if (stringFirstHead.length < 4) {
          stringSecondHead += sortData[i][0];
        }
        if (stringFirstHead.length < 5) {
          stringThirdHead += sortData[i][0];
        }
      }
      data[0].push(stringFirstHead.length == 3 ? stringFirstHead : "");
      data[0].push(stringSecondHead.length == 4 ? stringSecondHead : "");
      data[0].push(stringThirdHead.length == 5 ? stringThirdHead : "");

      setTableData(data);
      setLoading(false);
    }
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
          PHÂN TÍCH SỐ LIỆU NHẤT A
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
            {tableData.map((rowData, index) =>
              rowData[1] >= 5 && rowData[3] >= 5 ? (
                <TableWrapper
                  key={index}
                  style={{
                    flexDirection: "row",
                    backgroundColor:
                      (rowData[1] == 5 || rowData[3] == 5) && index != 0
                        ? "#7471d8"
                        : rowData[1] >= 6 && rowData[3] >= 6 && index != 0
                        ? "#fafa9f"
                        : "#cbdfea",
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
                <TableWrapper
                  key={index}
                  style={{
                    flexDirection: "row",
                    backgroundColor: (index = 0 && "#cbdfea"),
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
              )
            )}
          </Table>
        )}
      </View>
    </View>
  );
};

export default AnalysisResultFirstA;
