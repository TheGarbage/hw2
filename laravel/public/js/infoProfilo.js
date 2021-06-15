//FUNZIONI D'APPOGGIO----------------------------------------------------------------------------------------------
function chiudiAltro(){
    chiudiModifica(document.nome, document.nome.querySelector('label div').innerText);
    chiudiModifica(document.data, document.data.querySelector('label div').innerText);
    chiudiModifica(document.occupazione, document.occupazione.querySelector('label div').innerText);
    if(document.password !== undefined && !document.password.classList.contains('hidden'))
        chiudiModificaPassword();
    const errore = document.querySelector('p.errore.margineRidotto');
    if(errore.textContent.length !== 0)
        errore.textContent = "";
    if(errore.classList.contains('ribaltato'))
        errore.classList.remove('ribaltato');
}

//RISPOSTE FETCH -------------------------------------------------------------------------------------------------------------------------------------------------------
function esitoModificaDati(json){
    const errore = document.querySelector('p.errore.margineRidotto');
    if(json['risposta'] === "ok"){
        const form = document.querySelector("form[name='" + json['tipoDato'] + "']");
        const inputs = form.querySelectorAll('label input');
        chiudiModifica(form, inputs[0].value.trimEnd().trimStart());
        errore.textContent = "Modifica '" + form.querySelector('label').innerText.split(':')[0] + "' effettuata";
        errore.classList.add('ribaltato');
    }
    else
        errore.textContent = json['risposta'];
}

function esitoCambioPassword(json){
    const errore = document.querySelector('p.errore.margineRidotto');
    if(json['risposta'] === "ok"){
        document.password.vecchiaPassword.value = document.password.nuovaPassword.value = document.password.confermaPassword.value = "";
        document.password.parentNode.querySelector('div').classList.remove('hidden');
        errore.textContent = "Password aggiornata con successo";
        errore.classList.add('ribaltato');
    }
    else if(json['risposta'] === "vecchiaPasswordErrata"){
        document.password.classList.remove('hidden');
        errore.textContent = "La password vecchia non corrisponde, riprovare";
        document.password.vecchiaPassword.addEventListener('keyup', vecchiaPassword);
        document.password.vecchiaPassword.classList.add('erroreM');
    }
    else{
        document.password.classList.remove('hidden');
        errore.textContent = json['risposta'];
    }
}

function onResponse(response){
    return response.json();
}

//CHIAMATE FETCH -------------------------------------------------------------------------------------------------------------------------------------------------------
function inviaDati(event){
    event.preventDefault();
    const form = event.currentTarget;
    const inputs = form.querySelectorAll('label input');
    const div = form.querySelector('label div');
    if(!inputs[0].classList.contains('erroreM')){
        if(inputs[0].value.trimEnd().trimStart() === div.querySelector('p').textContent)
            chiudiModifica(form, div.querySelector('p').textContent);
        else
            fetch("/laravel/public/infoProfilo/" + form.name, {method: 'post', body: new FormData(form)}).then(onResponse).then(esitoModificaDati);
    }
}

function inviaPasswords(event){
    event.preventDefault();
    const errore = document.querySelector('p.errore.margineRidotto');
    if(document.password.querySelector('.erroreM') === null && errore.textContent !== "La password vecchia non corrisponde, riprovare" && controlloPassword()){
        document.password.classList.add('hidden');
        fetch("/laravel/public/infoProfilo/modificaPassword", {method: 'post', body: new FormData(document.password)}).then(onResponse).then(esitoCambioPassword);
    }
}

//CONTROLLO DATI --------------------------------------------------------------------------------------
function controlloDati(event){
    const form = event.currentTarget.parentNode.parentNode;
    const inputs = form.querySelectorAll('label input');
    const errore = document.querySelector('p.errore.margineRidotto');
    if(inputs[0].value.trimEnd().trimStart().length === 0){
        if(errore.textContent != "Non puoi lasciare il campo vuoto")
            errore.textContent = "Non puoi lasciare il campo vuoto";
        if(!inputs[0].classList.contains('erroreM'))
            inputs[0].classList.add('erroreM');
    }
    else if(inputs[0].name !== "data" && inputs[0].value.trimEnd().trimStart().length.toString() > inputs[0].dataset.max && 
            !(inputs[0].value.trimEnd().trimStart().length.toString().length < inputs[0].dataset.max.length)){
        if(errore.textContent != "Puoi inserire al massimo " + inputs[0].dataset.max + " caratteri")
            errore.textContent = "Puoi inserire al massimo " + inputs[0].dataset.max + " caratteri";
        if(!inputs[0].classList.contains('erroreM'))
            inputs[0].classList.add('erroreM');
    }
    else{
        if(errore.textContent.length !== 0)
            errore.textContent = "";
        if(inputs[0].classList.contains('erroreM'))
            inputs[0].classList.remove('erroreM');
    }
}

