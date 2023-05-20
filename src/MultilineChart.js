import React, { useState, useRef, useEffect } from "react";
import * as d3 from "d3";

const MultilineChart = ({ data = [], dimensions = {} }) => {
  const svgRef = useRef();
  const [prevItems, setPrevItems] = useState([]);
  const { width, height, margin = {} } = dimensions;
  const svgWidth = width + margin.left + margin.right;
  const svgHeight = height + margin.top + margin.bottom;

  useEffect(() => {
    const xScale = d3.scaleLinear().domain([-6.5, 6]).range([0, width]);
    const yScale = d3.scaleLinear().domain([-2.5, 6]).range([height, 0]);

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const chart = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const xAxis = d3.axisBottom(xScale).ticks(5).tickSize(-height + margin.bottom);
    const yAxis = d3.axisLeft(yScale).ticks(10).tickSize(-width).tickFormat((val) => `${val}`);

    chart.append("g").attr("transform", `translate(0, ${height - margin.bottom})`).call(xAxis);
    chart.append("g").call(yAxis);

    const line = d3.line().x((d) => xScale(d.x)).y((d) => yScale(d.y));

    const lines = chart
      .selectAll(".line")
      .data(data)
      .enter()
      .append("path")
      .attr("fill", "none")
      .attr("stroke", (d) => d.color)
      .attr("stroke-width", 1.5)
      .attr("d", (d) => line(d.values))
      .each((d, i, nodes) => {
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
