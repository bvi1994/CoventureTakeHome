const fs = require('fs');
const parse = require('csv-parse');
const csv = require('csv-parser');
const Plotly = require('plotly')(process.env.PLOTLY_USERNAME, process.env.PLOTLY_API_KEY);

const appleData = '/Users/bvi1994/Desktop/Coventure_Brandon_Vi/3daystrat.csv';

let date = [], oneDay = [], threeDay = [], tenDay = [];

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
      title: 'Equity Curve for 1, 3, 10 day sales',
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
      range: [-10, 10],
      title: 'Price',
      titlefont: {
        family: 'Courier New, monospace',
        size: 18,
        color: '#7f7f7f'
      }
    }
  }
};

let curve1day = {
  x: [],
  y: [],
  line: {color: 'red'},
  type: 'scatter',
  mode: 'markers+lines',
  name: 'One Day Sale',
}

let curve3day = {
  x: [],
  y: [],
  line: {color: 'green'},
  type: 'scatter',
  mode: 'markers+lines',
  name: 'Three Day Sale',
}

let curve10day = {
  x: [],
  y: [],
  line: {color: 'blue'},
  type: 'scatter',
  mode: 'markers+lines',
  name: 'Ten Day Sale',
}

let readStream = fs.createReadStream(appleData)
    .pipe(csv())
    .on('data', (data) => {
        curve1day.x.push(data['date']);
        curve3day.x.push(data['date']);
        curve10day.x.push(data['date']);
        curve1day.y.push(data['1_day_sale']);
        curve3day.y.push(data['3_day_sale']);
        curve10day.y.push(data['10_day_sale']);
    })
    .on('end', () => {
        const data = [curve1day, curve3day, curve10day];
        console.log(data);
        Plotly.plot(data, graphOptions, function(err, msg) {
          if(err){
            return console.log(err);
          }
          console.log(msg);
        });
    })
