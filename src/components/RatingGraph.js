import React, { Component } from 'react';
import { scaleLinear, scaleTime } from 'd3-scale';
import { extent } from 'd3-array';
import { axisLeft, axisBottom } from 'd3-axis';
import { select } from 'd3-selection';
import { line } from 'd3-shape';

export default class RatingGraph extends Component {
  componentDidMount() {
    this.drawChart();
  }

  componentDidUpdate() {
    select(this.node).selectAll("*").remove();
    this.drawChart();
  }

  drawChart() {
    const { ratings } = this.props;

    const node = this.node
    const { height, width } = node.getBoundingClientRect();
    const margins = {
      bottom: 20,
      left: 50
    };

    const xExtent = extent(ratings, d => d.date);
    const yExtent = extent(ratings, d => d.rating);

    const xScale = scaleTime()
      .domain([xExtent[0], xExtent[1]])
      .range([margins.left, width])
    const yScale = scaleLinear()
      .domain([yExtent[0], yExtent[1]])
      .range([height, margins.bottom])

    const xAxis = axisBottom(xScale).ticks(6);
    const yAxis = axisLeft(yScale).ticks(5);

    select(node).append('g')
      .attr('transform', `translate(0, ${height - margins.bottom})`)
      .call(xAxis);

    select(node).append('g')
      .attr('transform', `translate(${margins.left}, 0)`)
      .call(yAxis);

    const l = line()
      .x(function(d) { return xScale(d.date); })
      .y(function(d) { return yScale(d.rating); });

    select(node).append('path')
      .datum(ratings)
      .attr('fill', 'none')
      .attr('stroke', 'black')
      .attr('d', l);
  }

  render() {
    return (
      <svg ref={ref => this.node = ref} />
    );
  }
}
