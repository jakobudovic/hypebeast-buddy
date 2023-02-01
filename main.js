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
}

waitForElm('.css-1ki54i').then((elm) => {
    console.log("found element!");
    get_table_data(".css-1ki54i");
});

window.addEventListener('load', function load(e){
    window.removeEventListener('load', load, false);
    console.log("running ...");

    var timeSeriesData = [
        { date: new Date("2022-01-01"), value: 100 },
        { date: new Date("2022-02-01"), value: 200 },
        { date: new Date("2022-03-01"), value: 150 },
    ];

    var canvas = document.createElement("canvas");
    canvas.id = "myChartJS";
    document.body.insertBefore(canvas, document.body.firstChild);
    var ctx = document.getElementById("myChartJS").getContext("2d");

    // Format the time series data for Chart.js
    var chartData = {
    labels: timeSeriesData.map(function (d) { return d.date.toDateString(); }),
    datasets: [{
        label: "Value",
            data: timeSeriesData.map(function (d) { return d.value; }),
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
                xAxes: [{
                    type: "time",
                    distribution: "series",
                }],
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                    },
                }],
            },
        },
    });

    this.setTimeout(() => console.log("Function ran with timeout"), 2000)
}, false);


// parent: .css-lno4gd
// table: .css-1ki54i


// children, childNodes, cells