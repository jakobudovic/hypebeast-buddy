console.log("The extension is up and running");

function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

function get_table_data(table) {
    // const table = document.querySelector(selector); // .css-1ki54i
    // const table = document.querySelector(".css-1ki54i");
    const table_arr = Array.from(table.rows).slice(1); // remove header
    const arr_data = table_arr
                            .map(row => row.cells) 
                            .map(row => Array.from(row))
                            .map(row => row.flatMap(cell => cell.innerText))
    console.log("arr_data");
    console.log(arr_data);
    return arr_data
}

function insert_chart(selector, timeSeriesData) {
    // var timeSeriesData = [
    //     { date: new Date("2022-01-01"), value: 100 },
    //     { date: new Date("2022-02-01"), value: 200 },
    //     { date: new Date("2022-03-01"), value: 150 },
    // ];

    console.log("timeSeriesData");
    console.log(timeSeriesData);

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
                borderWidth: 1,
            },
        ],
    };

    // Create the chart
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
            }
          }
    });
    console.log("arr_data");

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

function display_chart(table) {
    var table_data = get_table_data(table);
    insert_chart("#chakra-modal--body-11", table_data);
}

window.addEventListener('load', function load(e){
    window.removeEventListener('load', load, false);
    console.log("running ...");

    remove_cookie_product_visits("stockx_product_visits")
    this.setTimeout(() => console.log("ran with delay"), 1000);
}, false);


function remove_cookie_product_visits(cookie_name) {
    console.log("removing stockx_product_visits cookie ...");
    document.cookie = `${cookie_name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}


// parent: .css-lno4gd
// table: .css-1ki54i


// children, childNodes, cells