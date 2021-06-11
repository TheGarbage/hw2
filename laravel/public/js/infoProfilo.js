//RISPOSTE FETCH -------------------------------------------------------------------------------------------------------------------------------------------------------
function esitoModificaDati(json){
    const errore = document.querySelector('p.errore.margineRidotto');
    if(json['risposta'] === "ok"){
        const label = document.querySelector("form[name='" + json['name'] + "'] label");
        const inputs = label.querySelectorAll('input');
        for(item of inputs)
            item.classList.add('hidden');
        const div = label.querySelector('div');
        div.querySelector('p').textContent = label.querySelector('input').value;
        div.classList.remove('hidden');
        errore.textContent = "Modifica '" + label.innerText.split(':')[0] + "' effettuata";
        errore.classList.add('ribaltato');
    }
    else
        errore.textContent = json['risposta'];
}

function esitoCambioPassword(json){
    const errore = document.querySelector('p.errore.margineRidotto');
    const vecchiaPassword = document.querySelector("input[name='vecchiaPassword']");
    const nuovaPassword = document.querySelector("input[name='nuovaPassword']");
    const confermaPassword = document.querySelector("input[name='confermaPassword']");
    if(json['risposta'] === "ok"){
        if(vecchiaPassword.classList.contains('erroreM'))
            vecchiaPassword.classList.remove('erroreM');
        if(nuovaPassword.classList.contains('erroreM'))
            nuovaPassword.classList.remove('erroreM');
        if(confermaPassword.classList.contains('erroreM'))
            confermaPassword.classList.remove('erroreM');
        if(errore.textContent.length !== 0)
            errore.textContent = "";
        vecchiaPassword.value = nuovaPassword.value = confermaPassword.value = "";
        const form = vecchiaPassword.parentNode.parentNode;
        form.parentNode.querySelector('div').classList.remove('hidden');
        form.classList.add('hidden');
        errore.textContent = "Password aggiornata con successo";
        errore.classList.add('ribaltato');
    }
    else if(json['risposta'] === "falsaPassword"){
        errore.textContent = "La password vecchia non corrisponde, riprovare";
        vecchiaPassword.classList.add('erroreM');
    }
    else
        errore.textContent = json['risposta'];
}

function onResponse(response){
    return response.json();
}

//CHIAMATE FETCH -------------------------------------------------------------------------------------------------------------------------------------------------------
function inviaDati(event){
    event.preventDefault();
    const form = event.currentTarget;
    const inputs = form.querySelectorAll('input');
    const errore = document.querySelector('p.errore.margineRidotto');
    const div = form.querySelector('div');
    if(errore.classList.contains('ribaltato')){
        errore.classList.remove('ribaltato');
        errore.textContent = "";
    }
    if(inputs[0].value.length === 0){
        errore.textContent = "Non puoi lasciare il campo vuoto";
        inputs[0].classList.add('erroreM');
    }
    else if(inputs[0].value.length.toString() > inputs[0].dataset.max && 
            !(inputs[0].value.length.toString().length < inputs[0].dataset.max.length)){
        errore.textContent = "Puoi inserire al massimo " + inputs[0].dataset.max + " caratteri";
        inputs[0].classList.add('erroreM');
    }
    else if(inputs[0].value === div.querySelector('p').textContent){
        if(inputs[0].classList.contains('erroreM'))
            inputs[0].classList.remove('erroreM');
        if(errore.textContent.length !== 0)
            errore.textContent = "";
        for(item of inputs)
            item.classList.add('hidden');
        div.classList.remove('hidden');
    }
    else{
        if(inputs[0].classList.contains('erroreM'))
            inputs[0].classList.remove('erroreM');
        if(errore.textContent.length !== 0)
            errore.textContent = "";
        fetch("server-database.php?comando=modificaDati&chiave=" + form.name + "&valore=" + inputs[0].value).then(onResponse).then(esitoModificaDati);
    }
}

function inviaPasswords(event){
    event.preventDefault();
    const errore = document.querySelector('p.errore.margineRidotto');
    const vecchiaPassword = document.querySelector("input[name='vecchiaPassword']");
    const nuovaPassword = document.querySelector("input[name='nuovaPassword']");
    const confermaPassword = document.querySelector("input[name='confermaPassword']");
    if(errore.classList.contains('ribaltato')){
        errore.classList.remove('ribaltato');
        errore.textContent = "";
    }
    if(vecchiaPassword.classList.contains('erroreM'))
        vecchiaPassword.classList.remove('erroreM');
    if(nuovaPassword.classList.contains('erroreM'))
        nuovaPassword.classList.remove('erroreM');
    if(confermaPassword.classList.contains('erroreM'))
        confermaPassword.classList.remove('erroreM');
    if(vecchiaPassword.value.length < 8){
        errore.textContent = "La password vecchia era di almeno 8 caratteri";
        vecchiaPassword.classList.add('erroreM');
    }
    else if(nuovaPassword.value.length < 8){
        errore.textContent = "La password nuova deve avere almeno 8 caratteri";
        nuovaPassword.classList.add('erroreM');   
    }
    else if(vecchiaPassword.value === nuovaPassword.value){
        errore.textContent = "Le nuova password non deve essere uguale alla vecchia";
        nuovaPassword.classList.add('erroreM');   
    }
    else if(nuovaPassword.value !== confermaPassword.value){
        errore.textContent = "La password di conferma non corrisponde";
        confermaPassword.classList.add('erroreM');   
    }
    else{ 
        if(errore.textContent.length !== 0)
            errore.textContent = "";
        fetch(
            "server-database.php?comando=cambioPassword&vecchiaPassword=" + vecchiaPassword.value + "&nuovaPassword=" + nuovaPassword.value + "&confermaPassword=" + confermaPassword.value
        ).then(onResponse).then(esitoCambioPassword);
    }
}

