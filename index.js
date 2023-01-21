// ref to HTML element
let form = document.getElementById('form')
let div = document.getElementById('spesa-div');
let title = document.getElementById('title');
let input = document.getElementById('text-input')
let button = document.getElementById('spesa-button');
// add eventlistner
button.addEventListener('click', addItem)
document.addEventListener('DOMContentLoaded', displayStorage);


function createItemsList(value){
    let p = document.createElement('p')
    p.innerHTML = value
    if(value === ''){
        p.innerHTML = 'Non hai inserito alcun elemento, perfavore inserisci un elemento'
        p.style.color = 'red'
        form.appendChild(p)
        setTimeout(function(){
            p.remove();
        }, 3000)
    }
    div.appendChild(p)
    return p
}

// function add item on list
function addItem(){
    let value = input.value
    if (value === ''){
        createItemsList(value)
    } else {
        createItemsList(value)
        updateStorage(value)
    }
}

// update storage from element list
function updateStorage(value){
    
    let itemList = localStorage.getItem('itemList') ? JSON.parse(localStorage.getItem('itemList')) : [];

    itemList.push(value);
    localStorage.setItem('itemList', JSON.stringify(itemList));
    console.log(itemList)
}


// display item in local storage
function displayStorage(){
    let exists = localStorage.getItem('itemList');
    
    if(exists){
        let storageItems = JSON.parse(localStorage.getItem('itemList'));
        storageItems.forEach(function(element){
            createItemsList(element);
        })
    }
}








    


