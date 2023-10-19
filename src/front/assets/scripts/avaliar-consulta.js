const starRating = document.getElementById('star-rating');
const stars = starRating.querySelectorAll('.star');
const commentBox = document.getElementById('box-comment');

stars.forEach((star, index) => {
  star.addEventListener('click', () => {
    // Define o ícone da estrela clicada como preenchida e as anteriores
    for (let i = 0; i <= index; i++) {
      stars[i].innerHTML = '<i class="bi bi-star-fill"></i>';
    }
    // Define o ícone das estrelas após o índice selecionado como vazio
    for (let i = index + 1; i < stars.length; i++) {
      stars[i].innerHTML = '<i class="bi bi-star"></i>';
    }
  });
});

// Adicione um evento de mudança ao textarea, se desejar executar alguma ação ao inserir comentários
commentBox.addEventListener('change', (e) => {
  const comment = e.target.value;
  console.log('Comentário inserido:', comment);
});