//CONTROLLO PASSWORD -------------------------------------------------------------------------------------------------------------------------------------------------------
function controlloPassword(){
    const errore = document.querySelector('p.errore.margineRidotto');
    if(document.password.vecchiaPassword.value.trimEnd().trimStart().length < 8){
        errore.textContent = "Le passwords devono essere di almeno 8 caratteri";
        document.password.vecchiaPassword.addEventListener('keyup', ottoCaratteri);
        document.password.vecchiaPassword.classList.add('erroreM');
    }
    else if(document.password.nuovaPassword.value.trimEnd().trimStart().length < 8){
        errore.textContent = "Le passwords devono essere di almeno 8 caratteri";
        document.password.nuovaPassword.addEventListener('keyup', ottoCaratteri);
        document.password.nuovaPassword.classList.add('erroreM');   
    }
    else if(document.password.vecchiaPassword.value.trimEnd().trimStart() === document.password.nuovaPassword.value.trimEnd().trimStart()){
        errore.textContent = "La nuova password non deve essere uguale alla vecchia";
        document.password.nuovaPassword.addEventListener('keyup', nuovaPassword);
        document.password.nuovaPassword.classList.add('erroreM');   
    }
    else if(document.password.nuovaPassword.value.trimEnd().trimStart() !== document.password.confermaPassword.value.trimEnd().trimStart()){
        errore.textContent = "Le due password non corrispondono";
        document.password.nuovaPassword.addEventListener('keyup', confermaPassword);
        document.password.confermaPassword.addEventListener('keyup', confermaPassword);
        document.password.nuovaPassword.classList.add('erroreM'); 
        document.password.confermaPassword.classList.add('erroreM');   
    }
    else
        return true;
    return false;
}

function ottoCaratteri(event){
    const errore = document.querySelector('p.errore.margineRidotto');
    input = event.currentTarget;
    if(input.value.trimEnd().trimStart().length >= 8){
        input.classList.remove('erroreM');
        input.removeEventListener('keyup', ottoCaratteri);
        if(errore.textContent.length !== 0)
        errore.textContent = "";
        controlloPassword();
    }
}

function nuovaPassword(){
    const errore = document.querySelector('p.errore.margineRidotto');
    if(document.password.vecchiaPassword.value.trimEnd().trimStart() !== document.password.nuovaPassword.value.trimEnd().trimStart()){
        document.password.nuovaPassword.classList.remove('erroreM');
        document.password.nuovaPassword.removeEventListener('keyup', nuovaPassword);
        if(errore.textContent.length !== 0)
        errore.textContent = "";
        controlloPassword();
    }
}

function confermaPassword(){
    const errore = document.querySelector('p.errore.margineRidotto');
    if(document.password.nuovaPassword.value.trimEnd().trimStart() === document.password.confermaPassword.value.trimEnd().trimStart()){
        document.password.nuovaPassword.classList.remove('erroreM');
        document.password.nuovaPassword.removeEventListener('keyup', confermaPassword);
        document.password.confermaPassword.classList.remove('erroreM');
        document.password.confermaPassword.removeEventListener('keyup', confermaPassword);
        if(errore.textContent.length !== 0)
        errore.textContent = "";
        controlloPassword();
    }
}

function vecchiaPassword(){
    const errore = document.querySelector('p.errore.margineRidotto');
    document.password.vecchiaPassword.removeEventListener('keyup', vecchiaPassword);
    document.password.vecchiaPassword.classList.remove('erroreM');
    if(errore.textContent.length !== 0)
    errore.textContent = "";
    controlloPassword();
}

//MODIFICA DATI -------------------------------------------------------------------------------------------------------------------------------------------------------
function xButtonClick(event){
    const form = event.currentTarget.parentNode.parentNode;
    chiudiModifica(form, form.querySelector('label div p').textContent);
}

function chiudiModifica(form, value){
    const div = form.querySelector('label div');
    if(div.classList.contains('hidden')){
        const p = div.querySelector('p');
        if(p.textContent !== value.trimEnd().trimStart())
            p.textContent = value.trimEnd().trimStart();
        div.classList.remove('hidden');
        form.querySelector('.xButton').classList.add('hidden');
        const inputs = form.querySelectorAll('label input');
        inputs[0].classList.add('hidden');
        inputs[1].classList.add('hidden');
        const errore = document.querySelector('p.errore.margineRidotto');
        if(errore.textContent.length !== 0)
            errore.textContent = "";
    }
}

