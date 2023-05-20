import React, { useState } from "react";
import MultilineChart from "../views/MultilineChart";
import allData from "../db.json";

const idArray = allData.curves.map((x) => x.id);
const xyObjArray = allData.curves.map(({ x, y }) =>
  x.map((xVal, i) => ({ x: xVal, y: y[i] }))
);
const colorArray = [
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

const finalObjs = idArray.map((id, i) => ({
  data: i + 1,
  id,
  values: xyObjArray[i],
  color: colorArray[i],
}));

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

const Legend = ({ data, selectedItems, onChange }) => (
  <div>
    <div>
      <h3>Select ID to display Line Chart</h3>
    </div>
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {data.map((d) => (
        <div
          key={d.id}
          style={{
            display: 'flex',
            alignItems: 'center',
            marginRight: '10px',
            marginBottom: '10px',
            color: 'green',
          }}
        >
          {d.id !== 'data1' && (
            <>
              <input
                type="checkbox"
                value={d.id}
                checked={selectedItems.includes(d.id)}
                onChange={() => onChange(d.id)}
              />
              <label>{d.id}</label>
            </>
          )}
        </div>
      ))}
    </div>
  </div>
);

function D3Line() {
  const [selectedItems, setSelectedItems] = useState([]);

  const legendData = finalObjs.slice(1);
  const chartData = [
    finalObjs[0],
    ...legendData.filter((d) => selectedItems.includes(d.id)),
  ];

  const onChangeSelection = (id) => {
    const newSelectedItems = selectedItems.includes(id)
      ? selectedItems.filter((item) => item !== id)
      : [...selectedItems, id];

    setSelectedItems(newSelectedItems);
  };

  return (
    <div className="App">
      <Legend data={legendData} selectedItems={selectedItems} onChange={onChangeSelection} />
      <MultilineChart data={chartData} dimensions={dimensions} />
    </div>
  );
}

export default D3Line;
