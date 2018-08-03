const Plotly = require('plotly')(process.env.PLOTLY_USERNAME, process.env.PLOTLY_API_KEY);
const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

const appleData = '/Users/bvi1994/Desktop/Coventure_Brandon_Vi/AAPL.csv';

const graphOptions = {
  fileopt: "overwrite",
  dragmode: "lasso",
  // dragmode: 'zoom',
  margin: {
    r: 10,
    t: 25,
    b: 40,
    l: 60
  },
  layout: {
      title: 'CandleStick graph with Moving Average',
      xaxis: {
      domain: [0, 1],
      range: ['01-02-02', '12-31-09'],
      rangeslider: {range: ['01-02-02', '12-31-09']},
      title: 'Date',
      titlefont: {
        family: 'Courier New, monospace',
        size: 18,
        color: '#7f7f7f'
      }
    },
    yaxis: {
      domain: [0, 1],
      range: [0, 31],
      title: 'Price',
      titlefont: {
        family: 'Courier New, monospace',
        size: 18,
        color: '#7f7f7f'
      }
    }
  }
};

let trace1 = {
  // The main candlestick chart
  close: [],
  high: [],
  low: [],
  open: [],
  x: [],
  decreasing: {line: {color: '#FF0000'}},
  increasing: {line: {color: '#006400'}},
  line: {color: 'rgba(31,119,180,1)'},
  type: 'candlestick',
  opacity: 0.5,
};

let trace2 = {
  // The 5 day moving average
  x: [],
  y: [],
  LastEMA5: '',
  EMA5weighfactor: 1/3,
  // movingAverage: [],
  line: {color: '#0000FF'},
  type: 'scatter',
  mode: 'markers+lines',
  name: '5 EMA',
}

let trace3 = {
  // The 5 day moving average
  x: [],
  y: [],
  LastEMA20: '',
  EMA20weighfactor: 2/21,
  // movingAverage: [],
  line: {color: '#000000'},
  type: 'scatter',
  mode: 'markers+lines',
  name: '20 EMA',
  text: [],
  textposition: "bottom",
  textfont: {
    family: "sans serif",
    size: 18,
    color: "#ff7f0e"
  },
}

let readStream = fs.createReadStream(appleData)
  .pipe(csv())
  .on('data', (data) => {
    trace1.x.push(data['Date']);
    trace1.open.push(data['Open']);
    trace1.close.push(data['Close']);
    trace1.high.push(data['High']);
    trace1.low.push(data['Low']);
    if(trace1.close.length > 4){
      trace2.x.push(data['Date']);
      let currentEMA5 = trace1.close[trace1.close.length - 1];
      if(trace1.close.length > 5){
        currentEMA5 = currentEMA5 * trace2.EMA5weighfactor + trace2.LastEMA5 * (1 - trace2.EMA5weighfactor);
      }
      trace2.LastEMA5 = currentEMA5;
      trace2.y.push(currentEMA5);
    }
    if(trace1.close.length > 19){
      trace3.x.push(data['Date']);
      let currentEMA20 = trace1.close[trace1.close.length - 1];
      if(trace1.close.length > 20){
        currentEMA20 = currentEMA20 * trace3.EMA20weighfactor + trace3.LastEMA20 * (1 - trace3.EMA20weighfactor);
      }
      trace3.LastEMA20 = currentEMA20;
      trace3.y.push(currentEMA20);
      if(trace3.y[trace3.y.length - 1] > trace2.y[trace2.y.length -1]){
        trace3.text.push('Short');
      } else {
        trace3.text.push('Long');
      }
    }
  })
  .on('end', () => {
    const data = [trace1, trace2, trace3];
    Plotly.plot(data, graphOptions, function(err, msg) {
      if(err){
        return console.log(err);
      }
      console.log(msg);
    });
  })