function riApriModifica(event){
    chiudiAltro();
    const div = event.currentTarget.parentNode;
    const form = div.parentNode.parentNode;
    div.classList.add('hidden');
    form.querySelector('.xButton').classList.remove('hidden');
    inputs = form.querySelectorAll('label input');
    inputs[0].classList.remove('hidden');
    inputs[0].value = div.querySelector('p').textContent;
    inputs[1].classList.remove('hidden');
}

function apriModifica(event){
    chiudiAltro();
    const div = event.currentTarget.parentNode;
    const label = div.parentNode;
    div.classList.add('hidden');
    const input = document.createElement('input');
    input.name = div.dataset.name;
    input.type = (div.dataset.name !== 'data') ? "text":"date";
    input.value = div.querySelector('p').textContent;
    input.dataset.max = div.dataset.max;
    input.addEventListener('keyup', controlloDati);
    input.classList.add('barraInput');
    label.appendChild(input);
    const submit = document.createElement('input');
    submit.type = 'submit';
    submit.classList.add('submit');
    label.appendChild(submit);
    submit.parentNode.parentNode.addEventListener('submit', inviaDati);
    const xButton = document.createElement('img');
    xButton.src = "/laravel/public/img/xButton.jpg";
    xButton.classList.add('pointer');
    xButton.classList.add('xButton');
    xButton.addEventListener('click', xButtonClick);
    label.appendChild(xButton);
    event.currentTarget.removeEventListener('click', apriModifica);
    event.currentTarget.addEventListener('click', riApriModifica);
}

//MODIFICA PASSWORD -------------------------------------------------------------------------------------------------------------------------------------------------------
function chiudiModificaPassword(){
    const errore = document.querySelector('p.errore.margineRidotto');
    if(document.password.vecchiaPassword.classList.contains('erroreM')){
        document.password.vecchiaPassword.classList.remove('erroreM');
        if(errore.textContent === "Le password devono essere di almeno 8 caratteri")
            document.password.vecchiaPassword.removeEventListener('keyup', ottoCaratteri);
        else if(errore.textContent === "La password vecchia non corrisponde, riprovare")
            document.password.vecchiaPassword.removeEventListener('keyup', vecchiaPassword);
    }
    if(document.password.nuovaPassword.classList.contains('erroreM')){
        document.password.nuovaPassword.classList.remove('erroreM');
        if(errore.textContent === "Le password devono essere di almeno 8 caratteri")
            document.password.nuovaPassword.removeEventListener('keyup', ottoCaratteri);
        if(errore.textContent === "La nuova password non deve essere uguale alla vecchia");
            document.password.nuovaPassword.removeEventListener('keyup', nuovaPassword);
        if(errore.textContent === "Le due password non corrispondono")
            document.password.nuovaPassword.removeEventListener('keyup', confermaPassword);
    }
    if(document.password.confermaPassword.classList.contains('erroreM')){
        document.password.confermaPassword.classList.remove('erroreM');
        if(errore.textContent === "Le due password non corrispondono")
            document.password.confermaPassword.removeEventListener('keyup', confermaPassword);
    }
    document.password.vecchiaPassword.value = document.password.nuovaPassword.value = document.password.confermaPassword.value = "";
    document.password.parentNode.querySelector('div').classList.remove('hidden');
    document.password.classList.add('hidden');
    if(errore.textContent.length !== 0)
        errore.textContent = "";
}

function riApriModificaPassword(event){
    chiudiAltro();
    const errore = document.querySelector('p.errore.margineRidotto');
    const pulsante = event.currentTarget;
    pulsante.classList.add('hidden');
    document.password.classList.remove('hidden');
}

function apriModificaPassword(event){
    chiudiAltro();
    const pulsante = event.currentTarget;
    pulsante.classList.add('hidden');
    pulsante.removeEventListener("click", apriModificaPassword);
    pulsante.addEventListener("click", riApriModificaPassword);
    const section = pulsante.parentNode;
    const form = document.createElement('form');
    form.name = "password";
    form.addEventListener('submit', inviaPasswords);
    section.appendChild(form);
    const token = document.createElement('input');
    token.type = "hidden";
    token.name = "_token";
    token.value = document.querySelector("input[name='_token']").value;
    form.appendChild(token);
    const xButton = document.createElement('img');
    xButton.src = "/laravel/public/img/xButton.jpg";
    xButton.classList.add('pointer');
    xButton.addEventListener('click', chiudiModificaPassword);
    xButton.classList.add('xButton');
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