//MODIFICA DATI -------------------------------------------------------------------------------------------------------------------------------------------------------
function riApriModifica(event){
    const div = event.currentTarget.parentNode;
    const label = div.parentNode;
    div.classList.add('hidden');
    for(item of label.querySelectorAll('input'))
        item.classList.remove('hidden');
}

function apriModifica(event){
    const div = event.currentTarget.parentNode;
    const label = div.parentNode;
    div.classList.add('hidden');
    const input = document.createElement('input');
    input.name = div.dataset.name;
    input.type = (div.dataset.name !== 'data') ? "text":"date";
    input.value = div.querySelector('p').textContent;
    input.dataset.max = div.dataset.max;
    input.classList.add('barraInput');
    label.appendChild(input);
    const submit = document.createElement('input');
    submit.type = 'submit';
    submit.classList.add('submit');
    label.appendChild(submit);
    submit.parentNode.parentNode.addEventListener('submit', inviaDati);
    event.currentTarget.removeEventListener('click', apriModifica);
    event.currentTarget.addEventListener('click', riApriModifica);
}

//MODIFICA PASSWORD -------------------------------------------------------------------------------------------------------------------------------------------------------
function chiudiModificaPassword(){
    const errore = document.querySelector('p.errore.margineRidotto');
    const vecchiaPassword = document.querySelector("input[name='vecchiaPassword']");
    const nuovaPassword = document.querySelector("input[name='nuovaPassword']");
    const confermaPassword = document.querySelector("input[name='confermaPassword']");
    if(vecchiaPassword.classList.contains('erroreM'))
        vecchiaPassword.classList.remove('erroreM');
    if(nuovaPassword.classList.contains('erroreM'))
        nuovaPassword.classList.remove('erroreM');
    if(confermaPassword.classList.contains('erroreM'))
        confermaPassword.classList.remove('erroreM');
    if(errore.textContent.includes('password') || errore.textContent.includes('Password'))
        errore.textContent = "";
    vecchiaPassword.value = nuovaPassword.value = confermaPassword.value = "";
    const form = vecchiaPassword.parentNode.parentNode;
    form.parentNode.querySelector('div').classList.remove('hidden');
    form.classList.add('hidden');
}

function riApriModificaPassword(event){
    const pulsante = event.currentTarget;
    pulsante.classList.add('hidden');
    pulsante.parentNode.querySelector('form').classList.remove('hidden');
}

function apriModificaPassword(event){
    const pulsante = event.currentTarget;
    pulsante.classList.add('hidden');
    pulsante.removeEventListener("click", apriModificaPassword);
    pulsante.addEventListener("click", riApriModificaPassword);
    const section = event.currentTarget.parentNode;
    const form = document.createElement('form');
    form.name = "password";
    form.method = "post";
    form.addEventListener('submit', inviaPasswords);
    section.appendChild(form);
    const xButton = document.createElement('img');
    xButton.src = "Immagini/xButton.jpg";
    xButton.classList.add('pointer');
    xButton.addEventListener('click', chiudiModificaPassword)
    form.appendChild(xButton);
    const label1 = document.createElement('label');
    label1.textContent = "Vecchia password: ";
    form.appendChild(label1);
    const input1 = document.createElement('input');
    input1.name = "vecchiaPassword";
    input1.type = "password";
    input1.classList.add('barraInput');
    label1.appendChild(input1);
    const label2 = document.createElement('label');
    label2.textContent = "Nuova password: ";
    form.appendChild(label2);
    const input2 = document.createElement('input');
    input2.name = "nuovaPassword";
    input2.type = "password";
    input2.classList.add('barraInput');
    label2.appendChild(input2);
    const label3 = document.createElement('label');
    label3.textContent = "Conferma password: ";
    form.appendChild(label3);
    const input3 = document.createElement('input');
    input3.name = "confermaPassword";
    input3.type = "password";
    input3.classList.add('barraInput');
    label3.appendChild(input3);
    const label4 = document.createElement('label');
    label4.classList.add('submitLabel');
    label4.innerHTML = "&nbsp";
    form.appendChild(label4);
    const input4 = document.createElement('input');
    input4.type = "submit";
    input4.classList.add('submit');
    input4.classList.add('submitPassword');
    label4.appendChild(input4);
}

//CONFIGURAZIONE INIZIALE -------------------------------------------------------------------------------------------------------------------------------------------------------
for(item of document.querySelectorAll('img.pointer'))    
    item.addEventListener('click', apriModifica);
document.querySelector("[data-name='password']").addEventListener("click", apriModificaPassword);