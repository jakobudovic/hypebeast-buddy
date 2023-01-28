

console.log("The extension is up and running2 ");

// var images = document.getElementsByTagName('img')

// for (elt of images){
//    elt.src = `${browser.runtime.getURL("aa.png")}`;
//    elt.alt = 'an alt text'
// }

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

waitForElm('.css-1ki54i').then((elm) => {
    console.log('Element is ready');
    console.log(elm);
    run();
});


function run() {
    const table = document.getElementsByClassName("css-1ki54i")[0];
    const table_arr = Array.from(table.rows).slice(1); // remove header
    const arr_data = table_arr
                            .map(row => row.cells) 
                            .map(row => Array.from(row))
                            .map(row => row.flatMap(cell => cell.innerText))
    console.log(arr_data);
}

window.addEventListener('load', function load(e){
    window.removeEventListener('load', load, false);
    console.log("running ...");
    this.setTimeout(() => console.log("Script  loaded with timeout"), 2000)
}, false);


// parent: .css-lno4gd
// table: .css-1ki54i


// children, childNodes, cells