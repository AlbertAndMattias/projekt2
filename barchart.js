let barChartContainer,
  barChartCanvas,
  barChartXScale, barChartYScale,
  barChartXAxis, barChartYAxis,
  barChartMargin,
  barChartFWidth, barChartFHeight,
  barChartWidth, barChartHeight;

function initBarChart(data) {

  console.log(data);

  barChartMargin = {top: 32, right: 32, bottom: 64, left: 80},
    barChartFWidth = $("#barchart-container").width(),
    barChartFHeight = $("#barchart-container").height(),
    barChartWidth = barChartFWidth - barChartMargin.right - barChartMargin.left,
    barChartHeight = barChartFHeight - barChartMargin.top - barChartMargin.bottom;

  barChartContainer = d3.select("#barchart-container");

  barChartContainer.append("svg")
    .attr("id", "barchart-canvas")
    .attr("width", barChartFWidth)
    .attr("height", barChartFHeight)
    .append("g")
      .attr("transform", `translate(${barChartMargin.left}, ${barChartMargin.top})`)

  barChartCanvas = barChartContainer.select("svg").select("g");

  barChartXScale = d3.scaleBand()
    .domain(data.map(d => { return d.time; }))
    .range([0, barChartWidth])
    .padding(.2);

  barChartYScale = d3.scaleLinear()
    .domain([0, d3.max(data.map(d => { return d.volumeto; }))])
    .range([barChartHeight, 0])
    .nice();

  barChartCanvas.append("g")
    .attr("id", "bar-x-axis")
    .attr("transform", `translate(0, ${barChartHeight})`)
    .call(d3.axisBottom(barChartXScale))
    .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", -10)
      .attr("dy", -2)
      .attr("transform", `rotate(-80)`);

  barChartCanvas.append("g")
    .attr("id", "bar-y-axis")
    .call(d3.axisLeft(barChartYScale))

  barChartXAxis = barChartCanvas.select("#bar-x-axis");
  barChartYAxis = barChartCanvas.select("#bar-y-axis");

  barChartCanvas.selectAll(".bar")
    .data(data)
    .enter().append("rect")
      .classed("bar", true)
      .attr("x", d => { return barChartXScale(d.time); })
      .attr("y", d => { return barChartYScale(d.volumeto); })
      .attr("width", barChartXScale.bandwidth())
      .attr("height", d => { return barChartHeight - barChartYScale(d.volumeto); });
}

function updateBarChart(data) {

  barChartXScale = d3.scaleBand()
    .domain(data.map(d => { return d.time; }))
    .range([0, barChartWidth])
    .padding(.2);

  barChartYScale = d3.scaleLinear()
    .domain([0, d3.max(data.map(d => { return d.volumeto; }))])
    .range([barChartHeight, 0])
    .nice();

  barChartXAxis.transition()
    .attr("transform", `translate(0, ${barChartHeight})`)
    .call(d3.axisBottom(barChartXScale))
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", -10)
      .attr("dy", -2)
      .attr("transform", `rotate(-80)`);

  barChartYAxis.transition()
    .call(d3.axisLeft(barChartYScale));

  let updateBarChartBars = barChartCanvas.selectAll(".bar")
    .data(data);

  updateBarChartBars.enter().append("rect")
    .classed("bar", true)
    .attr("x", d => { return barChartXScale(d.time); })
    .attr("y", d => { return barChartYScale(d.volumeto); })
    .attr("width", barChartXScale.bandwidth())
    .attr("height", d => { return barChartHeight - barChartYScale(d.volumeto); });

  updateBarChartBars.exit().remove();

  barChartCanvas.selectAll(".bar").transition()
    .attr("x", d => { return barChartXScale(d.time); })
    .attr("y", d => { return barChartYScale(d.volumeto); })
    .attr("width", barChartXScale.bandwidth())
    .attr("height", d => { return barChartHeight - barChartYScale(d.volumeto); });
}

function resizeBarChart(data) {

  barChartFWidth = $("#barchart-container").width(),
  barChartFHeight = $("#barchart-container").height(),
  barChartWidth = barChartFWidth - barChartMargin.right - barChartMargin.left,
  barChartHeight = barChartFHeight - barChartMargin.top - barChartMargin.bottom;

  barChartContainer.select("svg").transition()
    .attr("width", barChartFWidth)
    .attr("height", barChartFHeight);

  barChartXScale = d3.scaleBand()
    .domain(data.map(d => { return d.time; }))
    .range([0, barChartWidth])
    .padding(.2);

  barChartYScale = d3.scaleLinear()
    .domain([0, d3.max(data.map(d => { return d.volumeto; }))])
    .range([barChartHeight, 0])
    .nice();

  barChartXAxis.transition()
    .attr("transform", `translate(0, ${barChartHeight})`)
    .call(d3.axisBottom(barChartXScale))
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", -10)
      .attr("dy", -2)
      .attr("transform", `rotate(-80)`);

  barChartYAxis.transition()
    .call(d3.axisLeft(barChartYScale));

  barChartCanvas.selectAll(".bar").transition()
    .attr("x", d => { return barChartXScale(d.time); })
    .attr("y", d => { return barChartYScale(d.volumeto); })
    .attr("width", barChartXScale.bandwidth())
    .attr("height", d => { return barChartHeight - barChartYScale(d.volumeto); });
}