# CoventureTakeHome
Conventure Take Home

This take home is for Conventure. Note: I don't have any experience or background in Finance. However, I did the best I can to learn the the concepts of finance to do this take home and try really hard to focus on the programming aspect of the take home.

Nevertheless, I have enjoyed this assignment. Learning the fundamentals of finance and getting reacquianted with data visualization libraries like Plot.ly was so much fun. Hopefully I will get to do more such projects in the future with Coventure!

If you have any questions or concerns or any bugs in the code, please contact me at brandvi1994@gmail.com! Enjoy!


Part 1:
1) Go to Yahoo Finance and download a csv file of daily historical data on AAPL from Jan 1, 2002-Jan 1, 2010.

- [AAPL.csv](https://github.com/bvi1994/CoventureTakeHome/blob/master/AAPL.csv)

2) Build a moving average strategy that tests a 5-day and 20-day moving average crossover.  The strategy should go long when the 5-day moving average crosses above the 20-day moving average and short when the 5-day moving average crosses below the 20-day moving average.

- [movingaverage.csv](https://github.com/bvi1994/CoventureTakeHome/blob/master/movingAverage.csv) 

In the 'longorshort' column of the csv, the date as to whether to go 'long' or 'short' is given. 

3) Build another strategy that buys AAPL when it closes down 3 days in a row and then sells the stock 1, 5, and 10 days later.  

- [3daystrat.csv](https://github.com/bvi1994/CoventureTakeHome/blob/master/3daystrat.csv)

Part 2: 
4) Graph the equity curve of the strategies

- [Equity Graph for Long and Short](https://plot.ly/~bvi1/77/equity-graph-for-apple/#/)   
- [Equity Graph for 1, 3 and 10 day sales](https://plot.ly/~bvi1/77/equity-curve-for-1-3-10-day-sales/#/)

5) List each trade in the strategy

- [Trade Dates for Long and Short](https://github.com/bvi1994/CoventureTakeHome/blob/master/3dayMATrades.csv)   
- [Trade Dates for 1, 3 and 10 day sales](https://github.com/bvi1994/CoventureTakeHome/blob/master/3daystrat.csv)

6) What 3 metrics would you analyse to determine whether the strategy was good or bad (not including the overall PNL of the strategy)?

- The total return in percentage 
- Volotality/Stablity of investment
- Risk Adjust Returns (Example: Sharpe's ratio)

7) How would you allocate capital between the two strategies? 

I would focus more on allocating capital on the long-short sale since in terms of absolute growth, that seems to be more profitable than going through 3-days of downward prices. 
