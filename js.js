
$(document).ready(function(){
    $('input[id="start-date"]').change(function(){
        alert(this.value);         //Date in full format alert(new Date(this.value));
        var inputDate = new Date(this.value);
    });
});
$(document).ready(function(){
    $('input[id="end-date"]').change(function(){
        alert(this.value);         //Date in full format alert(new Date(this.value));
        var inputDate = new Date(this.value);
    });
});

function drawCharts(crypto, currency) {


    d3.json('https://api.cryptonator.com/api/full/'+crypto+'-'+currency).then(function (dataArray, status) {

    console.log(dataArray);
    console.log(dataArray.ticker);


    })
}