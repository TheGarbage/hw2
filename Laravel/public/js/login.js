//RISPOSTA SERVER-------------------------------------------------------------------------------------------------------------------------------------------------------
function rispostaRegistrazione(response){
    return response.json();
}

function stampa(json){
    const errore = document.querySelector('p.erroreL');
    if(json['risposta'] === "ok")
        form.submit();
    else{
        errore.textContent = json['risposta'];
        form.classList.remove('hidden');
        document.querySelector('main img').classList.remove('hidden');
        if(json['risposta'] === "Username non disponibile"){
            form.userName.parentNode.classList.add('erroreL');
            form.userName.addEventListener('keyup', usernameNonDisponibile);
        }
    }
}

//FETCH-------------------------------------------------------------------------------------------------------------------------------------------------------
function submitRegistrazione(event){
    event.preventDefault();
    const errore = document.querySelector('p.erroreL');
    if(errore.textContent !== "Username non disponibile" && controlloContenutoRegistrazione()){
        form.classList.add('hidden');
        document.querySelector('main img').classList.add('hidden');
        fetch('/laravel/public/registration', {method: 'post', body: new FormData(form)}).then(rispostaRegistrazione).then(stampa);
    }
}

function submitLogin(event){
    const errore = document.querySelector('p.erroreL');
    if(errore.textContent === "Credenziali non valide" || !controlloContenutoLogin())
        event.preventDefault();
}

//FUNZIONI CONTROLLO GENERALI-------------------------------------------------------------------------------------------------------------------------------------------------------
function controlloContenutoRegistrazione(){
    const errore = document.querySelector('p.erroreL');
    if(errore.textContent.length !== 0)
        errore.textContent = "";
    if(form.nomeCognome.value.trimEnd().trimStart().length === 0) {
        form.nomeCognome.parentNode.classList.add('erroreL');
        form.nomeCognome.addEventListener('keyup', controllaVuoto);
        errore.textContent = "Campo nome e cognome obbligatorio";
    }
    else if(form.nomeCognome.value.trimEnd().trimStart().length.toString() > form.nomeCognome.dataset.max && 
            !(form.nomeCognome.value.trimEnd().trimStart().length.toString().length < form.nomeCognome.dataset.max.length)){
        errore.textContent = "Nome e cognome troppo lunghi(Max 50)";
        form.nomeCognome.parentNode.classList.add('erroreL');
        form.nomeCognome.addEventListener('keyup', controllaLunghezza);
    }
    else if(form.userName.value.trimEnd().trimStart().length === 0) {
        form.userName.parentNode.classList.add('erroreL');
        form.userName.addEventListener('keyup', controllaVuoto);
        errore.textContent = "Campo username obbligatorio";
    }
    else if(form.userName.value.trimEnd().trimStart().length.toString() > form.userName.dataset.max && 
            !(form.userName.value.trimEnd().trimStart().length.toString().length < form.userName.dataset.max.length)){
        errore.textContent = "Username troppo lungo(Max 20)";
        form.userName.parentNode.classList.add('erroreL');
        form.userName.addEventListener('keyup', controllaLunghezza);
    }
    else if(form.passWord.value.trimEnd().trimStart().length === 0) {
        form.passWord.parentNode.classList.add('erroreL');
        form.passWord.addEventListener('keyup', controllaVuoto);
        errore.textContent = "Campo password obbligatorio";
    }
    else if(form.passWord.value.trimEnd().trimStart().length < 8){
        errore.textContent = "La password deve essere di almeno 8 caratteri";
        form.passWord.parentNode.classList.add('erroreL');
        form.passWord.addEventListener('keyup', controllaLunghezzaPassword);
    }
    else if(form.passWord.value.trimEnd().trimStart() !== form.confermaPassword.value.trimEnd().trimStart()){
        errore.textContent = "Le due passwords non corrispondono";
        form.passWord.parentNode.classList.add('erroreL');
        form.confermaPassword.parentNode.classList.add('erroreL');
        form.passWord.addEventListener('keyup', controllaPassword);
        form.confermaPassword.addEventListener('keyup', controllaPassword);
    }
    else if(form.occupazione.value.trimEnd().trimStart().length === 0) {
        form.occupazione.parentNode.classList.add('erroreL');
        form.occupazione.addEventListener('keyup', controllaVuoto);
        errore.textContent = "Campo occupazione obbligatorio";
    }
    else if(form.occupazione.value.trimEnd().trimStart().length.toString() > form.occupazione.dataset.max && 
            !(form.occupazione.value.trimEnd().trimStart().length.toString().length < form.occupazione.dataset.max.length)){
        errore.textContent = "Ocupazione troppo lunga(Max 30)";
        form.occupazione.parentNode.classList.add('erroreL');
        form.occupazione.addEventListener('keyup', controllaLunghezza);
    }       
    else if(form.dataNascita.value.trimEnd().trimStart().length === 0) {
        form.dataNascita.parentNode.classList.add('erroreL');
        form.dataNascita.addEventListener('keyup', controllaVuoto);
        errore.textContent = "Campo giorno nascita obbligatorio";
    }
    else if(!form.privacy.checked){
        errore.textContent = "Accetta la condizione sul trattamento dei dati";
        form.privacy.parentNode.classList.add('erroreL');
        form.privacy.addEventListener('click', privacyAccettata)
    }    
    else
        return true;
    return false; 
}

