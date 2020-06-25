import '../styles/index.scss';

window.onload=getData;

const button = document.getElementById('button');
const input = document.getElementById('search');

const errorOutput = document.querySelector('.error-output');
const searchResults = document.querySelector('.search-results');

const orderNumber = document.querySelector('.order-client .number');
const orderName = document.querySelector('.order-client .name');
const orderValue = document.querySelector('.order-value h2');
const orderDate = document.querySelector('.order-date h2');
const orderStatus = document.querySelector('.order-status h2');

function getData() {
    const xHR = new XMLHttpRequest();
    xHR.open('get','../../dados.json',true);
    xHR.send();
    xHR.onload = setTracking;
};

function setTracking(){
   let response = JSON.parse(this.responseText);
   console.log(response);
   
   button.addEventListener('click', ()=>{
       retrievePurchase(event,response), false;
    });
};

const retrievePurchase = (event,purchases) => {
    //console.log(purchase);
    const searchTerm = input.value;
    errorOutput.classList.add('hidden');

    if (searchTerm !== ''){
        event.preventDefault();
    };

    let result = purchases.encomendas.filter(function (e) {
        if(e.numero === searchTerm) {
            let dateStr = e.data;
            let year = dateStr.substring(0, 4);
            let month = dateStr.substring(5, 7);
            let day = dateStr.substring(8, 10);

            if(e.entregue) {
                orderStatus.innerText = 'Entregue';
            }
            else{
                orderStatus.innerText = 'Entregar';
            };
            
            orderNumber.innerText = e.cliente.id+' - ';
            orderName.innerText = e.cliente.nome;
            orderValue.innerText = 'R$ '+e.valor;
            orderDate.innerText = day+'/'+month+'/'+year;

            searchResults.classList.remove('hidden');
            return e;
        };       
    });

    if(!result.length){
        errorOutput.innerHTML='<h2>Encomenda <br>não encontrada!<h2>';
        errorOutput.innerHTML+='<h2>Procure novamente<h2>';
        errorOutput.classList.remove('hidden');
        searchResults.classList.add('hidden');
    };   
};



