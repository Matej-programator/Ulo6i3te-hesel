// inporty
const url = require("url");
const http = require("http");
const fs = require("fs");

// tvorda soboru.json
const ulozHeslo = require("./hesla.js").server;
const uzivatelems = require('./uzivatelems.js').server;
// promeni

let serverms = http.createServer(server);
let port = 8080;


let html = fs.readFileSync("./index.html");
let js = fs.readFileSync("./script.js");
let Klic = fs.readFileSync("./Klic.jpg");
let gH = fs.readFileSync("./generator.html");

// funce na servu
function server(vstup,vistup){
    console.log( "metoda3",vstup.method ); 

if(vstup.method == "POST"){
   console.log( "metoda4",vstup.method ); 
   let data = "";
vstup.on('data', function (kusDat) {                       
  data += kusDat;                                              
})       
console.log( "data",data);                                                       
vstup.on('end', function () {                                                                             
  if (data) {                                                  
    let parametry = JSON.parse(data);                          
    console.log(parametry);  
console.log( "metoda6",vstup.method ); 
 if (vstup.url.startsWith("/heslam/uloz")){
   console.log("uloz Heslo");
   ulozHeslo(vstup,parametry,vistup);
} 
console.log( "metoda34",vstup.method ); 
if(vstup.url.startsWith("/uzvatelems")){
   console.log("registrovat");
   uzivatelems(vstup,parametry,vistup);
}

if (vstup.url.startsWith("/heslam/nacti")){
   console.log("uloz Heslo");
   ulozHeslo(vstup,parametry,vistup);
}
if(vstup.url.startsWith("hesla/generuj")){
   console.log("registrovat");
   uzivatelems(vstup,pa,vistup);
}


  } else {                                                     
                                     
  }                                                                                     
})                            

}

 if(vstup.url == "/"){
    vistup.writeHead(200,{"Content-type":"text/html"});
    html.toString();
    vistup.end(html);
 }
  
  if (vstup.url == "/generator.html") {
    vistup.writeHead(200,{"Content-type": "text/html"});
    vistup.end(gH);
}

 if (vstup.url == "/script.js") {
    vistup.writeHead(200,{"Content-type": "application/javascript"});
    vistup.end(js);
}

if(vstup.url == "/favicon.ico"){
   vistup.writeHead(200,{"Content-type":"image/jpg"});
   vistup.end(Klic);
}

}
serverms.listen(port);