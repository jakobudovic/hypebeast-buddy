function get_table_data(table) {
  // asks & bids : Quantity, size, bid/ask price
  // sales : date, time, size, sale price
  const table_arr = Array.from(table.rows).slice(1); // remove header
  return table_arr.map(row => row.cells) 
                  .map(row => Array.from(row))
                  .map(row => row.flatMap(cell => cell.innerText))
}

function insert_chart(selector, timeSeriesData) {
    console.log("timeSeriesData");
    console.log(timeSeriesData);

    if (timeSeriesData[0].length < 4) {
        return; // if "asks" or "bids" views open, skip chart insertion
    }

    const parentDiv = document.createElement('div');
    parentDiv.style.padding = '0px 24px';

    const canvas = document.createElement('canvas');
    canvas.id = "myChartJS";
    parentDiv.appendChild(canvas);

    // chakra-modal--body-27 or chakra-modal-11
    document.querySelector("#chakra-modal-11").insertBefore(parentDiv, document.querySelector(selector));
    var ctx = document.getElementById("myChartJS").getContext("2d");

    // Format the time series data for Chart.js
    var chartData = {
        labels: timeSeriesData.map(item => new Date(`${item[0]} ${item[1]}`)),
        datasets: [{
            label: "Shoe price",
            data: timeSeriesData.map(x => parseInt(x[3].slice(1))),
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 3,
            },
        ],
    };

    var chart = new Chart(ctx, {
        type: "line",
        data: chartData,
        options: {
            scales: {
              x: {
                type: 'time',
                time: {
                  displayFormats: {
                    'minute': 'd MMM, h:m a'
                  },
                  tooltipFormat: "d MMM, H:mm a",
                },
                ticks: {
                  maxTicksLimit: 5,
                },
              }
            },
            elements: {
                point: {
                    pointBorderWidth: 0.5, // less background at chart points
                },
                line: {
                    tension: 0.05
                }
            },
            plugins: {
                tooltip: {
                  callbacks: {
                    label: function(tooltipItem) {
                      return `${tooltipItem.dataset.label}: ${timeSeriesData[tooltipItem.dataIndex][3]}`
                    },
                    footer: function(tooltipItems) {
                      tooltipItem = tooltipItems[0];
                      return `Size: ${timeSeriesData[tooltipItem.dataIndex][2]}`
                    }
                  }
                },
              }
          }
    });
}

function display_chart(table) {
    var table_data = get_table_data(table);
    insert_chart("#chakra-modal--body-11", table_data);
}

function remove_cookie_product_visits(cookie_name) {
    document.cookie = `${cookie_name}=1; expires=Sun, 31 Dec 2033 12:00:00 UTC; path=/;`;
}

const targetNode = document.body;
const observer = new MutationObserver((mutationsList) => {
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList') {
      for (const node of mutation.addedNodes) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const tableNodes = node.querySelectorAll('.css-1ki54i');
          if (tableNodes.length) {
            for (const tableNode of tableNodes) {
                display_chart(tableNode);
                return;
            }
          }
        }
      }
    }
  }
});

observer.observe(targetNode, { childList: true, subtree: true });

window.addEventListener('load', function load(e){
    window.removeEventListener('load', load, false);
    remove_cookie_product_visits("stockx_product_visits")
    this.setTimeout(() => console.log("ran with delay"), 1000);
}, false);