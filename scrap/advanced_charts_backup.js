const ctx = document.getElementById('myChart');
var sale_dates = all_sales.map(item => new Date(`${item[0]} ${item[1]}`));

// var aggregatedData = {};
// all_sales.forEach(function(sale) {
//   var date = new Date(sale[0] + ' ' + sale[1]);
//   var size = sale[2];
//   var price = parseFloat(sale[3].substring(1));
//   if (!aggregatedData[size]) {
//       aggregatedData[size] = [];
//   }
//   aggregatedData[size].push([date, price]);
// });
// console.log(aggregatedData);

// var datasets = [];
// var colors = ['red', 'blue', 'green', 'yellow', 'purple'];
// var i = 0;
// for (var size in aggregatedData) {
//     datasets.push({
//         label: size,
//         data: aggregatedData[size],
//         borderColor: colors[i++ % colors.length],
//         fill: false,
//         lineTension: 0,
//         pointRadius: 5
//     });
// }

// console.log(datasets);

var aggregatedData = all_sales.reduce((acc, sale) => {
  var date = new Date(`${sale[0]} ${sale[1]}`);
  var size = sale[2];
  var price = parseFloat(sale[3].slice(1));

  if (!acc[size]) {
    acc[size] = {
      prices: [price],
      dates: [date]
    };
  } else {
    acc[size].prices.push(price);
    acc[size].dates.push(date);
  }

  return acc;
}, {});

console.log(aggregatedData);

var colors = [
  "#ff6384",
  "#36a2eb",
  "#ffce56",
  "#4bc0c0",
  "#9966ff"
];
var datasets = Object.keys(aggregatedData).map((size, i) => ({
  label: `Shoe size: ${size}`,
  backgroundColor: colors[i],
  borderColor: colors[i],
  data: aggregatedData[size].prices,
  xAxisID: "x-axis-0",
  yAxisID: "y-axis-0",
  fill: false
}));

console.log(datasets);



new Chart(ctx, {
  type: 'line',
  data: {
    datasets: datasets,
    labels: sale_dates,
    // labels: sale_dates,

    //   [
    //       sale_dates[0],
    //       sale_dates[Math.floor(sale_dates.length / 4)],
    //       sale_dates[Math.floor(sale_dates.length / 2)],
    //       sale_dates[Math.floor(sale_dates.length * 3 / 4)],
    //       sale_dates[sale_dates.length - 1], 
    // ],

    // datasets: [{
    //   label: 'Shoe price',
    //   data: all_sales.map(x => parseInt(x[3].slice(1))),
    //   borderWidth: 3
    // }]
  },
  options: {
      scales: {
          xAxes: [{
              type: 'time',
              time: {
                  unit: 'day'
              },
              gridLines: {
                  display: false
              },
              ticks: {
                  source: 'labels',
                  callback: function(value, index, values) {
                      return value.toLocaleDateString();
                  }
              }
          }]
      }
  }
});