//CREAZIONE EVENTI -------------------------------------------------------------------------------------------------------------------------------------------------------
function creaEvento(evento, preferito){
    const section = document.createElement('section');
    section.classList.add('evento');
    main.appendChild(section);
    const img = document.createElement('img');
    img.src = "/laravel/public/img/" + evento.titolo + ".jpg";
    section.appendChild(img);
    const div1 = document.createElement('div');
    section.appendChild(div1);
    const div2 = document.createElement('div');
    div1.appendChild(div2);
    const titolo = document.createElement('h4');
    if(preferito){
        section.classList.add('eventoPreferito');
        const stella = document.createElement('img');
        stella.src = "/laravel/public/img/Stella.jpg";
        stella.classList.add('stellaEvento');
        titolo.appendChild(stella);
    }
    titolo.innerHTML += evento.titolo;
    div2.appendChild(titolo);
    const tempoRimasto = document.createElement('h5');
    tempoRimasto.textContent = evento.tempoRimasto;
    div2.appendChild(tempoRimasto);
    const descrizione = document.createElement('p');
    descrizione.innerHTML = evento.descrizione;
    div1.appendChild(descrizione);
}

function creaEventi(eventi){
    const info = document.createElement('p');
    main.appendChild(info);
    if(eventi.length !== 0){
        info.textContent = "Eventi attualmente attivi";
        if(eventi['preferiti'] !== undefined && eventi['preferiti'].length !== 0){
            for(evento of eventi['preferiti'])
                creaEvento(evento, true);
            const separatore = document.createElement('div');
            separatore.id = 'separatore';
            main.appendChild(separatore);
        }
        for(evento of eventi['nonPreferiti'])
            creaEvento(evento, false);
        window.setTimeout("togliSecondo()", 1000);  
    }
    else{
        info.textContent = "Non sono presenti eventi attivi al momento";
        window.setTimeout("controllaVuoto()", 60000);
    }
}

//GESTIONE TEMPO -------------------------------------------------------------------------------------------------------------------------------------------------------
function togliSecondo(){
    const eventi = document.querySelectorAll('.evento');
    let item;
    let newSecondi;
    for(evento of eventi){
        const tempoRimasto = evento.querySelector('h5');
        item = tempoRimasto.textContent.split(':');
        newSecondi = parseInt(item[2]) - 1; 
        if(newSecondi <= 0){
            fetch('/laravel/public/eventi/get/').then(onResponse).then(stampaDiNuovo);
            return;
        }
        else if(newSecondi < 10)
            tempoRimasto.textContent = item[0] + ':' + item[1] + ":0" + newSecondi;
        else 
            tempoRimasto.textContent = item[0] + ':' + item[1] + ':' + newSecondi;
    }
    window.setTimeout("togliSecondo()", 1000);
}

function controllaVuoto(){
    main.innerHTML = '';
    fetch('/laravel/public/eventi/get/').then(onResponse).then(stampa);
}

//FUNZIONI FETCH -------------------------------------------------------------------------------------------------------------------------------------------------------
function stampaDiNuovo(json){
        main.innerHTML = '';
        creaEventi(json);
}

function onResponse(response){
    return response.json();
}

//CONFIGURAZIONE INIZIALE -------------------------------------------------------------------------------------------------------------------------------------------------------
const main = document.querySelector('main');
fetch('/laravel/public/eventi/get/').then(onResponse).then(creaEventi);