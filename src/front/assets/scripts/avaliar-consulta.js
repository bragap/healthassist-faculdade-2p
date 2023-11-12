// Selecione todos os elementos com a classe "card-consulta"
const cardConsultas = document.querySelectorAll('.card-consulta');

// Selecione a seção de avaliação
const secaoAvaliacao = document.querySelector('.secao-avaliacao');

// elements


// endpoints
const url = 'https://jsonplaceholder.typicode.com/users';



// FUNÇÕES

axios.get(url)
  .then(response => {
    const dados = response.data;

    const cardConsultas = document.getElementById("card-consultas")

    dados.forEach(doctors => {
      let listConsults = ""
      listConsults += `
        <div class="card-consulta" data-consulta-id="${doctors.id}">
        <span name="nome_do_medico" value="${doctors.name}">${doctors.name}</span>
        <span name="email_do_medico" value="${doctors.email}">${doctors.email}</span>
        <span name="data_da_consulta" value="${doctors.username}">Data da Consulta: ${doctors.username}</span>
        ` ;
      cardConsultas.innerHTML += listConsults;

    });

    const cards = document.querySelectorAll('.card-consulta');
    cards.forEach(card => {
      card.addEventListener('click', (event) => {
        const consultaElement = event.currentTarget;
        secaoAvaliacao.style.display = 'block';
      });
    })
  })
  .catch(error => {
    console.error('Ocorreu um erro:', error);
  });







