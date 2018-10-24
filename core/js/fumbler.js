let currentData;

// Load chart on document ready.
$(document).ready(() => {
  getData($("#crypto-field").val(), $("#currency-field").val(), $("#days-field").val()).then((dataObj) => { 
    currentData = dataObj.data;
    initChart(currentData);
    initBarChart(currentData);
  });
});

// Update chart on button click.
$("#update-button").click(() => {
  getData($("#crypto-field").val(), $("#currency-field").val(), $("#days-field").val()).then((dataObj) => { 
    currentData = dataObj.data;
    updateChart(currentData);
    updateBarChart(currentData);
  });
});

// Update chart on window resize.
$(window).resize(() => {
  resizeChart(currentData);
  resizeBarChart(currentData);
});