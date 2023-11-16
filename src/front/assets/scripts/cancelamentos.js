// elements
const painel = document.getElementById('card-layout');
let listConsultas = "";

// endpoints
const url = ""


// FUNÇÕES

//tipo usuario
const tipoUsuario = localStorage.getItem('tipoUsuario');

// FUNÇÕES

// Função para verificar a autorização do usuário
function checkAuthorization() {

    if (tipoUsuario === "MEDICO" || tipoUsuario === "PACIENTE") {
        alert("Você nao possui acesso a essa pagina!")
        // Redireciona para a página de login ou exibe mensagem de erro
        redirectTo('login.html');
    }
}

checkAuthorization();



// get de todas os cancelamentos de consultas
axios.get(url)
  .then(response => {
    const dados = response.data;

    if(dados === null){

      painel.innerHTML = "<p>Nenhum cancelamento de consulta.</p>";
      return;

    } else {
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
  }
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