function controlloContenutoLogin(){
    const errore = document.querySelector('p.erroreL');
    if(errore.textContent.length !== 0)
        errore.textContent = "";
    if(form.userName.value.trimEnd().trimStart().length === 0){
        errore.textContent = "Campo username obbligatorio";
        form.userName.parentNode.classList.add('erroreL');
        form.userName.addEventListener('keyup', controllaVuoto);
    }
    else if(form.passWord.value.trimEnd().trimStart().length === 0){
        errore.textContent = "Campo password obbligatorio";
        form.passWord.parentNode.classList.add('erroreL');
        form.passWord.addEventListener('keyup', controllaVuoto);
    }
    else
        return true;
    return false;
}

//FUNZIONI CONTROLLO SPECIFICHE -------------------------------------------------------------------------------------------------------------------------------------------------------
function controllaLunghezza(event){
    const input = event.currentTarget;
    if(input.value.trimEnd().trimStart().length.toString() < input.dataset && 
       !(input.value.trimEnd().trimStart().length.toString().length > input.dataset.max.length)){
        input.parentNode.classList.remove('erroreL');
        input.removeEventListener('keyup', controllaLunghezza);
        controlloContenutoRegistrazione();
    }
}

function controllaLunghezzaPassword(){
    if(form.passWord.value.trimEnd().trimStart().length.toString() > 7){
        form.passWord.parentNode.classList.remove('erroreL');
        form.passWord.removeEventListener('keyup', controllaLunghezzaPassword);
        controlloContenutoRegistrazione();
    }
}

function controllaVuoto(event){
    console.log('ciao');
    const input = event.currentTarget;
    if(input.value.trimEnd().trimStart().length !== 0){
        input.parentNode.classList.remove('erroreL');
        input.removeEventListener('keyup', controllaVuoto);
        if(form.querySelector('h2').textContent === "Benvenuto")
            controlloContenutoRegistrazione();
        else 
            controlloContenutoLogin();
    }
}

function controllaPassword(){
    if(form.confermaPassword.value.trimEnd().trimStart() === form.passWord.value.trimEnd().trimStart()){
        form.passWord.parentNode.classList.remove('erroreL');
        form.confermaPassword.parentNode.classList.remove('erroreL');
        form.passWord.removeEventListener('keyup', controllaPassword);
        form.confermaPassword.removeEventListener('keyup', controllaPassword);
        controlloContenutoRegistrazione();
    }
}

function privacyAccettata(event){
    const privacy = event.currentTarget;
    privacy.parentNode.classList.remove('erroreL');
    privacy.removeEventListener('click', privacyAccettata);
    controlloContenutoRegistrazione();
}

function credenzialiNonValide(){
    form.removeEventListener('keyup', credenzialiNonValide);
    form.userName.parentNode.classList.remove('erroreL');
    form.passWord.parentNode.classList.remove('erroreL');
    const errore = document.querySelector('p.erroreL');
    if(errore.textContent.length !== 0)
        errore.textContent = "";   
}

function usernameNonDisponibile(){
    form.userName.removeEventListener('keyup', usernameNonDisponibile);
    form.userName.parentNode.classList.remove('erroreL');
    const errore = document.querySelector('p.erroreL');
    if(errore.textContent.length !== 0)
        errore.textContent = "";   
}

//SWITCH REGISTRAZIONE LOGIN -------------------------------------------------------------------------------------------------------------------------------------------------------
function rimuoviErrori(event){
    const p = event.currentTarget;
    const main = p.parentNode.parentNode;
    const errore = document.querySelector('p.erroreL');
    if(errore.textContent === "Credenziali non valide"){
        form.userName.parentNode.classList.remove('erroreL');
        form.passWord.parentNode.classList.remove('erroreL');
    }
    for(item of main.querySelectorAll('label')){
        if(item.classList.contains('erroreL')){
            item.classList.remove('erroreL');
            form.replaceChild(item.cloneNode(true), item);
        }
    }
    document.querySelector('.erroreL').textContent = "";
}

