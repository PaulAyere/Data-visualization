import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { curveBasis } from 'd3-shape';

const CurveChart = () => {
  const chartRef = useRef(null);
  const [selectedCurves, setSelectedCurves] = useState([]);

  useEffect(() => {
    const drawChart = () => {
      // Define the chart dimensions
      const width = 500;
      const height = 300;
      const margin = { top: 20, right: 20, bottom: 30, left: 40 };
      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;

      // Remove any existing SVG elements
      d3.select(chartRef.current).select('svg').remove();

      // Create the SVG element
      const svg = d3.select(chartRef.current)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      // Define the scales
      const xScale = d3.scaleLinear()
        .domain([-6, 6])
        .range([0, innerWidth]);

      const yScale = d3.scaleLinear()
        .domain([-2, 6])
        .range([innerHeight, 0]);

      // Define the curve function
      const curve = d3.line()
        .x(d => xScale(d.x))
        .y(d => yScale(d.y))
        .curve(curveBasis);

      // Draw the curves
    const data = [
      {
        id: 1093,
        coordinates: [
          { x: -5.6, y: 4.52 },
          { x: -3.4, y: 3.61 },
          { x: -2.8, y: 2.2 },
          { x: -2.2, y: 1.06 },
          { x: 1.4, y: 5.37 },
          { x: 1.6, y: 5.4 },
          { x: 2.4, y: 4.62 },
          { x: 4.2, y: 0.91 },
          { x: 4.8, y: 0.61 },
          { x: 5.4, y: 1.15 }
        ]
      },
      {
        id: 1402,
        coordinates: [
          { x: -5.8, y: 2.6 },
          { x: -5.6, y: 3.07 },
          { x: -2.6, y: -0.14 },
          { x: -2.0, y: -1.25 },
          { x: -1.4, y: -1.46 },
          { x: -0.4, y: 0.21 },
          { x: -0.2, y: 0.74 },
          { x: 0.4, y: 2.39 },
          { x: 0.8, y: 3.31 },
          { x: 5.8, y: -0.0 }
        ]
      },
      {
        id: 1168,
        coordinates: [
          { x: -4.4, y: 4.03 },
          { x: -3.8, y: 3.56 },
          { x: -2.0, y: 1.43 },
          { x: -1.4, y: 1.32 },
          { x: 0.4, y: 3.25 },
          { x: 1.0, y: 3.88 },
          { x: 2.6, y: 3.42 },
          { x: 4.8, y: 1.31 },
          { x: 5.0, y: 1.36 },
          { x: 5.8, y: 2.05 }
        ]
      },
      {
        id: 1752,
        coordinates: [
          { x: -4.0, y: 3.89 },
          { x: -1.6, y: -0.5 },
          { x: -1.4, y: -0.46 },
          { x: -1.0, y: -0.1 },
          { x: -0.4, y: 1.03 },
          { x: 1.4, y: 4.46 },
          { x: 3.0, y: 2.35 },
          { x: 3.6, y: 0.89 },
          { x: 4.0, y: 0.11 },
          { x: 4.8, y: -0.49 }
        ]
      }
    ];

      const selectedData = data.filter(d => selectedCurves.includes(d.id) || selectedCurves.includes('all'));

      selectedData.forEach(d => {
        svg.append('path')
          .datum(d.coordinates)
          .attr('class', 'curve')
          .attr('d', curve)
          .style('stroke', 'steelblue')
          .style('fill', 'none');
      });

      // Add x-axis
      svg.append('g')
        .attr('transform', `translate(0, ${innerHeight})`)
        .call(d3.axisBottom(xScale));

      // Add y-axis
      svg.append('g')
        .call(d3.axisLeft(yScale));
    };

    drawChart();
  }, [selectedCurves]);

  return (
    <div>
      {/* Render checkbox and dropdown elements to select curves */}
      <div ref={chartRef}></div>
    </div>
  );
};

export default CurveChart;
