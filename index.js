// ref to HTML element
let form = document.getElementById('form')
let div = document.getElementById('spesa-div');
let title = document.getElementById('title');
let input = document.getElementById('text-input')
let button = document.getElementById('spesa-button');
let elimina = document.getElementById('cancella-lista')

// add eventlistner
button.addEventListener('click', addItem)
elimina.addEventListener('click', removeAllItems)
document.addEventListener('DOMContentLoaded', displayStorage);

// crea il template dell'elemento HTML in lista e ne verifica il contenuto
function createItemsList(value){
    let e = document.createElement('h2')
    let p = document.createElement('p')
    p.setAttribute('id', `${value}`)
    p.setAttribute('class', 'effect')
    p.innerHTML = value
    p.addEventListener('click', function(){
        p.style.textDecoration = 'line-through'
        p.style.color = 'red'
    })
    p.addEventListener('dblclick', function(){
        let p = document.createElement('h1')
        p.innerHTML = 'elimino elemento'
        p.style.color = 'green'
        div.appendChild(p)
        removeItems(value);
        setTimeout(() => {
            document.location.reload();
        }, 1000);
    })
    if(value === ''){
        e.innerHTML = 'Impossibile inoltrare, perfavore inserisci un elemento'
        e.style.color = 'red'
        div.appendChild(e)
        setTimeout(function(){
            e.remove();
        }, 3000)
    } 
    // else if(displayStorage().then(json => json) == checkItemsInList(value)){
    //     checkItemsInList(value)
    // }
    else {
        div.appendChild(p)
    }
    return p
}

// gestisce gli elementi in lista
function addItem(){
    let value = input.value
    if (value === ''){
        createItemsList(value)
        setTimeout(() => {
            document.location.reload();
        }, 1000);
    }
    else {
        // checkItemsInList(value)
        createItemsList(value)
        writeStorage(value)
        setTimeout(() => {
            document.location.reload();
        }, 1000);
    }

}


// mostra gli elementi in lista
async function displayStorage(){
    const apiURL = fetch('https://home-things.cloud:3000/lista')
    // gestisci il successo
    .then(response => response.json())  // converto in json
    .then(json => {
        value = json
        return Object.values(value)
    })    // restituisco i dati della response
    .catch(err => console.log('Request Failed', err)); 
    return apiURL
} // iterazione sugli elementi che verranno mostrati in lista
displayStorage().then(json => {
    for (i=0;i<json.length;i++){
        let v = json[`${i}`].product
        createItemsList(v)
    }
})



// scrivo gli elementi provenienti dal text-input su file JSON
function writeStorage(value){
    let data = {
        product: `${value}`
    }
    fetch('https://home-things.cloud:3000/lista', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json())
}        


// rimuovo i singoli elementi
function removeItems(value){
    displayStorage().then(json => {
        for (i=0;i<json.length;i++){
            a = json[`${i}`]
            if (value == a.product){
                let id = a.id
                fetch('https://home-things.cloud:3000/lista/' + id, {
                    method: 'DELETE',
                })
                .then(res => res.json()) // or res.json()
                .then(res => console.log(res))
            }
        } 
    })
}
// removeItems(c)

function removeAllItems(){
    let x = []
    displayStorage().then(json => {
        for (i=0;i<json.length;i++){
        let a = json[`${i}`].id
        x.push(a)
        }
            if (x.length == 0){
                let p = document.createElement('h1')
                p.innerHTML = 'lista vuota'
                p.style.color = 'red'
                div.appendChild(p)
                setTimeout(function(){
                    p.remove();
                }, 3000)
            } else {
                for (i=0;i<json.length;i++){
                    let a = json[`${i}`].id
                fetch('https://home-things.cloud:3000/lista/' + a, {
                method: 'DELETE',
                })
                .then(res => res.json()) // or res.json()
                .then(res => console.log(res))
                setTimeout(() => {
                    document.location.reload();
                }, 1000);
            }
        }
    })
}

// setTimeout("location.reload(true);", 10000);