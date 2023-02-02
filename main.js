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

function get_table_data(selector) {
    const table = document.querySelector(selector); // .css-1ki54i
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
                  }
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

waitForElm('.css-1ki54i').then((elm) => {
    console.log("found element!");
    var data = get_table_data(".css-1ki54i");
    insert_chart("#chakra-modal--body-11", data); // insert before this
});

window.addEventListener('load', function load(e){
    window.removeEventListener('load', load, false);
    console.log("running ...");

    this.setTimeout(() => console.log("Function ran with timeout"), 2000)
}, false);


// parent: .css-lno4gd
// table: .css-1ki54i


// children, childNodes, cells