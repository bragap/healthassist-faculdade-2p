// Selecione todos os elementos com a classe "card-consulta"
const cardConsultas = document.querySelectorAll('.card-consulta');

// Selecione a seção de avaliação
const secaoAvaliacao = document.querySelector('.secao-avaliacao');

// Adicione um ouvinte de evento de clique a cada card de consulta
cardConsultas.forEach((card) => {
  card.addEventListener('click', (event) => {
    // Verifique se o evento foi acionado no elemento de consulta
    const consultaElement = event.target.closest('[data-consulta-id]');
    
    if (consultaElement) {
      // Exiba a seção de avaliação
      secaoAvaliacao.style.display = 'block';
    }
  });
});