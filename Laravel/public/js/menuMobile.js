//Prima apertura -------------------------------------------------------------------------------------------------------------------------------------------------------
function chiudiMenu(event){
    const conteiner = bottoneMenuPochiPixel.parentNode.querySelector('#nav-conteiner');
    conteiner.classList.add('hidden');
    bottoneMenuPochiPixel.removeEventListener('click', chiudiMenu);
    bottoneMenuPochiPixel.addEventListener('click', riapriMenu);
}

function riapriMenu(event){
    const conteiner = bottoneMenuPochiPixel.parentNode.querySelector('#nav-conteiner');
    conteiner.classList.remove('hidden');
    bottoneMenuPochiPixel.removeEventListener('click', riapriMenu);
    bottoneMenuPochiPixel.addEventListener('click', chiudiMenu);
}


//Prima apertura -------------------------------------------------------------------------------------------------------------------------------------------------------
function apriMenu(event){
    const conteiner = bottoneMenuPochiPixel.parentNode.querySelector('#nav-conteiner');
    conteiner.classList.remove('hidden');
    const login = document.querySelector('#login');
    conteiner.appendChild(login.cloneNode(true));
    const nav = document.createElement('nav');
    const ul = document.createElement('ul');
    const a = document.querySelectorAll('header nav a');
    for(item of a){
        const li = document.createElement('li');
        li.appendChild(item.cloneNode(true));
        ul.appendChild(li);
    }
    nav.appendChild(ul);
    conteiner.appendChild(nav);
    bottoneMenuPochiPixel.removeEventListener('click', apriMenu); 
    bottoneMenuPochiPixel.addEventListener('click', chiudiMenu);
}


//CONFIGURAZIONE INIZIALE -------------------------------------------------------------------------------------------------------------------------------------------------------
const bottoneMenuPochiPixel = document.querySelector('#bottone');
bottoneMenuPochiPixel.addEventListener('click', apriMenu); 