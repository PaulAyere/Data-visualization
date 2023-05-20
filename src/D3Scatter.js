import React, { useState, useRef, useEffect } from "react";
import * as d3 from "d3";
import allData from "./db.json";

function D3Scatter() {
  const svgRef = useRef();
  const xAccessor = (d) => d.row;
  const yAccessor = (d) => d.col;

  useEffect(() => {
    const w = 600;
    const h = 400;
    const svg = d3
      .select(svgRef.current)
      .attr("width", w)
      .attr("height", h)
      .style("overflow", "visible")
      .style("marginTop", "100px");

    const xScale = d3.scaleLinear()
      .domain(d3.extent(allData.points, xAccessor))
      .range([0, w])
      .nice();
    const yScale = d3.scaleLinear()
      .domain(d3.extent(allData.points, yAccessor))
      .range([h, 0])
      .nice();

    const xAxis = d3.axisBottom(xScale).ticks(allData.points.length);
    const yAxis = d3.axisLeft(yScale).ticks(5);

    svg.append("g").call(xAxis).attr("transform", `translate(0, ${h})`);
    svg.append("g").call(yAxis);

    svg.append("text")
      .attr("x", w / 2)
      .attr("y", h + 50)
      .text("rows");
    svg.append("text")
      .attr("y", h / 2)
      .attr("x", -75)
      .text("cols");

    const tooltip = d3.select("body").append("div")
      .style("position", "absolute")
      .style("padding", "8px")
      .style("backgroundColor", "#f9f9f9")
      .style("border", "1px solid #ccc")
      .style("opacity", 0);

    svg.selectAll("circle")
      .data(allData.points)
      .enter()
      .append("circle")
      .attr("cx", (d) => xScale(xAccessor(d)))
      .attr("cy", (d) => yScale(yAccessor(d)))
      .attr("r", 4)
      .attr("fill", (d) => d.color)
      .on("mouseover", (event, d) => {
        tooltip.transition()
          .duration(200)
          .style("opacity", 0.9);
        tooltip.html(`(${xAccessor(d)}, ${yAccessor(d)})`)
          .style("left", `${event.pageX}px`)
          .style("top", `${event.pageY - 28}px`);
      })
      .on("mouseout", () => {
        tooltip.transition()
          .duration(500)
          .style("opacity", 0);
      });
  }, []);

  return (
    <div className="App">
      <h3>Scatter Plot Visualization</h3>
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default D3Scatter;
