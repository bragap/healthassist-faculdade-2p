

// Selecione a seção de avaliação
const secaoAvaliacao = document.querySelector('.secao-avaliacao');

// elements
const formAvaliacao = document.getElementById('form-avaliacao');
const selectElement = document.getElementById("selectAvaliacao");
const textArea = document.getElementById("box-comment");
let dados;
let avaliacoes;

// id do usuario
const idUsuario = localStorage.getItem('idUsuario');
const idPaciente = localStorage.getItem('idPaciente');
const tipoUsuario = localStorage.getItem('tipoUsuario');
let consultaId = 0;


// endpoints
const urlConsultas = "http://localhost:8080/consulta";
const urlAvaliacao = "http://localhost:8080/avaliar-consulta";


// FUNÇÕES


// Função para verificar a autorização do usuário
function checkAuthorization() {

  if (tipoUsuario !== "PACIENTE") {
    redirectTo('error.html');
  }
}

checkAuthorization();

// resgatar todas as consultas do paciente
axios.get(urlConsultas)
.then(response => {
  dados = response.data;
  console.log(dados);
  
  // get de todas avaliações
  axios.get(urlAvaliacao)
    .then(response => {
      console.log(response.data, "avaliações");
      avaliacoes = response.data;
    })
    .catch(error => {
      console.log(error);
    })

    // Filtra as consultas do paciente

    const proximasConsultas = dados.filter(consulta =>
      consulta.paciente.id == idPaciente &&
      new Date(consulta.dataHoraConsulta) >= new Date() &&
      (consulta.respostaAnamnese === null));

    console.log(proximasConsultas, "proximas consultas")

    const consultasAnteriores = dados.filter(consulta =>
      consulta.paciente.id == idPaciente &&
      new Date(consulta.dataHoraConsulta) < new Date() &&
      (consulta.respostaAnamnese !== null));

    console.log(consultasAnteriores, "consultas anteriores")


    if (proximasConsultas.length === 0) {
      const cardConsultas = document.getElementById("card-prox-consultas");
      cardConsultas.innerHTML = "<p>Nenhuma consulta cadastrada</p>";
    }

    let listConsults = "";
    let listAllConsults = "";

    proximasConsultas.forEach(consulta => {
      const especialidade = consulta.medico.especialidades.length > 0 ? consulta.medico.especialidades[0].nome : 'Especialidade não especificada';

      listConsults += `
            <div class="card-consulta-2" data-consulta-id="${consulta.id}">
              <span name="nome_do_medico" id="nome-medico" value="${consulta.id}"> ${consulta.medico.nomeCompleto}</span>
              <span name="email_do_medico" value="${consulta.id}">Especialidade: ${especialidade}</span>
              <span name="data_da_consulta" value="${consulta.id}">Data/Hora da Consulta: ${formatarData(consulta.dataHoraConsulta)}</span>
            </div>
          `;
    });

    consultasAnteriores.forEach(consulta => {
      const especialidade = consulta.medico.especialidades.length > 0 ? consulta.medico.especialidades[0].nome : 'Especialidade não especificada';

        listAllConsults += `
          <div class="card-consulta" data-consulta-id="${consulta.id}">
            <span name="nome_do_medico" id="nome-medico" value="${consulta.id}"> ${consulta.medico.nomeCompleto}</span>
            <span name="email_do_medico" value="${consulta.id}">Especialidade: ${especialidade}</span>
            <span name="data_da_consulta" value="${consulta.id}">Término da Consulta: ${formatarData(consulta.dataHoraConsulta)}</span>
          </div>
        `;
      
    });

    const consultasAnterioresP = document.getElementById("card-consultas-ante");
    const proximasConsultasP = document.getElementById("card-prox-consultas");
    consultasAnterioresP.innerHTML = listAllConsults;
    proximasConsultasP.innerHTML = listConsults;


    const cards = document.querySelectorAll('.card-consulta');
    console.log(cards, "cards")
    cards.forEach(card => {
      card.addEventListener('click', (event) => {


        const consultaElement = event.currentTarget;
        const consultaIdString = consultaElement.dataset.consultaId;
        const consultaId = parseInt(consultaIdString, 10);

        console.log("Consulta ID clicado:", consultaId);

        localStorage.setItem('consultaId', consultaId);

        const consulta = dados.find(consulta => consulta.id === consultaId);

        if (consulta && consulta.respostaAnamnese !== null) {
          secaoAvaliacao.style.display = 'block';
        } else {
          alert(" asdasd A consulta ainda não ocorreu. Você não pode avaliar antes do término.");
        }
      });
    });
  })
  .catch(error => {
    console.error('Erro ao obter avaliações:', error);
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

formAvaliacao.addEventListener('submit', (e) => {
  e.preventDefault();

  selectElement.addEventListener("change", function (e) {
    var titulo = this.options[this.selectedIndex].value;
    console.log(titulo);
  });

  const consultaId = localStorage.getItem('consultaId');


  const dadosAvaliacao = {
    id_consulta: consultaId,
    titulo: selectElement.value,
    comentario: textArea.value
  }

  axios.post(urlAvaliacao, dadosAvaliacao)
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






