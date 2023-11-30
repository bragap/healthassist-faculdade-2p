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
        redirectTo('error.html');
    }
}

checkAuthorization();
// get de todas as avaliações
axios.get(endpointAvaliarConsulta)
.then(response => {
    const dados = response.data;

    dados.forEach((avaliacoes) => {
       
        listaAvaliacoes+=`
        <li class="booking-card">
            <h2 id="nome-doutor">Consulta ${avaliacoes.consulta.id} </h2>
            <div id="dados-consulta">
            <p>Avaliação do Tipo: ${avaliacoes.titulo}</p>
            <p>Término da Consulta: ${formatarData(avaliacoes.consulta.dataHoraConsulta)}</p>
            <p>Paciente: ${avaliacoes.consulta.paciente.nomeCompleto}</p>
            <p>Médico: ${avaliacoes.consulta.medico.nomeCompleto}</p>
            </div>
            <div class="informations-container">
                <p>Comentário:</p>
                <p class="sub-title">${avaliacoes.comentario}</p>
            </div>
        </li>
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


// formatar data pro padrão DD/MM/AAAA HH:MM
function formatarData(data) {
  const dataObj = new Date(data);
  const dia = padZero(dataObj.getDate());
  const mes = padZero(dataObj.getMonth() + 1);
  const ano = dataObj.getFullYear();
  const horas = padZero(dataObj.getHours());
  const minutos = padZero(dataObj.getMinutes());

  return `${dia}/${mes}/${ano} ${horas}:${minutos}`;
}

function padZero(numero) {
  return numero.toString().padStart(2, '0');
}


