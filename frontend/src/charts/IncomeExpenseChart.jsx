import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

export default function IncomeExpenseChart({ data }) {
  const ref = useRef();

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const w = 300, h = 300;
    const radius = Math.min(w, h) / 2;

    const colors = d3.scaleOrdinal()
      .range(["#22c55e", "#ef4444"]);

    const arc = d3.arc().innerRadius(60).outerRadius(radius);
    const pie = d3.pie().value((d) => d.value);

    const g = svg
      .attr("width", w)
      .attr("height", h)
      .append("g")
      .attr("transform", `translate(${w / 2}, ${h / 2})`);

    g.selectAll("path")
      .data(pie(data))
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", (d) => colors(d.data.label))
      .style("opacity", 0.9);

  }, [data]);

  return (
    <div className="card">
      <h4>Income vs Expense</h4>
      <svg ref={ref}></svg>
    </div>
  );
}
