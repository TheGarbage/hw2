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
        if(json['risposta'] === "Username non disponibile")
        form.userName.parentNode.classList.add('erroreL')
    }
}

//FUNZIONI CONTROLLO POST SUBMIT-------------------------------------------------------------------------------------------------------------------------------------------------------
function controlloContenutoRegistrazione(event){
    const errore = document.querySelector('p.erroreL');
    event.preventDefault();
    if(document.querySelector('label.erroreL') !== null && errore.textContent !== "Username non disponibile");
    else if(form.nomeCognome.value.length === 0 || form.userName.value.length === 0 || form.passWord.value.length === 0 ||
        form.confermaPassword.value.length === 0 || form.occupazione.value.length === 0 || form.dataNascita.value.length === 0){
        errore.textContent = "Devi compilare tutti i campi";
        if(form.nomeCognome.value.length == 0) {
            form.nomeCognome.parentNode.classList.add('erroreL');
            form.nomeCognome.addEventListener('blur', controllaErrore);
        }
        if(form.userName.value.length == 0) {
            form.userName.parentNode.classList.add('erroreL');
            form.userName.addEventListener('blur', controllaErrore);
        }
        if(form.passWord.value.length == 0) {
            form.passWord.parentNode.classList.add('erroreL');
            form.passWord.addEventListener('blur', controllaErrore);
        }
        if(form.confermaPassword.value.length == 0) {
            form.confermaPassword.parentNode.classList.add('erroreL');
            form.confermaPassword.addEventListener('blur', controllaErrore);
        }
        if(form.occupazione.value.length == 0) {
            form.occupazione.parentNode.classList.add('erroreL');
            form.occupazione.addEventListener('blur', controllaErrore);
        }       
        if(form.dataNascita.value.length === 0) {
            form.dataNascita.parentNode.classList.add('erroreL');
            form.dataNascita.addEventListener('blur', controllaErrore);
        }
    }
    else if(form.nomeCognome.value.length.toString() > form.nomeCognome.dataset.max && 
            !(form.nomeCognome.value.length.toString().length < form.nomeCognome.dataset.max.length)){
        errore.textContent = "Nome e cognome troppo lunghi(Max 50)";
        form.nomeCognome.parentNode.classList.add('erroreL');
        form.nomeCognome.addEventListener('blur', controllaLunghezza);
    }
    else if(form.userName.value.length.toString() > form.userName.dataset.max && 
            !(form.userName.value.length.toString().length < form.userName.dataset.max.length)){
        errore.textContent = "Username troppo lungo(Max 20)";
        form.userName.parentNode.classList.add('erroreL');
        form.userName.addEventListener('blur', controllaLunghezza);
    }
    else if(form.occupazione.value.length.toString() > form.occupazione.dataset.max && 
            !(form.occupazione.value.length.toString().length < form.occupazione.dataset.max.length)){
        errore.textContent = "Ocupazione troppo lunga(Max 30)";
        form.occupazione.parentNode.classList.add('erroreL');
        form.occupazione.addEventListener('blur', controllaLunghezza);
    }
    else if(form.passWord.value.length < 8){
        errore.textContent = "La password deve essere di almeno 8 caratteri";
        form.passWord.parentNode.classList.add('erroreL');
        form.passWord.addEventListener('blur', controllaLunghezzaPassword);
    }
    else if(form.passWord.value !== form.confermaPassword.value){
        errore.textContent = "Le due password non corrispondono";
        form.confermaPassword.parentNode.classList.add('erroreL');
        form.confermaPassword.addEventListener('blur', controllaPassword);
    }
    else if(!form.privacy.checked){
        errore.textContent = "Accetta la condizione sul trattamento dei dati";
        form.privacy.parentNode.classList.add('erroreL');
        form.privacy.addEventListener('click', privacyAccettata)
    }     
    else{
        form.classList.add('hidden');
        if(errore.textContent === "Username non disponibile"){
            form.userName.parentNode.classList.remove('erroreL');
            errore.textContent = "";
        }
        fetch("server-database.php?comando=registrazione", {method: 'post', body: new FormData(form)}).then(rispostaRegistrazione).then(stampa);
    }
}

