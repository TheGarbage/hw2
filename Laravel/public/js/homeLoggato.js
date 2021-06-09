//FETCH DATABASE -------------------------------------------------------------------------------------------------------------------------------------------------------
function onJsonVideogiochi(giochiJSon){
    let indice;
    for(let id in index)
        if(giochiJSon[0]['categoriaRisultati'] === index[id])
            indice = id;
    const sottoSito = document.querySelector(".sotto-siti [data-tema=" + indice + ']');
    let apertoOra = false;
    if(giochiAperti.length === 0) apertoOra = true;
    const preferiti = sottoSito.querySelector(".preferiti");
    const divPreferiti = preferiti.querySelector(".giochi");
    const nonPreferiti = sottoSito.querySelector(".nonPreferiti");
    const divNonPreferiti = nonPreferiti.querySelector(".giochi");
    const inputCerca = sottoSito.querySelector('input'); 
    inputCerca.classList.remove('hidden');
    for(const item of giochiJSon[1]['videogiochi']){
        const gioco = document.createElement('div');
        gioco.classList.add('gioco');
        gioco.classList.add('giocoMinoriDettagli');
        gioco.dataset.codice = item['codice'] + "nonPreferito";
        divNonPreferiti.appendChild(gioco);
        const noClick = document.createElement('section');
        noClick.classList.add('noClick');
        gioco.appendChild(noClick);
        const divGioco = document.createElement('div');
        noClick.appendChild(divGioco);
        const stella = document.createElement('img');
        stella.src = "/laravel/public/img/Stella.jpg";
        stella.classList.add('stella');
        divGioco.appendChild(stella);
        const nomeGioco = document.createElement('h5');
        nomeGioco.textContent = item['titolo'];
        if(apertoOra){
            const giocoAperto= {};
            giocoAperto.gioco = gioco;
            giocoAperto.lista = [];
            for(lettera of nomeGioco.textContent.toUpperCase())
                giocoAperto.lista.unshift(lettera);
            giochiAperti.unshift(giocoAperto);
        }
        divGioco.appendChild(nomeGioco);
        const imgPreferiti = document.createElement('img');
        imgPreferiti.classList.add('pointer');
        imgPreferiti.classList.add('stellaPiu');
        imgPreferiti.dataset.codice = item['codice'];
        imgPreferiti.src = "/laravel/public/img/NonPreferito.jpg";
        imgPreferiti.addEventListener("click", inserisciPreferiti);
        if(errorePreferiti !== undefined)
            imgPreferiti.classList.add('hidden');
        divGioco.appendChild(imgPreferiti);
        const imgGioco = document.createElement('img');
        imgGioco.src = "/laravel/public/img/" + item.titolo + ".jpg";
        imgGioco.dataset.imgGioco = true;
        noClick.appendChild(imgGioco);
        const cliccaQui = document.createElement('p');
        cliccaQui.textContent = "Clicca per più info";
        cliccaQui.classList.add("pointer");
        cliccaQui.addEventListener('click', mostraDettagli);
        noClick.appendChild(cliccaQui);
        const click = document.createElement('section');
        click.classList.add('click');
        click.classList.add('hidden');
        gioco.appendChild(click);
        const descrizione = document.createElement('h5');
        descrizione.innerHTML = "Categoria: " + item['categoria'] + '</br>' + item['descrizione'];
        click.appendChild(descrizione);
        if(giochiPreferiti.indexOf(imgPreferiti.dataset.codice) !== -1){
            imgPreferiti.classList.add('hidden');
            gioco.classList.add('selezionatoPreferito');
            stella.classList.remove('hidden');
            if(preferiti.classList.contains('hidden'))
                preferiti.classList.remove('hidden');
            divPreferiti.appendChild(creaPreferito(gioco, item.codice));
        }
        else
            stella.classList.add('hidden');
    }
}

function esitoModifica(json){
    if(json['risposta'] !== "ok")
        alert(json['risposta']);
}

function onJsonPreferiti(preferiti){
    if(preferiti['risposta'] === undefined)
        for(item of preferiti)
            giochiPreferiti.unshift(item.toString());
    else{
        errorePreferiti = document.createElement('p');
        errorePreferiti.textContent = preferiti['risposta'];
        errorePreferiti.classList.add('errore');
    }
}

function onResponse(response){
    return response.json();
}

//FUNZIONI D'APPOGGIO -------------------------------------------------------------------------------------------------------------------------------------------------------
function nascondiGiochi(lettera){
    for(item of giochiAperti){
        if(!item.gioco.classList.contains('hidden'))
            if(item.lista.indexOf(lettera) === -1)
                item.gioco.classList.add('hidden');
            else
                item.lista.splice(item.lista.indexOf(lettera), 1);
    }
}

