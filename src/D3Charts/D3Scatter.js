import React, { useState, useRef, useEffect } from "react";
import * as d3 from "d3";
// import point data from db.json
import allData from "../db.json";

function D3Scatter() {
  // create an array of objects with row and column as x and y values
  var pointData = allData.points.map(function (x) {
    return { x: x.row, y: x.col };
  });

  // covert the array of object to 2d-array
  var outputData = pointData.map(function (obj) {
    return Object.keys(obj)
      .sort()
      .map(function (key) {
        return obj[key];
      });
  });

  // const [data] = useState(outputData);
  const [data] = useState(allData.points);
  // console.log("testing data", data);

  // create svgRef using useRef so that we can put it in our svg element tag using the ref attribute
  const svgRef = useRef();

  // range for x and y
  const xAccessor = (d) => d.row;
  const yAccessor = (d) => d.col;

  // we create a use effect where we have data to be bound so that anytime data gets changed we will run our code in there
  useEffect(() => {
    // setting up container
    const w = 600;
    const h = 400;
    const svg = d3
      .select(svgRef.current)
      .attr("width", w)
      .attr("height", h)
      .style("overflow", "visible")
      .style("margin-top", "100px");

    // setting up scaling
    const xScale = d3
      .scaleLinear()
      .domain(d3.extent(allData.points, xAccessor))
      .range([0, w])
      .nice();
    const yScale = d3
      .scaleLinear()
      .domain(d3.extent(allData.points, yAccessor))
      .range([h, 0])
      .nice();

    // setting up axis
    const xAxis = d3.axisBottom(xScale).ticks(data.length);
    const yAxis = d3.axisLeft(yScale).ticks(5);
    svg.append("g").call(xAxis).attr("transform", `translate(0, ${h})`);
    svg.append("g").call(yAxis);

    // setting up axis labelling
    svg
      .append("text")
      .attr("x", w / 2)
      .attr("y", h + 50)
      .text("rows");
    svg
      .append("text")
      .attr("y", h / 2)
      .attr("x", -75)
      .text("cols");
    // setting up svg data
    svg
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d) => xScale(xAccessor(d)))
      .attr("cy", (d) => yScale(yAccessor(d)))
      .attr("r", 4)
      .attr("fill", (d) => d.color);

    svg
      .selectAll("circle")
      .on("mouseenter", onMouseEnter)
      .on("mouseleave", onMouseLeave);

      const tooltip = d3.select('#tooltip')
      function onMouseEnter(datum, index) {}
      function onMouseLeave() {
        tooltip.select("")
      }
  }, [data]);
  return (
    <div className="App">
      <h3>Scatter Plot Visualization</h3>
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default D3Scatter;