function controlloContenutoLogin(event){
    const errore = document.querySelector('p.erroreL');
    if(document.querySelector('label.erroreL') !== null && errore.textContent !== "Credenziali non valide")
        event.preventDefault();
    else if(form.userName.value.length == 0 ||
       form.passWord.value.length == 0){
        event.preventDefault();
        if(errore.textContent === "Credenziali non valide"){
            if(form.userName.value.length != 0) form.userName.parentNode.classList.remove('erroreL');
            if(form.passWord.value.length != 0) form.passWord.parentNode.classList.remove('erroreL');
        }
        document.querySelector('p.erroreL').textContent = "Devi compilare tutti i campi";
        if(form.userName.value.length == 0) {
            if(!form.userName.classList.contains('erroreL')) form.userName.parentNode.classList.add('erroreL');
            form.userName.addEventListener('blur', controllaErrore);
        }
        if(form.passWord.value.length == 0) {
            if(!form.passWord.classList.contains('erroreL')) form.passWord.parentNode.classList.add('erroreL');
            form.passWord.addEventListener('blur', controllaErrore);
        } 
    }
}

//FUNZIONI CONTROLLO PRE-SUBMIT -------------------------------------------------------------------------------------------------------------------------------------------------------
function controllaLunghezza(event){
    const input = event.currentTarget;
    if(input.value.length.toString() < input.dataset && !(input.value.length.toString().length > input.dataset.max.length)){
        input.parentNode.classList.remove('erroreL');
        input.removeEventListener('blur', controllaLunghezza);
        document.querySelector('p.erroreL').textContent = "";
    }
}

function controllaLunghezzaPassword(){
    if(form.passWord.value.length.toString() > 7){
        form.passWord.parentNode.classList.remove('erroreL');
        form.passWord.removeEventListener('blur', controllaLunghezzaPassword);
        document.querySelector('p.erroreL').textContent = "";
    }
}

function controllaErrore(event){
    const input = event.currentTarget;
    if(input.value.length !== 0){
        input.parentNode.classList.remove('erroreL');
        input.removeEventListener('blur', controllaErrore);
        if(document.querySelector('label.erroreL') === null)
            document.querySelector('p.erroreL').textContent = "";
    }
}

function controllaPassword(){
    if(form.confermaPassword.value === form.passWord.value){
        form.confermaPassword.parentNode.classList.remove('erroreL');
        document.querySelector('p.erroreL').textContent = "";
    }
}

function privacyAccettata(event){
    const privacy = event.currentTarget;
    privacy.parentNode.classList.remove('erroreL');
    privacy.removeEventListener('click', privacyAccettata);
    document.querySelector('p.erroreL').textContent = "";
}

//SWITCH REGISTRAZIONE LOGIN -------------------------------------------------------------------------------------------------------------------------------------------------------
function rimuoviErrori(event){
    const p = event.currentTarget;
    const main = p.parentNode.parentNode;
    for(item of main.querySelectorAll('label')){
        if(item.classList.contains('erroreL')){
            item.classList.remove('erroreL');
            item.removeEventListener('blur', controllaErrore);
            item.removeEventListener('blur', controllaLunghezza);
        }
    }
    document.querySelector('.erroreL').textContent = "";
}

function registrazioneBis(event){
    const p = event.currentTarget;
    const form = p.parentNode;
    const titolo = form.querySelector("h2");
    for(item of form.querySelectorAll('[data-registrazione]'))
        item.classList.remove('hidden');
    p.textContent = "Se hai gia` un account loggati";
    titolo.textContent = "Benvenuto";
    p.removeEventListener('click', registrazioneBis);
    p.addEventListener('click', login);
    form.removeEventListener('submit', controlloContenutoLogin);
    form.addEventListener('submit', controlloContenutoRegistrazione);
}

function login(event){
    const p = event.currentTarget;
    const form = p.parentNode;
    const titolo = form.querySelector("h2");
    for(item of form.querySelectorAll('[data-registrazione]'))
        item.classList.add('hidden');
    p.textContent = "Se non hai un account registrati!";
    titolo.textContent = "Bentornato";
    p.removeEventListener('click', login);
    p.addEventListener('click', registrazioneBis);
    form.removeEventListener('submit', controlloContenutoRegistrazione);
    form.addEventListener('submit', controlloContenutoLogin);
}

function registrazione(event){
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
    p.removeEventListener('click', registrazione);
    p.addEventListener('click', login);
    form.removeEventListener('submit', controlloContenutoLogin);
    form.addEventListener('submit', controlloContenutoRegistrazione);
}

//CONFIGURAZIONE INIZIALE -------------------------------------------------------------------------------------------------------------------------------------------------------
const form = document.forms['login'];
form.addEventListener('submit', controlloContenutoLogin);
const p = document.querySelector('p');
p.addEventListener('click', registrazione);
p.addEventListener('click', rimuoviErrori);