function mostraGiochi(stringa, letteraCancellata){
    let mostra = true;
    for(item of giochiAperti){
        mostra = true;
        if(item.gioco.classList.contains('hidden')){
            item.lista = [];
            for(lettera of item.gioco.querySelector('h5').textContent.toUpperCase())
                item.lista.unshift(lettera);
            for(lettera of stringa)
                if(item.lista.indexOf(lettera) === -1)
                    mostra = false;
                else
                    item.lista.splice(item.lista.indexOf(lettera), 1)
            if(mostra)
                item.gioco.classList.remove('hidden');
        }
        else 
            item.lista.unshift(letteraCancellata);
    }
}

function chiudiMaggioriDettagli(cliccaQui, gioco){
    gioco.querySelector('.noClick').classList.remove('noClickSelezionato');
    gioco.querySelector('.click').classList.add('hidden');
    gioco.classList.add('giocoMinoriDettagli');
    gioco.classList.remove('giocoMaggioriDettagli');
    cliccaQui.textContent = "Clicca per maggiori info";
    cliccaQui.removeEventListener('click', nascondiDettagli);
    cliccaQui.addEventListener('click', mostraDettagli);
}

function creaPreferito(blocco, codice){
    const giocoPreferito = document.createElement("section");
    giocoPreferito.classList.add('giocoPreferito');
    giocoPreferito.dataset.codice = codice + "preferito";
    const imgGioco = document.createElement("img");
    imgGioco.src = blocco.querySelector('[data-img-gioco = true]').src;
    giocoPreferito.appendChild(imgGioco);
    const div = document.createElement('div');
    giocoPreferito.appendChild(div);
    const h5 = document.createElement('h5');
    h5.textContent = blocco.querySelector("h5").textContent;
    div.appendChild(h5);
    const imgPreferiti = document.createElement('img');
    imgPreferiti.classList.add("pointer");
    imgPreferiti.dataset.codice = codice;
    imgPreferiti.src = "/laravel/public/img/Preferito.jpg";
    imgPreferiti.addEventListener("click", togliPreferiti);
    div.appendChild(imgPreferiti);
    return giocoPreferito;
}

function creaSottoSito(blocco){
    const sottoSiti = document.querySelector(".sotto-siti");
    const newSottoSito = document.createElement('article');
    newSottoSito.classList.add('sotto-sito');
    newSottoSito.dataset.tema = blocco.dataset.tema;
    sottoSiti.appendChild(newSottoSito);
    const header = document.createElement('header');
    header.dataset.tema = index[blocco.dataset.tema];
    newSottoSito.appendChild(header);
    const imgTornaIndietro = document.createElement('img');
    imgTornaIndietro.classList.add('pointer');
    imgTornaIndietro.classList.add('tornaIndietro');
    imgTornaIndietro.src = "/laravel/public/img/TornaIndietro.jpg";
    imgTornaIndietro.addEventListener('click', chiudiSottoSito);
    header.appendChild(imgTornaIndietro);
    const titoloHeader = document.createElement('h4');
    titoloHeader.textContent = blocco.querySelector('h4').textContent;
    header.appendChild(titoloHeader);
    const overlayHeader = document.createElement('div');
    overlayHeader.classList.add('overlay');
    overlayHeader.classList.add('block-overlay');
    overlayHeader.classList.add('dark-overlay');
    header.appendChild(overlayHeader);
    const subHeader = document.createElement('p');
    subHeader.textContent = blocco.querySelector('p').textContent;
    subHeader.classList.add('sub-header');
    newSottoSito.appendChild(subHeader);
    const preferiti = document.createElement('section');
    preferiti.classList.add('preferiti');
    preferiti.classList.add('hidden');
    newSottoSito.appendChild(preferiti);
    const textPreferiti = document.createElement('li');
    textPreferiti.textContent = "Preferiti della categoria";
    const listaPreferiti = document.createElement('ul');
    listaPreferiti.appendChild(textPreferiti); 
    preferiti.appendChild(listaPreferiti);
    const divPreferiti = document.createElement('div');
    divPreferiti.classList.add('giochi');
    preferiti.appendChild(divPreferiti);
    if(errorePreferiti !== undefined)
        newSottoSito.appendChild(errorePreferiti.cloneNode(true));
    const nonPreferiti = document.createElement('section');
    nonPreferiti.classList.add('nonPreferiti');
    newSottoSito.appendChild(nonPreferiti);
    const subNonPreferiti = document.createElement('div');
    subNonPreferiti.classList.add('sub-nonPreferiti');
    nonPreferiti.appendChild(subNonPreferiti);
    const textNonPreferiti = document.createElement('li');
    textNonPreferiti.textContent = "Lista giochi categoria";
    const listaNonPreferiti = document.createElement('ul');
    listaNonPreferiti.appendChild(textNonPreferiti); 
    subNonPreferiti.appendChild(listaNonPreferiti); 
    const form = document.createElement('form');
    form.textContent = "Cerca:";
    const inputCerca = document.createElement('input'); 
    inputCerca.type = "text";
    inputCerca.classList.add('barraInput');
    inputCerca.classList.add('hidden');
    inputCerca.addEventListener('keyup', ricerca);
    form.appendChild(inputCerca); 
    subNonPreferiti.appendChild(form);
    const divNonPreferiti = document.createElement('div');
    divNonPreferiti.classList.add('giochi');
    nonPreferiti.appendChild(divNonPreferiti);
    fetch('/laravel/public/home/games/' + index[newSottoSito.dataset.tema]).then(onResponse).then(onJsonVideogiochi);
    return newSottoSito;
}

