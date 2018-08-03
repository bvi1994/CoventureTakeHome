const fs = require('fs');
const ws = fs.createWriteStream('3daystrat.csv');
const csv = require('csv-parser');
const csvWrite = require('fast-csv');
const path = require('path');

const appleData = '/Users/bvi1994/Desktop/Coventure_Brandon_Vi/AAPL.csv';

let date = [], open = [], close = [], high = [], low = [];

// let sellStr = []; // Sell strategy array

let buyDate = [], oneDaySale = [], threeDaySale = [], tenDaySale = [];

let csvArray = [['date', '1_day_sale', '3_day_sale', '10_day_sale']];


let readStream = fs.createReadStream(appleData)
  .pipe(csv())
  .on('data', (data) => {
    date.push(data['Date']);
    open.push(data['Open']);
    close.push(data['Close']);
    high.push(data['High']);
    low.push(data['Low']);
    }
  )
  .on('end', () => {
    for(let i = 3; i < date.length; i++){
      if(close[i] < close[i-1]){
        if(close[i-2] < close[i-1]){
          if(close[i-3] < close[i-2]){
              csvArray.push([date[i], (close[i+1] - close[i]).toFixed(3), (close[i+3] - close[i]).toFixed(3), (close[i+10] - close[i]).toFixed(3)]);
          }
        }
      }
    }
    csvWrite.write(csvArray, {headers: true}).pipe(ws);
  }
)
