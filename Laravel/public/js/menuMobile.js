//Prima apertura -------------------------------------------------------------------------------------------------------------------------------------------------------
function chiudiMenu(event){
    const conteiner = event.currentTarget.querySelector('#nav-conteiner');
    conteiner.classList.add('hidden');
    menuPochiPixel.removeEventListener('click', chiudiMenu);
    menuPochiPixel.addEventListener('click', riapriMenu);
}

function riapriMenu(event){
    const conteiner = event.currentTarget.querySelector('#nav-conteiner');
    conteiner.classList.remove('hidden');
    menuPochiPixel.removeEventListener('click', riapriMenu);
    menuPochiPixel.addEventListener('click', chiudiMenu);
}


//Prima apertura -------------------------------------------------------------------------------------------------------------------------------------------------------
function apriMenu(event){
    const conteiner = event.currentTarget.querySelector('#nav-conteiner');
    conteiner.classList.remove('hidden');
    const login = document.querySelector('#login');
    conteiner.appendChild(login);
    const nav = document.createElement('nav');
    const ul = document.createElement('ul');
    const a = document.querySelectorAll('header nav a');
    for(item of a){
        const li = document.createElement('li');
        li.appendChild(item);
        ul.appendChild(li);
    }
    nav.appendChild(ul);
    conteiner.appendChild(nav);
    menuPochiPixel.removeEventListener('click', apriMenu); 
    menuPochiPixel.addEventListener('click', chiudiMenu);
}


//CONFIGURAZIONE INIZIALE -------------------------------------------------------------------------------------------------------------------------------------------------------
const menuPochiPixel = document.querySelector('#menu-pochi-pixel');
menuPochiPixel.addEventListener('click', apriMenu); 