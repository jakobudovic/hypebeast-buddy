console.log("The extension is up and running2 ");

var images = document.getElementsByTagName('img')

for (elt of images){
   elt.src = `${browser.runtime.getURL("aa.png")}`;
   elt.alt = 'an alt text'
}