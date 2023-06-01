import React, { useState } from "react";
import MultilineChart from "./MultilineChart";
import allData from "./db.json";

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

function D3Line() {
  const [selectedItems, setSelectedItems] = useState([]);

  const legendData = finalObjs.slice(1);
  const chartData = legendData.filter((d) => selectedItems.includes(d.id));

  const onChangeSelection = (id) => {
    const newSelectedItems = selectedItems.includes(id)
      ? selectedItems.filter((item) => item !== id)
      : [...selectedItems, id];

    setSelectedItems(newSelectedItems);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div>
        <h3 style={{ marginBottom: '10px' }}>Select ID to display Line Chart</h3>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {legendData.map((d) => (
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
                  onChange={() => onChangeSelection(d.id)}
                  style={{ marginRight: '5px' }}
                />
                <label>{d.id}</label>
              </>
            )}
          </div>
        ))}
      </div>
      <MultilineChart
        data={chartData}
        dimensions={dimensions}
        style={{ marginTop: '20px' }}
      />
    </div>
  );
}

export default D3Line;
