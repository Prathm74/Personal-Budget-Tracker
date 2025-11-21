import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

export default function BudgetCompareChart({ budget, spent }) {
  const ref = useRef();

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const w = 300, h = 300;

    const data = [
      { label: "Budget", value: Number(budget) },
      { label: "Spent", value: Number(spent) },
    ];

    const colors = d3.scaleOrdinal()
      .range(["#3b82f6", "#fb923c"]);

    const x = d3.scaleBand()
      .domain(data.map((d) => d.label))
      .range([0, w])
      .padding(0.4);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)])
      .range([h, 0]);

    const g = svg
      .attr("width", w)
      .attr("height", h + 40)
      .append("g")
      .attr("transform", "translate(20, 20)");

    g.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d) => x(d.label))
      .attr("y", (d) => y(d.value))
      .attr("width", x.bandwidth())
      .attr("height", (d) => h - y(d.value))
      .attr("fill", (d) => colors(d.label));

  }, [budget, spent]);

  return (
    <div className="card">
      <h4>Budget vs Spent</h4>
      <svg ref={ref}></svg>
    </div>
  );
}
