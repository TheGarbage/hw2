//Funzione di appoggio -------------------------------------------------------------------------------------------------------------------------------------------------------
function formattaNumero(numero){
    const stringa = numero.toString();
    let stringaFormattata = "";
    for(i = 0; i < stringa.length; i++){
        stringaFormattata+= stringa.charAt(i);
        if((stringa.length - (i + 1))%3 === 0 && (stringa.length - (i + 1)) !== 0)
            stringaFormattata+= '.';
    }
    return stringaFormattata;
}

//Configurazione Iniziale -------------------------------------------------------------------------------------------------------------------------------------------------------
function onJson(json){
    if(json['risposta'] !== undefined){ 
        console.log(json['risposta']);
        return;
    }
    const sezione = document.querySelector('#alertNonCreato');
    sezione.id = "alert";
    const h4 = document.createElement('h4');
    h4.textContent = "Prima di tornare a giocare abbiamo una battaglia da vincere!";
    sezione.appendChild(h4);
    const casi = document.createElement('div');
    sezione.appendChild(casi);
    const infoCasi = document.createElement('p');
    const percentuale1 = (json['casi']['n_casi'] / json['casi']['popolazione']) * 100;
    infoCasi.innerHTML = "Aggiornamento dati: " + json['casi']['data_aggiornamento'].split(' ')[0] + '</br>' +
                         "Casi confermati: " + formattaNumero(json['casi']['n_casi']) + " (circa il " + 
                         ((percentuale1 > 10) ? percentuale1.toPrecision(4) : percentuale1.toPrecision(3)) + 
                         "% della popolazione)";
    casi.appendChild(infoCasi);
    const infoPopolazione1 = document.createElement('p'); 
    infoPopolazione1.innerHTML = "Popolazione totale: " + '</br>' + formattaNumero(json['casi']['popolazione']);
    infoPopolazione1.classList.add('popolazione');
    casi.appendChild(infoPopolazione1);
    const barra1 = document.createElement('div');
    barra1.id = 'rosso';
    casi.appendChild(barra1);
    const avanzamentoBarra1 = document.createElement('div');
    avanzamentoBarra1.style.width = ((json['casi']['n_casi'] / json['casi']['popolazione']) * 100) + '%';
    barra1.appendChild(avanzamentoBarra1);
    const vaccini = document.createElement('div');
    sezione.appendChild(vaccini);
    const infoVaccini = document.createElement('p');
    const percentuale2 = (json['vaccini']['n_doppia_dose'] / json['vaccini']['popolazione']) * 100;
    infoVaccini.innerHTML = "Aggiornamento dati: " + json['vaccini']['data_aggiornamento'].split(' ')[0] + '</br>' +
                            "Vaccinazioni: " + formattaNumero(json['vaccini']['n_doppia_dose']) + " (circa il " + 
                            ((percentuale2 > 10) ? percentuale2.toPrecision(4) : percentuale2.toPrecision(3)) + 
                            "% della popolazione)";
    vaccini.appendChild(infoVaccini);
    const infoPopolazione2 = document.createElement('p'); 
    infoPopolazione2.innerHTML = "Popolazione totale: " + '</br>' + formattaNumero(json['vaccini']['popolazione']);
    infoPopolazione2.classList.add('popolazione');
    vaccini.appendChild(infoPopolazione2);
    const barra2 = document.createElement('div');
    barra2.id = 'verde';
    vaccini.appendChild(barra2);
    const avanzamentoBarra2 = document.createElement('div');
    avanzamentoBarra2.style.width = ((json['vaccini']['n_doppia_dose'] / json['vaccini']['popolazione']) * 100) + '%';
    barra2.appendChild(avanzamentoBarra2);
    const p = document.createElement('p');
    p.id = ('contest');
    p.textContent = "Nel frattempo partecipa al nostro ";
    sezione.appendChild(p);
    const link = document.createElement('a');
    link.textContent = "contest!";
    link.href='contest';
    p.appendChild(link);
    sezione.classList.remove('hidden');
}

function onResponse(response){
    return response.json();
}

//Configurazione Iniziale -------------------------------------------------------------------------------------------------------------------------------------------------------
fetch('home/banner').then(onResponse).then(onJson);
