// elements
const painel = document.getElementById('lista-relatorios');
let listaAvaliacoes = "";


// endpoints

const endpointAvaliarConsulta = "http://localhost:8080/avaliar-consulta"

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
// get de todas as avaliações
axios.get(endpointAvaliarConsulta)
.then(response => {
    const dados = response.data;

    dados.forEach((avaliacoes) => {
       
        listaAvaliacoes+=`

  <div id="lista-conteudo">
         <p id="relatorio-titulo">Consulta ${avaliacoes.id} </p>
         <div id="box-esquerda">
          <p>Avaliação do Tipo: ${avaliacoes.titulo}</p>
        </div>
        <div id="box-direita">
          <p>Comentário:</p>
          <p>${avaliacoes.comentario}</p>
        </div> 
    </div>
            `
        
})
painel.innerHTML = listaAvaliacoes;
})




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
