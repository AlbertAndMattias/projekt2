
let margin, aspect, fWidth, fHeight, width, height, chartContainer, chartCanvas, xScale, yScale, xAxis, yAxis, pathGen, chartPaths, chartDots, dotRadius, bandwidth, xLabeldx, xLabeldy, xLabelRot;

// Configure and render chart.
// Chart init function.
function initChart(data) {

  console.log(data);

  // Sizing variables.
  margin = { top: 32, right: 32, bottom: 64, left: 48 },
    aspect = 2,
    fWidth = $("#chart-container").width(),
    fHeight = fWidth / aspect,
    width = fWidth - margin.right - margin.left,
    height = fHeight - margin.top - margin.bottom,
    dotRadius = 2.5,
    xLabeldx = -10,
    xLabeldy = -2,
    xLabelRot = -80;

  // Get chart container.
  chartContainer = d3.select("#chart-container");

  // Append svg canvas.
  chartCanvas = chartContainer.append("svg")
    .attr("id", "chart-canvas")
    .attr("width", fWidth)
    .attr("height", fHeight)
  .append("g")
    .attr("transform", `translate(${ margin.left } ${ margin.top })`);

  // Scale x axis.
  xScale = d3.scaleBand()
    .domain(data.map(d => { return d.time; }))
    .range([0, width]);

  bandwidth = xScale.bandwidth();

  // Scale y axis.
  yScale = d3.scaleLinear()
    .domain([d3.min(data.map(d => { return d.low; })), d3.max(data.map(d => { return d.high; }))])
    .range([height, 0])
    .nice();

  // Path generator.
  pathGen = d3.line()
    .x(d => { return xScale(d.time); })
    .y(d => { return yScale(d.mean); });

  // Path group.
  chartPaths = chartCanvas.append("g")
    .attr("id", "chart-paths")
    .attr("transform", `translate(${ bandwidth / 2 } 0)`);
    
  // Candlesticks group.
  chartCandles = chartCanvas.append("g")
    .attr("id", "chart-candles")
    .attr("transform", `translate(${ bandwidth / 2 } 0)`);

  // Dot group.
  chartDots = chartCanvas.append("g")
    .attr("id", "chart-dots")
    .attr("transform", `translate(${ bandwidth / 2 } 0)`);


  // Append path.
  chartPaths.append("path")
    .attr("d", pathGen(data));

  // Append candlesticks.
  chartCandles.selectAll(".chart-candle")
    .data(data)
    .enter()
    .append("line")
      .attr("x1", d => { return xScale(d.time); })
      .attr("y1", d => { return yScale(d.high); })
      .attr("x2", d => { return xScale(d.time); })
      .attr("y2", d => { return yScale(d.low); })
      .classed("chart-candle", true);

  // Append dots.
  chartDots.selectAll(".chart-dot")
    .data(data)
    .enter()
    .append("circle")
      .attr("cx", d => { return xScale(d.time); })
      .attr("cy", d => { return yScale(d.mean); })
      .attr("r", dotRadius)
      .classed("chart-dot", true);

  // Append x axis.
  xAxis = chartCanvas.append("g")
    .attr("id", "x-axis")
    .attr("transform", `translate(0 ${ height })`)
    .call(d3.axisBottom(xScale))
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", xLabeldx)
      .attr("dy", xLabeldy)
      .attr("transform", `rotate(${ xLabelRot })`);

  // Append y axis.
  yAxis = chartCanvas.append("g")
    .attr("id", "y-axis")
    .call(d3.axisLeft(yScale));

  console.log("Chart initialised.");
}

// Chart update function.
function updateChart(data) {

  console.log(data);

  // Scale x axis.
  xScale = d3.scaleBand()
    .domain(data.map(d => { return d.time; }))
    .range([0, width]);

  bandwidth = xScale.bandwidth();

  // Scale y axis.
  yScale = d3.scaleLinear()
    .domain([d3.min(data.map(d => { return d.low; })), d3.max(data.map(d => { return d.high; }))])
    .range([height, 0])
    .nice();
    
  chartPaths.select("path").transition()
    .attr("d", pathGen(data));
  
  chartCanvas.select("#chart-paths").transition()
    .attr("transform", `translate(${ bandwidth / 2} 0)`);

  chartCanvas.select("#chart-candles").transition()
    .attr("transform", `translate(${ bandwidth / 2} 0)`);

  chartCanvas.select("#chart-dots").transition()
    .attr("transform", `translate(${ bandwidth / 2} 0)`);

  let updateCandles = chartCanvas.select("#chart-candles").selectAll(".chart-candle")
    .data(data);

  updateCandles.enter()
    .append("line")
      .attr("x1", d => { return xScale(d.time); })
      .attr("y1", d => { return yScale(d.high); })
      .attr("x2", d => { return xScale(d.time); })
      .attr("y2", d => { return yScale(d.low); })
      .classed("chart-candle", true);
  
  updateCandles.exit()
    .remove();
    
  let updateDots = chartCanvas.select("#chart-dots").selectAll(".chart-dot")
    .data(data);
    
  updateDots.enter()
    .append("circle")
    .attr("cx", d => { return xScale(d.time); })
    .attr("cy", d => { return yScale(d.mean); })
    .attr("r", 0)
    .classed("chart-dot", true);
    
  updateDots.exit()
    .remove();

  chartCanvas.select("#chart-candles").selectAll(".chart-candle").transition()
    .attr("x1", d => { return xScale(d.time); })
    .attr("y1", d => { return yScale(d.high); })
    .attr("x2", d => { return xScale(d.time); })
    .attr("y2", d => { return yScale(d.low); });

  chartCanvas.select("#chart-dots").selectAll(".chart-dot").transition()
    .attr("cx", d => { return xScale(d.time); })
    .attr("cy", d => { return yScale(d.mean); })
    .attr("r", dotRadius);
  
  // Append x axis.
  chartCanvas.select("#x-axis").transition()
    
    .call(d3.axisBottom(xScale))
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", xLabeldx)
      .attr("dy", xLabeldy)
      .attr("transform", `rotate(${ xLabelRot })`);

  // Append y axis.
  chartCanvas.select("#y-axis").transition()
    
    .call(d3.axisLeft(yScale));

  console.log("Chart updated.");
}

// Load chart on document ready.
$(document).ready(() => {
  getData($("#crypto-field").val(), $("#currency-field").val(), $("#days-field").val()).then((dataObj) => { 
    initChart(dataObj.data);
  });
});

// Update chart on button click.
$("#update-button").click(() => {
  getData($("#crypto-field").val(), $("#currency-field").val(), $("#days-field").val()).then((dataObj) => { 
    updateChart(dataObj.data);
  });
});