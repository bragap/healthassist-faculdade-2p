// Selecione todos os elementos com a classe "card-consulta"
const cardConsultas = document.querySelectorAll('.card-consulta');

// Selecione a seção de avaliação
const secaoAvaliacao = document.querySelector('.secao-avaliacao');

// elements


// endpoints
const url = 'http://localhost:8080/medico';

const exemplo = 'https://jsonplaceholder.typicode.com/users'



// FUNÇÕES

axios.get(exemplo)
  .then(response => {
    const dados = response.data;
    console.log(dados, "dados");
    let listConsults = ""

    dados.forEach(doctors => {
      listConsults += `
        <div class="card-consulta" data-consulta-id="${doctors.id}">
        <span name="nome_do_medico" id="nome-medico" value="${doctors.id}">Profissional: ${doctors.name}</span>
        <span name="email_do_medico" value="${doctors.id}">Especialidade: ${doctors.email}</span>
        <span name="data_da_consulta" value="${doctors.id}">Data da Consulta: ${doctors.username}</span>
        </div>
        ` ;
    });
    console.log(listConsults, "listConsults")

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





