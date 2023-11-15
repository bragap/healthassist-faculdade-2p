// Selecione todos os elementos com a classe "card-consulta"
const cardConsultas = document.querySelectorAll('.card-consulta');

// Selecione a seção de avaliação
const secaoAvaliacao = document.querySelector('.secao-avaliacao');

// elements

// id do usuario
const idUsuario = localStorage.getItem('idUsuario');

// endpoints
const url = 'http://localhost:8080/medico';

const urlConsultas = "http://localhost:8080/consulta";


// FUNÇÕES

// resgatar todas as consultas do paciente
axios.get(urlConsultas)
  .then(response => {
    const dados = response.data;
    const dadosFiltrados = dados.filter(consulta => consulta.paciente.id == idUsuario);
    let listConsults = ""

    
    if (dadosFiltrados.length === 0) {
      // Se não houver consultas cadastradas para o paciente, exiba uma mensagem de aviso
      const cardConsultas = document.getElementById("card-consultas");
      cardConsultas.innerHTML = "<p>Nenhuma consulta cadastrada.</p>";
      return; // Encerra a execução da função
    }


    dadosFiltrados.forEach(doctors => {
      listConsults += `
        <div class="card-consulta" data-consulta-id="${doctors.id}">
          <span name="nome_do_medico" id="nome-medico" value="${doctors.id}">Dr. ${doctors.medico.nomeCompleto}</span>
          <span name="email_do_medico" value="${doctors.id}">Especialidade: ${doctors.medico.especialidadeMedico.especialidade}</span>
          <span name="data_da_consulta" value="${doctors.id}">Data da Consulta: ${doctors.dataHoraConsulta}</span>
        </div>
      `;
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