function riApriRegistrazione(event){
    const p = event.currentTarget;
    const form = p.parentNode;
    const titolo = form.querySelector("h2");
    for(item of form.querySelectorAll('[data-registrazione]'))
        item.classList.remove('hidden');
    p.textContent = "Se hai gia` un account loggati";
    titolo.textContent = "Benvenuto";
    p.removeEventListener('click', riApriRegistrazione);
    p.addEventListener('click', apriLogin);
    form.removeEventListener('submit', controlloContenutoLogin);
    form.addEventListener('submit', submitRegistrazione);
}

function apriLogin(event){
    const p = event.currentTarget;
    const form = p.parentNode;
    const titolo = form.querySelector("h2");
    for(item of form.querySelectorAll('[data-registrazione]'))
        item.classList.add('hidden');
    p.textContent = "Se non hai un account registrati!";
    titolo.textContent = "Bentornato";
    p.removeEventListener('click', apriLogin);
    p.addEventListener('click', riApriRegistrazione);
    form.removeEventListener('submit', submitRegistrazione);
    form.addEventListener('submit', controlloContenutoLogin);
}

function apriRegistrazione(event){
    const p = event.currentTarget;
    const form = p.parentNode;
    const titolo = form.querySelector('h2');
    const nomeCognome = document.createElement('label');
    nomeCognome.textContent = "Nome e Cognome";
    nomeCognome.dataset.registrazione = "si";
    const nomeCognomeInput = document.createElement('input');
    nomeCognomeInput.name = "nomeCognome";
    nomeCognomeInput.type = "text";
    nomeCognomeInput.dataset.max = "50";
    nomeCognomeInput.classList.add('barraInput');
    nomeCognome.appendChild(nomeCognomeInput);
    form.appendChild(nomeCognome);
    form.appendChild(form.userName.parentNode);
    form.appendChild(form.passWord.parentNode);
    const confermaPassword = document.createElement('label');
    confermaPassword.textContent = "Conferma Password";
    confermaPassword.dataset.registrazione = "si";
    const confermaPasswordInput = document.createElement('input');
    confermaPasswordInput.name = "confermaPassword";
    confermaPasswordInput.type = "password";
    confermaPasswordInput.classList.add('barraInput');
    confermaPassword.appendChild(confermaPasswordInput);
    form.appendChild(confermaPassword);
    const occupazione= document.createElement('label');
    occupazione.textContent = "Occupazione";
    occupazione.dataset.registrazione = "si";
    const occupazioneInput = document.createElement('input');
    occupazioneInput.name = "occupazione";
    occupazioneInput.type = "text";
    occupazioneInput.dataset.max = "30";
    occupazioneInput.classList.add('barraInput');
    occupazione.appendChild(occupazioneInput);
    form.appendChild(occupazione);
    const giornoNascita = document.createElement('label');
    giornoNascita.textContent = "Giorno nascita";
    giornoNascita.dataset.registrazione = "si";
    const giornoNascitaInput = document.createElement('input');
    giornoNascitaInput.name = "dataNascita";
    giornoNascitaInput.type = "date";
    giornoNascitaInput.classList.add('barraInput');
    giornoNascita.appendChild(giornoNascitaInput);
    form.appendChild(giornoNascita);
    const privacy = document.createElement('label');
    privacy.dataset.registrazione = "si";
    privacy.id = "privacy";
    const privacyInput = document.createElement('input');
    privacyInput.name = "privacy";
    privacyInput.type = "checkbox";
    privacyInput.classList.add('pointer');
    privacy.appendChild(privacyInput);
    privacy.innerHTML += "Accetto le condizioni sulla privacy";
    form.appendChild(privacy);
    form.appendChild(form.querySelector('.submit').parentNode);
    p.textContent = "Se hai gia` un account loggati";
    form.appendChild(p);
    titolo.textContent = "Benvenuto";
    p.removeEventListener('click', apriRegistrazione);
    p.addEventListener('click', apriLogin);
    form.removeEventListener('submit', submitLogin);
    form.addEventListener('submit', submitRegistrazione);
}

//CONFIGURAZIONE INIZIALE -------------------------------------------------------------------------------------------------------------------------------------------------------
const form = document.forms['login'];
form.addEventListener('submit', submitLogin);
const p = document.querySelector('p');
p.addEventListener('click', rimuoviErrori);
p.addEventListener('click', apriRegistrazione);
if(form.userName.parentNode.classList.contains('erroreL'))
    form.addEventListener('keyup', credenzialiNonValide);