//FUNZIONI LISTENER  -------------------------------------------------------------------------------------------------------------------------------------------------------
function inserisciPreferiti(event){  
    const codice = event.currentTarget.dataset.codice + "nonPreferito";
    giochiPreferiti.unshift(event.currentTarget.dataset.codice);
    fetch('/laravel/public/favorites/insert/' + event.currentTarget.dataset.codice).then(onResponse).then(esitoModifica);
    const giochi = document.querySelectorAll('.gioco[data-codice ="' + codice + '"]');
    let imgPreferiti;
    let preferiti;
    for(item of giochi){
        imgPreferiti = item.querySelector('.stellaPiu');
        imgPreferiti.classList.add('hidden');
        item.classList.add('selezionatoPreferito');
        item.querySelector('.stella').classList.remove('hidden');
        preferiti = item.parentNode.parentNode.parentNode.querySelector(".preferiti");
        if(preferiti.classList.contains('hidden'))
            preferiti.classList.remove('hidden');
        preferiti.querySelector('.giochi').appendChild(creaPreferito(item, imgPreferiti.dataset.codice));
    }
}

function togliPreferiti(event){
    const imgPreferiti = event.currentTarget;
    const codicePreferito =  imgPreferiti.dataset.codice + "preferito";
    const codiceNonPreferito = imgPreferiti.dataset.codice + "nonPreferito";
    const blocchiPreferiti = document.querySelectorAll('.giocoPreferito[data-codice ="' + codicePreferito + '"]');
    const blocchiNonPreferiti = document.querySelectorAll('.gioco[data-codice ="' + codiceNonPreferito + '"]');
    let preferiti;   
    for(item of blocchiPreferiti){
        preferiti = item.parentNode.parentNode;
        item.remove();
        if(preferiti.querySelector(".giocoPreferito") === null)
            preferiti.classList.add('hidden');
    }
    let stellaPiu;
    for(item of blocchiNonPreferiti){
        stellaPiu = item.querySelector('.stellaPiu');
        stellaPiu.classList.remove('hidden');
        item.classList.remove('selezionatoPreferito');
        item.querySelector('.stella').classList.add('hidden');
    }
    giochiPreferiti.splice(giochiPreferiti.indexOf(imgPreferiti.dataset.codice), 1);
    fetch('/laravel/public/favorites/delete/' + imgPreferiti.dataset.codice).then(onResponse).then(esitoModifica);
}

function ricerca(event){
    const nuovaValue = event.currentTarget.value;
    let lettera = null;
    if(vecchiaValue.length < nuovaValue.length){
        for(let i = 0; i < vecchiaValue.length; i++)
            if(nuovaValue[i] !== vecchiaValue[i]){
                lettera = nuovaValue[i];
                break;
            }
        if(lettera === null)
            lettera =  nuovaValue[nuovaValue.length-1];
        nascondiGiochi(lettera.toUpperCase());
    }
    else if(vecchiaValue.length > nuovaValue.length){
        for(let i = 0; i < nuovaValue.length; i++)
            if(vecchiaValue[i] !== nuovaValue[i]){
                lettera = vecchiaValue[i];
                break;
            }
        if(lettera === null)
            lettera = vecchiaValue[vecchiaValue.length-1];
        mostraGiochi(nuovaValue.toUpperCase(), lettera);
    }
    vecchiaValue = nuovaValue;
}

