import React from "react";
import './style.css';

const Legend = ({ data, selectedItems, onChange }) => (
  <div >
    <div><h3>Select ID to display Line Chart</h3></div>
  <div className="flex-container ">
     
    {data.map((d) => (
      <div className="checkbox" style={{ color: 'green' }} key={d.id}>
        {d.id !== 'data1' && (
          <input

            type="checkbox"
            value={d.id}
            checked={selectedItems.includes(d.id)}
            onChange={() => onChange(d.id)}
          />
        )}
        <label>{d.id}</label>
      </div>
    ))}
  </div>
  </div>
);

export default Legend;