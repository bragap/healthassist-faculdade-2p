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

      listConsultas += `
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

// exibiçao tela de loading
function showLoading() {

  document.getElementById('loading').style.display = 'flex';

  setTimeout(function () {
    document.getElementById('loading').style.display = 'none';

  }, 2000);
}
function redirectTo(destination) {
  showLoading();
  setTimeout(function () {
    window.location.href = destination;
  }, 2000);
}
