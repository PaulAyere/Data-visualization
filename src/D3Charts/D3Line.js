import React, { useState, useRef, useEffect } from "react";
import * as d3 from "d3";
import MultilineChart from "../views/MultilineChart";
import Legend from "../views/Legend";
// import point data from db.json
import allData from "../db.json";
// import '../styles.css'

// all ids in an array
let idArray = [];
allData.curves.forEach((x) => {
  idArray.push(x.id);
});
let jarray;
let xyObjArray = [];
allData.curves.map(({ id, x, y }) => {
  const xData = x;
  const yData = y;
  jarray = [];
  for (var i = 0; i < xData.length && i < xData.length; i++)
    jarray[i] = [xData[i], yData[i]];
  var objs = jarray.map((d) => ({
    x: d[0],
    y: d[1],
  }));
  xyObjArray.push(objs);
});

var colorArray = [
  "#00B3E6",
  "#E6B333",
  "#3366E6",
  "#999966",
  "#99FF99",
  "#B34D4D",
  "#80B300",
  "#B33300",
  "#CC80CC",
  "#66664D",
  "#991AFF",
  "#E666FF",
  "#4DB3FF",
  "#1AB399",
  "#E666B3",
  "#33991A",
  "#CC9999",
  "#B3B31A",
  "#00E680",
  "#4D8066",
  "#809980",
  "#E6FF80",
  "#1AFF33",
  "#999933",
  "#FF3380",
  "#CCCC00",
  "#66E64D",
  "#4D80CC",
  "#9900B3",
  "#E64D66",
];
var idObjectXYArray = [];

for (var i = 0; i < idArray.length && i < xyObjArray.length && i < colorArray.length; i++)
  idObjectXYArray[i] = [i + 1, idArray[i], xyObjArray[i], colorArray[i]];
var finalObjs = idObjectXYArray.map((xx) => ({
  data: xx[0],
  id: xx[1],
  values: xx[2],
  color: xx[3],
}));
console.log("final array", finalObjs[0].values);

const data1 = finalObjs[0];
const data2 = finalObjs[1];
const data3 = finalObjs[2];
const data4 = finalObjs[3];
const data5 = finalObjs[4];
const data6 = finalObjs[5];
const data7 = finalObjs[6];
const data8 = finalObjs[7];
const data9 = finalObjs[8];
const data10 = finalObjs[9];
const data11 = finalObjs[10];
const data12 = finalObjs[11];
const data13 = finalObjs[12];
const data14 = finalObjs[13];
const data15 = finalObjs[14];
const data16 = finalObjs[15];
const data17 = finalObjs[16];
const data18 = finalObjs[17];
const data19 = finalObjs[18];
const data20 = finalObjs[19];
const data21 = finalObjs[20];
const data22 = finalObjs[21];
const data23 = finalObjs[22];
const data24 = finalObjs[23];
const data25 = finalObjs[24];
const data26 = finalObjs[25];
const data27 = finalObjs[26];
const data28 = finalObjs[27];
const data29 = finalObjs[28];
const data30 = finalObjs[29];

// dimensions for svg graph
const dimensions = {
  width: 600,
  height: 300,
  margin: {
    top: 30,
    right: 30,
    bottom: 30,
    left: 60,
  },
};

function D3Line() {
  const [selectedItems, setSelectedItems] = React.useState([]);
  const legendData = [
    data2,
    data3,
    data4,
    data5,
    data6,
    data7,
    data8,
    data9,
    data10,
    data11,
    data12,
    data13,
    data14,
    data15,
    data16,
    data17,
    data18,
    data19,
    data20,
    data21,
    data22,
    data23,
    data24,
    data25,
    data26,
    data27,
    data28,
    data29,
    data30,
  ];

  const chartData = [
    data1,
    ...[
      data2,
      data3,
      data4,
      data5,
      data6,
      data7,
      data8,
      data9,
      data10,
      data11,
      data12,
      data13,
      data14,
      data15,
      data16,
      data17,
      data18,
      data19,
      data20,
      data21,
      data22,
      data23,
      data24,
      data25,
      data26,
      data27,
      data28,
      data29,
      data30,
    ].filter((d) => selectedItems.includes(d.id)),
  ];
  console.log("chart data", chartData);
  // ternary operator
  // condition ? true: false

  // if (condition) {
  //   true 
  // } else {
  //   false
  // }
  const onChangeSelection = (id) => {
    const newSelectedItems = selectedItems.includes(id) ? selectedItems.filter((item) => item !== id) : [...selectedItems, id];
 
    setSelectedItems(newSelectedItems);
  };

  return (
    <div className="App">
      <Legend
        data={legendData}
        selectedItems={selectedItems}
        onChange={onChangeSelection}
      />
      <MultilineChart data={chartData} dimensions={dimensions} />
    </div>
  );
}

export default D3Line;
