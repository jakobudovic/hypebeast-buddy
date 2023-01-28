

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


function get_table_data(selector) {
    const table = document.querySelector(selector); // .css-1ki54i
    // const table = document.querySelector(".css-1ki54i");
    const table_arr = Array.from(table.rows).slice(1); // remove header
    const arr_data = table_arr
                            .map(row => row.cells) 
                            .map(row => Array.from(row))
                            .map(row => row.flatMap(cell => cell.innerText))
    console.log(arr_data);
}

waitForElm('.css-1ki54i').then((elm) => {
    get_table_data(".css-1ki54i");
});

// window.addEventListener('load', function load(e){
//     window.removeEventListener('load', load, false);
//     console.log("running ...");
//     this.setTimeout(() => console.log("Script  loaded with timeout"), 2000)
// }, false);


// parent: .css-lno4gd
// table: .css-1ki54i


// children, childNodes, cells