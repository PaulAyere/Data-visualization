/** MultilineChart.js */
import React, { useState, useRef, useEffect } from "react";
import * as d3 from "d3";

// setting up svg (creating dimensions)
const MultilineChart = ({ data = [], dimensions = {} }) => {
  const svgRef = useRef();
  // to detect what line to animate we should store previous data state
  const [prevItems, setPrevItems] = useState([]);
  const { width, height, margin = {} } = dimensions;
  const svgWidth = width + margin.left + margin.right;
  const svgHeight = height + margin.top + margin.bottom;

  useEffect(() => {
    const xScale = d3.scaleLinear().domain([-6.5, 6]).range([0, width]);
    const yScale = d3.scaleLinear().domain([-2.5, 6]).range([height, 0]);
    // Create root container where we will append all other chart elements
    const svgEl = d3.select(svgRef.current);
    svgEl.selectAll("*").remove(); // Clear svg content before adding new elements
    const svg = svgEl
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
      
    //Scaling (adding x and y grid lines)
    // Add X grid lines with labels
    const xAxis = d3
      .axisBottom(xScale)
      .ticks(5)
      .tickSize(-height + margin.bottom);
    const xAxisGroup = svg
      .append("g")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(xAxis);
    xAxisGroup.select(".domain").remove();
    xAxisGroup.selectAll("line").attr("opacity", 0.5).attr("stroke", "black");
    xAxisGroup
      .selectAll("text")
      // .attr("opacity", 0.5)
      .attr("color", "blue")
      .attr("font-size", "0.75rem");
    // Add Y grid lines with labels
    const yAxis = d3
      .axisLeft(yScale)
      .ticks(10)
      .tickSize(-width)
      .tickFormat((val) => `${val}`);
    const yAxisGroup = svg.append("g").call(yAxis);
    yAxisGroup.select(".domain").remove();
    yAxisGroup.selectAll("line").attr("opacity", 0.5).attr("stroke", "black");
    yAxisGroup
      .selectAll("text")
      // .attr("opacity", 0.5)
      .attr("color", "blue")
      .attr("font-size", "0.75rem");

      //setting up the axis
       const line = d3
      .line()
      .x((d) => xScale(d.x))
      .y((d) => yScale(d.y));
    const lines = svg
      .selectAll(".line")
      .data(data)
      .enter()
      .append("path")
      .attr("fill", "none")
      .attr("stroke", (d)=>d.color)
      .attr("stroke-width", 1.5)
      .attr("d", (d) => line(d.values));
    // Use stroke-dashoffset for transition
    lines.each((d, i, nodes) => {
      const element = nodes[i];
      const length = element.getTotalLength();
      if (!prevItems.includes(d.id)) {
        d3.select(element)
          .attr("stroke-dasharray", `${length},${length}`)
          .attr("stroke-dashoffset", length)
          .transition()
          .duration(1000)
          .ease(d3.easeLinear)
          .attr("stroke-dashoffset", 0);
      }
    });
    setPrevItems(data.map(({ id }) => id));
  }, [data]);

  return <svg ref={svgRef} width={svgWidth} height={svgHeight} />;
};

export default MultilineChart;
