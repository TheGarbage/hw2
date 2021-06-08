//FETCH DATABASE ---------------------------------------------------------------------------------------------------------------------------------------------------------
function rispostaDataBase(json){
    const responso = document.querySelector('#responso');
    if(json['risposta'] !== "ok"){
        responso.textContent = json['risposta'];
        responso.classList.add('errore');
    }  
    responso.classList.remove('hidden');
}

//FUNZIONI PER CONTEST -------------------------------------------------------------------------------------------------------------------------------------------------------
function fineContest(event){
    const responso = document.querySelector('#responso');
    const giocoScelto = event.currentTarget.parentNode.querySelector('h5').textContent;
    responso.innerHTML += giocoScelto + "</br></br><a href='contest/delete'>Annulla voto</a>";
    document.querySelector('#contestVideogiochi').remove();
    document.querySelector('#giochiForm').remove();
    fetch('contest/select/' + giocoScelto).then(onResponse).then(rispostaDataBase);
}

function seleziona(event){
    const blocco = event.currentTarget.parentNode;
    const bloccoVecchio = document.querySelector('#selezionato');
    let conferma;
    if(bloccoVecchio !== null){
        bloccoVecchio.id = '';
        blocco.addEventListener("click", seleziona);
        conferma = bloccoVecchio.querySelector('#conferma');
    }
    else{
        conferma = document.createElement('div');
        conferma.textContent = "Conferma";
        conferma.id = "conferma";
        conferma.classList.add('pointer');
        conferma.addEventListener("click", fineContest);
    }
    blocco.id = "selezionato";
    blocco.appendChild(conferma);
    blocco.removeEventListener("click", seleziona);
}


//REST API -------------------------------------------------------------------------------------------------------------------------------------------------------
function onJsonGiochi(giochi){
    const sezioneGiochi = document.querySelector('#giochiForm');
    if(giochi.risposta !== undefined){
        document.querySelector('#contestVideogiochi').remove();
        document.querySelector('#giochiForm').remove();
        responso.textContent = giochi.risposta;
        responso.classList.add('errore');
        responso.classList.remove('hidden');
        return;
    }
    for(item of giochi){
        const gioco = document.createElement('div');
        gioco.classList.add('giocoForm');
        sezioneGiochi.appendChild(gioco);
        const divGioco = document.createElement('div');
        gioco.appendChild(divGioco);
        const nomeGioco = document.createElement('h5');
        nomeGioco.textContent = item.name;
        divGioco.appendChild(nomeGioco);
        const imgGioco = document.createElement('img');
        imgGioco.classList.add('pointer');
        imgGioco.src = item.image;
        imgGioco.addEventListener("click", seleziona);
        gioco.appendChild(imgGioco);
        const cliccaQui = document.createElement('p');
        if(item.metacritic !== null)
            cliccaQui.textContent = "Metacritic = " + item.metacritic;
        else 
            cliccaQui.textContent = "No metacritic rate"
        gioco.appendChild(cliccaQui);

    }
}

function onResponse(response){
    return response.json();
}


//BARRA DI RICERCA -------------------------------------------------------------------------------------------------------------------------------------------------------
function controlloSpazi(gioco){
    for(lettera of gioco)
        if(lettera !== ' ')
            return true;
}

function ricerca(event){
    event.preventDefault();
    const gioco = document.querySelector('#barraRicerca').value;
    if(gioco !== "Cerca i tuoi giochi:" && controlloSpazi(gioco)){
        document.querySelector('#giochiForm').innerHTML = '';
        fetch('contest/search/' + gioco).then(onResponse).then(onJsonGiochi);
    }
}

function cancellaValue(event){
    const barraRicerca = event.currentTarget;
    barraRicerca.value = "";
}

function resettaValue(event){
    const barraRicerca = event.currentTarget;
    if(barraRicerca.value.length === 0)
        barraRicerca.value = "Cerca i tuoi giochi:";
}

//Configurazione Iniziale -------------------------------------------------------------------------------------------------------------------------------------------------------
const barraRicerca = document.querySelector('#barraRicerca');
barraRicerca.addEventListener("click", cancellaValue);
barraRicerca.addEventListener("blur", resettaValue);
const form = document.querySelector('form');
form.addEventListener('submit', ricerca);
fetch('contest/default').then(onResponse).then(onJsonGiochi);
