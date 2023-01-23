// ref to HTML element
let form = document.getElementById('form')
let div = document.getElementById('spesa-div');
let title = document.getElementById('title');
let input = document.getElementById('text-input')
let button = document.getElementById('spesa-button');
// add eventlistner
button.addEventListener('click', addItem)
// document.addEventListener('DOMContentLoaded', displayStorage);


function createItemsList(value){
    let p = document.createElement('p')
    p.innerHTML = value
    if(value === ''){
        p.innerHTML = 'Non hai inserito alcun elemento, perfavore inserisci un elemento'
        p.style.color = 'red'
        div.appendChild(p)
        setTimeout(function(){
            p.remove();
        }, 3000)
    } else {
        div.appendChild(p)
    }
    return p
}

// function add item on list
function addItem(){
    let value = input.value
    if (value === ''){
        createItemsList(value)
    } else {
        writeStorage()
        
    }
}



async function displayStorage(){
    const apiURL = fetch('http://vimaxnas.ddns.net:3000/lista')
    // gestisci il successo
    .then(response => response.json())  // converti a json
    .then(json => {
        value = json
        return Object.values(value)
    })    // stampa i dati sulla console
    .catch(err => console.log('Request Failed', err)); 
    return apiURL
}
// console.log(createItemsList(displayStorage()))
displayStorage().then(json => {
    for (i=0;i<json.length;i++){
        let v = json[`${i}`].product
        createItemsList(v)
    }
})

function writeStorage(){
    let data = {
        product: `${input.value}`
    }

    fetch('http://vimaxnas.ddns.net:3000/lista', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json())
    .then(response => console.log(response.json()));
}