// Selecione todos os elementos com a classe "card-consulta"
const cardConsultas = document.querySelectorAll('.card-consulta');

// Selecione a seção de avaliação
const secaoAvaliacao = document.querySelector('.secao-avaliacao');

// elements
const formAvaliacao = document.getElementById('form-avaliacao');
const selectElement = document.getElementById("selectAvaliacao");
const textArea = document.getElementById("box-comment");

// id do usuario
const idUsuario = localStorage.getItem('idUsuario');
let consultaId = 0;

// endpoints
const urlConsultas = "http://localhost:8080/consulta";
const urlAvaliacao = "http://localhost:8080/avaliar-consulta";


// FUNÇÕES

// resgatar todas as consultas do paciente
axios.get(urlConsultas)
  .then(response => {
    const dados = response.data;

    // Filtra as consultas do paciente
    const dadosFiltrados = dados.filter(consulta => consulta.paciente.usuario.id == idUsuario && !consulta.respostaAnamnese);
    let listConsults = ""


    if (dadosFiltrados.length === 0) {
      // Se não houver consultas cadastradas para o paciente, exiba uma mensagem de aviso
      const cardConsultas = document.getElementById("card-consultas");
      cardConsultas.innerHTML = "<p>Nenhuma consulta cadastrada</p>";
      return; // Encerra a execução da função
    }

    dadosFiltrados.forEach(consulta => {
      listConsults += `
        <div class="card-consulta" data-consulta-id="${consulta.id}">
          <span name="nome_do_medico" id="nome-medico" value="${consulta.id}">Dr. ${consulta.medico.nomeCompleto}</span>
          <span name="email_do_medico" value="${consulta.id}">Especialidade: ${consulta.medico.especialidadeMedico.especialidade}</span>
          <span name="data_da_consulta" value="${consulta.id}">Data/Hora da Consulta: ${formatarData(consulta.dataHoraConsulta)}</span>
        </div>
      `;
      consultaId = consulta.id;
    })

    const cardConsultas = document.getElementById("card-consultas");
    cardConsultas.innerHTML = listConsults;

    const cards = document.querySelectorAll('.card-consulta');
    cards.forEach(card => {
      card.addEventListener('click', (event) => {
        const consultaElement = event.currentTarget;
        secaoAvaliacao.style.display = 'block';
      });
    })
  })
  .catch(error => {

    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    }
  });


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

// enviar avaliação

selectElement.addEventListener("change", function (e) {
  var titulo = this.options[this.selectedIndex].value;
  console.log(titulo);
});


formAvaliacao.addEventListener('submit', (e) => {
  e.preventDefault();
  const dados = {
    titulo: selectElement.value,
    comentario: textArea.value,
    id_consulta: consultaId
  }
  
  axios.post(urlAvaliacao, dados)
  .then(response => {
    console.log(response);
    alert("Avaliação enviada com sucesso!");
    redirectTo("home-paciente.html");
  })
  .catch(error => {
    console.log(error);
    alert("Erro ao enviar avaliação!");
  })

})


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








