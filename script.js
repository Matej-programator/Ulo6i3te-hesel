async function poNacteni() {
  ukazPrihlaseni();
}

function nactiVygenerovanaHesla(){
  setInterval(vygenerovaneHeslo,2000);
}
async function uloztHesla(){
    let nazev = document.getElementById("naapt").value;
    let heslo = document.getElementById("heslo").value;
    let jmeno = document.getElementById("nu").value;

    //generovane id
    let id = Math.floor(Math.random() * 1000000);

    let nebezpeci = {};
    nebezpeci.nazev = nazev;
    nebezpeci.heslo = heslo
    nebezpeci.jmeno = jmeno;
    nebezpeci.id = id;
    nebezpeci.overeni = token;
   

    // posilani na server ve formatu url
    let url = location.href + "heslam/ulozt";
    console.log(url);
    let re = await fetch(url,{method: "POST",body: JSON.stringify(nebezpeci)});
    let data = await re.json();
    console.log(data);
    alert("heslo je uložno v databazi");
    nacti
}


let token = "";

async function prihlasitSe(){
  let prijm = document.getElementById("jp").value;
  let priheslo = document.getElementById("jh").value;

  let nebezpeci = {};
  nebezpeci.jmenopr = prijm;
  nebezpeci.he = priheslo;

   // posilani na server ve formatu url
    let url = location.href + "uzvatelems/prihlasitSe";
    console.log(url);
    let re = await fetch(url,{method: "POST",body: JSON.stringify(nebezpeci)});
    let data = await re.json();
    console.log(data);
    token = data.overovaniUzivatelu;
  
    setInterval(nacti,2000);
    ukazKomunikaci();
   
}

//token = data.overovaniUzivatelu;

async function nacti(){
  // posilani na server ve formatu url
    let url = location.href + "heslam/nacti";
    let nebezpeci = {};
    nebezpeci.overeni = token;
    console.log(url);
    let re = await fetch(url,{method: "POST",body: JSON.stringify(nebezpeci)});
    let data = await re.json();
    console.log(data)

    let s ="<table><th>Nazev uzivatele</th><th>Nazev aplikace</th><th>heslo</th><th>upravit heslo</th>";
    for(let ho of data.hesla){
      s = s + "<tr><td>" + ho.jmeno+"</td><td>"+ ho.nazev+ "</td><td>"+ho.heslo+"</td><td><button onclick='upravytHESLO(`"+ho.id+ "`,`" + ho.heslo +"`)'>upravyt heslo</button></td><thl>/tr>";
    }
    s = s + "</table>"
   document.getElementById("h").innerHTML = s;
}

async function registovat() {
  let ujm = document.getElementById("jmu").value;
  let upm = document.getElementById("pru").value;
  let uhe = document.getElementById("huz").value;
  let uheznovu = document.getElementById("hzn").value;

  let nebezpeci = {};
  nebezpeci.jmeno = ujm;
  nebezpeci.primeni = upm;
  nebezpeci.heslo = uhe;
  nebezpeci.hesloznovu = uheznovu;

  if (ujm == "") {
    alert("nemužeme vas ze registrovat protože není zadano vaše jmeno");
    return;
  }

  if (upm == "") {
    alert("nemužeme vas ze registrovat protože není zadano vaše přimení");
    return;
  }

  if (uhe == "") {
    alert("nemužeme vas ze registrovat protože není zadano vaše heslo");
    return;
  }

  if (uheznovu != uhe) {
    alert("zadejte spravné heslo prosím");
    return;
  }

  // posilani na server ve formatu url
  let url = location.href + "uzvatelems/registrovat";
  console.log(url);
  let re = await fetch(url, { method: "POST", body: JSON.stringify(nebezpeci) });
  let data = await re.json();
  console.log(data);
  alert("právš ste se za registovaly");
  ukazPrihlaseni();
}

async function vygenerovaneHeslo(){
    let vh = document.getElementById("vygenerovane-heslo");
    console.log(vh);

    nebezpeci = {};
    nebezpeci.generovat = vh;

  // posilani na server ve formatu url
  let url = location.href + "hesla/generuj";
  console.log(url);
  let re = await fetch(url, { method: "POST", body: JSON.stringify(nebezpeci) });
  let data = await re.json();
  console.log(data);
}

// Generaror hesel

function generuj() {
  const kontejner = document.getElementById("vygenerovane-heslo");
  const delka = document.getElementById("delka-hesla").value;
  if (!delka) {
    alert("Heslo musi mit delku aspon 1");
    return;
  }
  const heslo = generujHeslo(delka);
  kontejner.textContent = heslo;
}


function generujHeslo(delka) {
  const znaky = ziskejMozneZnaky(
    jeVybran("checkbox-mala"),
    jeVybran("checkbox-velka"),
    jeVybran("checkbox-cisla"),
    jeVybran("checkbox-specialni-znaky")
  );
  const charsetLength = znaky.length;
  if (charsetLength === 0) {
    alert("Je potreba vybrat aspon jeden typ znaku");
    return;
  }

  let password = "";
  const nahodnaCisla = crypto.getRandomValues(new Uint32Array(delka));

  for (let i = 0; i < delka; i++) {
    const randomIndex = nahodnaCisla[i] % charsetLength;
    password += znaky.charAt(randomIndex);
  }

  return password;
}

const znakyMala = "abcdefghijklmnopqrstuvwxyz";
const znakyVelka = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const znakyCisla = "0123456789";
const znakySpecialniZnaky = "!@#$%^&*()";

function ziskejMozneZnaky(mala, velka, cisla, specialniZnaky) {
  let vysledek = "";
  if (mala) {
    vysledek += znakyMala;
  }
  if (velka) {
    vysledek += znakyVelka;
  }
  if (cisla) {
    vysledek += znakyCisla;
  }
  if (specialniZnaky) {
    vysledek += znakySpecialniZnaky;
  }
  return vysledek;
}

function jeVybran(checkboxId) {
  return document.getElementById(checkboxId).checked;
}



function ukazPrihlaseni() {
  document.getElementById("oblast_registrace").style.display = "none";
  document.getElementById("oblast_prihlaseni").style.display = "block";
  document.getElementById("oblast_komunikace").style.display = "none";
  document.getElementById("hesla").style.display = "none";
}

function ukazRegistraci() {
  document.getElementById("oblast_registrace").style.display = "block";
  document.getElementById("oblast_prihlaseni").style.display = "none";
  document.getElementById("oblast_komunikace").style.display = "none";
  document.getElementById("hesla").style.display = "none";

}

function ukazKomunikaci() {
  document.getElementById("oblast_registrace").style.display = "none";
  document.getElementById("oblast_prihlaseni").style.display = "none";
  document.getElementById("oblast_komunikace").style.display = "block";
  document.getElementById("hesla").style.display = "block";
}

function ukazGeneratorHesel(){
  document.getElementById("oblast_registrace").style.display = "none";
  document.getElementById("oblast_prihlaseni").style.display = "none";
  document.getElementById("oblast_komunikace").style.display = "none";
  document.getElementById("hesla").style.display = "none";
}

function upravytHESLO(id,heslo){
  document.getElementById("idhesla").value = id;
  document.getElementById("heslo").value = heslo;
}


  
  
