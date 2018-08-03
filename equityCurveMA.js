const fs = require('fs');
const parse = require('csv-parse');
const csvWrite = require('fast-csv');
const ws = fs.createWriteStream('3dayMATrades.csv');
const Plotly = require('plotly')(process.env.PLOTLY_USERNAME, process.env.PLOTLY_API_KEY);

const appleData = '/Users/bvi1994/Desktop/Coventure_Brandon_Vi/movingAverage.csv';

let csvData=[];
let short = true, long = false;
let trades = [];

const graphOptions = {
  fileopt: "overwrite",
  dragmode: "lasso",
  margin: {
    r: 10,
    t: 25,
    b: 40,
    l: 60
  },
  showlegend: true,
  layout: {
    title: 'Equity Graph for Apple',
    xaxis: {
      domain: [0, 1],
      range: ['01-02-02', '12-31-09'],
      rangeslider: {range: ['01-02-02', '12-31-09']},
      title: 'Sell Date',
      titlefont: {
        family: 'Courier New, monospace',
        size: 18,
        color: '#7f7f7f'
      }
    },
    yaxis: {
      domain: [0, 1],
      range: [0, 31],
      title: 'Equity per share',
      titlefont: {
        family: 'Courier New, monospace',
        size: 18,
        color: '#7f7f7f'
      }
    }
  }
};

let trace1 = {
  x: [],
  y: [],
  line: {color: '#0000FF'},
  type: 'scatter',
  mode: 'markers+lines',
  name: 'Equity Line',
}

fs.createReadStream(appleData)
  .pipe(parse({delimiter: ','}))
  .on('data', function(csvrow) {
      // console.log(csvrow);
      //do something with csvrow
      csvData.push(csvrow);
  })
  .on('end',function() {
    //do something wiht csvData
    let startingCapital = Number(csvData[1][5]).toFixed(3);
    for(let i = 2; i < csvData.length; i++){
      if(Number(csvData[i][5]).toFixed(3) > Number(csvData[i][6]).toFixed(3)){
        if(short){
          short = !short;
          long = !long;
          startingCapital -= Number(csvData[i][4]);
          trades.push([csvData[i][0], startingCapital.toFixed(3), 'buy']);
           // console.log([csvData[i][0], startingCapital.toFixed(3), 'buy'])
        }
      }
      if(Number(csvData[i][5]).toFixed(3) < Number(csvData[i][6]).toFixed(3)){
        if(long){
          short = !short;
          long = !long;
          startingCapital += Number(csvData[i][1]);
          trades.push([csvData[i][0], startingCapital.toFixed(3), 'sell']);
          // console.log([csvData[i][0], startingCapital.toFixed(3), 'sell']);
          trace1.x.push(csvData[i][0]);
          trace1.y.push(startingCapital);
        }
      }
    }
    console.log(trades);
    const data = [trace1];
    Plotly.plot(data, graphOptions, function(err, msg) {
      if(err){
        return console.log(err);
      }
      console.log(msg);
    });
    csvWrite.write(trades, {headers: true}).pipe(ws);
});
