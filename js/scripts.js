
function dadoRetorno(texto,max,min){
   return document.createTextNode(texto + max + "C°-" + min + "C° ");
}


function mudaCidade(cidade){

    document.querySelector(".row") != null ? document.querySelector(".row").remove() : null
    const URL = 'https://apiadvisor.climatempo.com.br/api/v1/forecast/locale/'+cidade+'/days/15?token=85d0b7516a7d9c2b89a0e3834cdaf37e';
    const URLagora = 'http://apiadvisor.climatempo.com.br/api/v1/weather/locale/'+cidade+'/current?token=85d0b7516a7d9c2b89a0e3834cdaf37e';
    console.log(URLagora);
    // const URL = 'js/dados.json';
    //instancia classe responsável ao consumo da api
    const xhr = new XMLHttpRequest();
    //define opções da requisição
    xhr.open('GET', URL, true);
    //envia requisição para a api
    xhr.send();
    //trata os dados de maneira assincrona 
    xhr.onload = function(e) {
        //salva resposta da api em uma variavel
        //e transforma resposta em um JSON válido
        const res = JSON.parse(xhr.response);
        console.log(res);
        construirQuadros(res);
    }
}

function tempoAgora(cidade){

    document.querySelector(".row") != null ? document.querySelector(".row").remove() : null
    const URLagora = 'http://apiadvisor.climatempo.com.br/api/v1/weather/locale/'+cidade+'/current?token=85d0b7516a7d9c2b89a0e3834cdaf37e';
    // console.log(URLagora);
    // const URL = 'js/dados.json';
    //instancia classe responsável ao consumo da api
    const xhr = new XMLHttpRequest();
    //define opções da requisição
    xhr.open('GET', URLagora, true);
    //envia requisição para a api
    xhr.send();
    //trata os dados de maneira assincrona 
    xhr.onload = function(e) {
        //salva resposta da api em uma variavel
        //e transforma resposta em um JSON válido
        const res = JSON.parse(xhr.response);
        console.log(res);
        // alert("Tempo Agora em "+res.name+": "+ res.data.temperature+"C°");
        construirQuadro(res);
    }
}



function construirQuadros(dados){
    //cria elemento pai de cada card de dado
    let div = document.createElement('div');
    //adiciona classe row do bootstrap na div
    div.classList.add('row');
    //itera em cada um dos dados
    dados.data.map(dado => {
        //cria coluna do bootstrap

        const col = document.createElement('div');
        col.classList.add('col-md-3', 'col-sm-6', 'col-12')
        //cria card do bootstrap
        const card = document.createElement('div');
        card.classList.add('card', 'mb-3');
        //adiciona event listener para card
        col.appendChild(card);
        //cria a div com a classe card-body que é onde
        //o card do bootstrap mantém seu conteúdo
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
        card.appendChild(cardBody);
        //cria titulo em h5 utilizando a classe card-title
        const cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title');

        //TO-DO: ADICIONE AQUI O NOME DOS POKEMONS
        let elemento = document.createTextNode(dado.date_br);
        cardTitle.appendChild(elemento);
        cardBody.appendChild(cardTitle);

        //Temperatura Geral
        cardBody.appendChild(dadoRetorno("MAX-MIN dia todo: ", dado.temperature.max,dado.temperature.min)); 
        cardBody.appendChild(document.createElement("br"));

        //Temperatura Manhã
        cardBody.appendChild(dadoRetorno("MAX-MIN de Manhã: ", dado.temperature.morning.max,dado.temperature.morning.min)); 
        cardBody.appendChild(document.createElement("br"));

        //Temperatura de tarde
        cardBody.appendChild(dadoRetorno("MAX-MIN de tarde: ", dado.temperature.afternoon.max,dado.temperature.afternoon.min)); 
        cardBody.appendChild(document.createElement("br"));

        //Temperatura de noite
        cardBody.appendChild(dadoRetorno("MAX-MIN de noite: ", dado.temperature.night.max,dado.temperature.night.min)); 
        cardBody.appendChild(document.createElement("br"));
        
        //Sensação Térmica
        cardBody.appendChild(dadoRetorno("MAX-MIN Sensação Térmica: ", dado.thermal_sensation.max,dado.thermal_sensation.min)); 
        cardBody.appendChild(document.createElement("br"));

        div.appendChild(col);
    });
    //adiciona a div no elemento main
    document.querySelector('main').appendChild(div);
}    


function construirQuadro(dados){
    //cria elemento pai de cada card de dado
    let div = document.createElement('div');
    //adiciona classe row do bootstrap na div
    div.classList.add('row');
    //itera em cada um dos dados

    const col = document.createElement('div');
    col.classList.add('col-md-3', 'col-sm-6', 'col-12')
    //cria card do bootstrap
    const card = document.createElement('div');
    card.classList.add('card', 'mb-3');
    //adiciona event listener para card
    col.appendChild(card);
    //cria a div com a classe card-body que é onde
    //o card do bootstrap mantém seu conteúdo
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    card.appendChild(cardBody);
    //cria titulo em h5 utilizando a classe card-title
    const cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title');

    //TO-DO: ADICIONE AQUI O NOME DOS POKEMONS
    let elemento = document.createTextNode("Tempo Agora em " + dados.name + ":"+ dados.data.temperature + "C°");
    cardTitle.appendChild(elemento);
    cardBody.appendChild(cardTitle);

    div.appendChild(col);

    //adiciona a div no elemento main
    document.querySelector('main').appendChild(div);
}    

