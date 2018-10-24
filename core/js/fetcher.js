function getData(crypto, currency, days) {

    let historicalData = {
        data: [],
        timefrom: 0,
        timeto: 0
    };

    return d3.json(`https://min-api.cryptocompare.com/data/histoday?fsym=${ crypto }&tsym=${ currency }&limit=${ days - 1 }`).then((dataArray, status) => {
        
        historicalData.timeto = dataArray.TimeTo;
        historicalData.timefrom = dataArray.TimeFrom;

        for (e of dataArray.Data) {

            historicalData.data.push({
                time: new Date(e.time * 1000).toLocaleDateString("fi-FI"),
                close: e.close,
                high: e.high,
                low: e.low,
                open: e.open,
                mean: (e.high + e.low) / 2,
                volumefrom: e.volumefrom,
                volumeto: e.volumeto
            });
        }
        return historicalData;
    });
}