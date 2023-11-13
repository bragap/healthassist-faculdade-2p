// elements
const painel = document.getElementById('card-layout');
let listConsultas = "";

// endpoints
const url = "https://jsonplaceholder.typicode.com/users"


// FUNÇÕES


// get de todas os cancelamentos de consultas
axios.get(url)
.then(response => {
    const dados = response.data;

    dados.forEach((consulta) => {
       
        listConsultas+=`
  <div id="card-individual">
    <div id="card-conteudo">
        <div id=card-title> Consulta ${consulta.id} </div>
            <div id="box-esquerda">
                <p id="nome-usuario">Nome do paciente: ${consulta.name}</p>
                <p>Médico: ${consulta.phone}</p>
                <p>Horario: 11:00</p>
                <p>Dia da semana: Segunda-feira</p>
            </div>
            <div id="box-direita">
            <button type="button" class="aceitar">Aprovar cancelamento</button>
          </div>
        
    </div>
  </div>

        `
})
painel.innerHTML = listConsultas;
})


// PUT será inserido