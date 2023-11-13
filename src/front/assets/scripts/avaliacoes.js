// elements
const painel = document.getElementById('lista-relatorios');
let listaAvaliacoes = "";


// endpoints
const url = "https://jsonplaceholder.typicode.com/users"


// FUNÇÕES


// get de todas as avaliações
axios.get(url)
.then(response => {
    const dados = response.data;

    dados.forEach((avaliacoes) => {
       
        listaAvaliacoes+=`

  <div id="lista-conteudo">
         <p id="relatorio-titulo">Consulta ${avaliacoes.id} </p>
         <div id="box-esquerda">
          <p>Avaliação do Tipo:</p>
        </div>
        <div id="box-direita">
          <p>Comentário:</p>
          <p>O médico teve uma postura excelente durante a consulta, me tratando muito bem, sendo respeitoso, cuidadoso.
            Nota 10!!</p>
        </div> 
    </div>
            `
 
        
})
painel.innerHTML = listaAvaliacoes;
})