function mostraDettagli(event){
    const cliccaQui =  event.currentTarget;
    const blocco = cliccaQui.parentNode.parentNode;
    blocco.classList.add('giocoMaggioriDettagli');
    blocco.classList.remove('giocoMinoriDettagli');
    blocco.querySelector('.click').classList.remove('hidden');
    blocco.querySelector('.noClick').classList.add('noClickSelezionato');
    cliccaQui.textContent = "Clicca per minori info";
    cliccaQui.removeEventListener('click', mostraDettagli);
    cliccaQui.addEventListener('click', nascondiDettagli);
}

function nascondiDettagli(event){
    const cliccaQui =  event.currentTarget;    
    const gioco = cliccaQui.parentNode.parentNode;
    chiudiMaggioriDettagli(cliccaQui, gioco);
}

function apriSottoSito(event){
    const blocco = event.currentTarget;
    let sottoSito = document.querySelector(".sotto-siti [data-tema=" + blocco.dataset.tema + ']');
    if(sottoSito !== null){
        sottoSito.classList.remove('hidden');
        const giochiSitoAperto = sottoSito.querySelectorAll('.gioco');
        for(item of giochiSitoAperto){
            const giocoAperto= {};
            giocoAperto.gioco = item;
            giocoAperto.lista = [];
            for(lettera of item.querySelector('h5').textContent.toUpperCase())
                giocoAperto.lista.unshift(lettera);
            giochiAperti.unshift(giocoAperto);
        }
    }
    else 
        creaSottoSito(blocco);
    const elementiSito = document.querySelectorAll('.sito-principale');
    for(item of elementiSito)
        item.classList.add('opacity');
    const blocchi = document.querySelector('#blocchi');
    blocchi.classList.add('hidden');
    const bodyOverlay = document.querySelector('#body-overlay');
    bodyOverlay.classList.remove('hidden');
}

function chiudiSottoSito(event){
    const tornaIndietro = event.currentTarget;
    const sottoSito = tornaIndietro.parentNode.parentNode;
    sottoSito.classList.add('hidden');
    sottoSito.querySelector('input').value = '';
    vecchiaValue = '';
    for(item of giochiAperti){
        if(item.gioco.classList.contains('hidden'))
            item.gioco.classList.remove('hidden');
        if(item.gioco.classList.contains('giocoMaggioriDettagli'))
            chiudiMaggioriDettagli(item.gioco.querySelector('p'), item.gioco); 
    }
    giochiAperti = [];
    const elementiSito =  document.querySelectorAll('.sito-principale');
    for(item of elementiSito)
        item.classList.remove('opacity');
    const blocchi = document.querySelector('#blocchi');
    blocchi.classList.remove('hidden');
    const bodyOverlay =  document.querySelector('#body-overlay');
    bodyOverlay.classList.add('hidden');
}

function vediDidascalia(event){
    const blocco = event.currentTarget;
    const attr = blocco.dataset.tema;
    blocco.removeEventListener('mouseover', vediDidascalia);
    for(let id in index){
        if(attr === index[id])
            blocco.dataset.tema = id;
    }
    blocco.classList.add('falsoHover');
    const didascalia = blocco.querySelector('p');
    didascalia.classList.remove('hidden');
    const overlay = blocco.querySelector('.overlay');
    overlay.classList.remove('dark-overlay');
    blocco.addEventListener('mouseout', nascondiDidascalia);
}

function nascondiDidascalia(event){
    const blocco = event.currentTarget;
    blocco.removeEventListener('mouseout', nascondiDidascalia);
    blocco.classList.remove('falsoHover');
    const didascalia = blocco.querySelector('p');
    didascalia.classList.add('hidden');
    const overlay = blocco.querySelector('.overlay');
    overlay.classList.add('dark-overlay');
    blocco.dataset.tema = index[blocco.dataset.tema];
    blocco.addEventListener('mouseover', vediDidascalia);
}

//Configurazione Iniziale -------------------------------------------------------------------------------------------------------------------------------------------------------
const index = {
    primo : 'Fps',
    secondo: 'Arcade',
    terzo: 'Quiz',
    quarto: 'Corsa',
    quinto: 'VediTutto'
}

let giochiAperti = [];
let vecchiaValue = '';
const giochiPreferiti = [];
let errorePreferiti;
fetch('/laravel/public/favorites/read').then(onResponse).then(onJsonPreferiti);
const blocchi = document.querySelectorAll('#blocchi .blocco');
for (const blocco of blocchi){
    blocco.addEventListener('mouseover', vediDidascalia);
    blocco.addEventListener('click', apriSottoSito);
}