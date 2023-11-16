// elements
const modal = document.getElementById("modal");
const form = document.getElementById('form-prontuario');
const btnClose = document.getElementById("btn-close-modal");
const formLoginPaciente = document.getElementById("form-login-paciente");

const cardPainel = document.querySelector("#painel-consultas");
const tablePainel = document.querySelector("#exibe-consultas");
const nomePaciente = document.getElementById("nome-paciente");
const errorMessage = document.getElementById("error-message");
const sucessMessage = document.getElementById("sucess-message");
let consultaId = 0;
let pacienteId = 0;
let medicoId = 0;

//endpoints
const urlConsultas = "http://localhost:8080/consulta";

// id do usuario
const idUsuario = localStorage.getItem('idUsuario');

// FUNÇÕES

// puxar elementos da api das proximas consultas
axios.get(urlConsultas)
  .then(response => {
    const dados = response.data;
    const dadosFiltrados = dados.filter(consulta => consulta.medico.usuario.id == idUsuario);
    let listConsults = ""

    if (dadosFiltrados.length === 0) {

      const cardConsultas = document.getElementById("card-consultas");
      cardConsultas.innerHTML = "<p>Nenhuma consulta cadastrada.</p>";
      return;
    }

    dadosFiltrados.forEach(user => {
      if (!user.respostaAnamnese) {
        listConsults += `
        <div class="card-consulta">
            <span name="nome_do_paciente" value="nome do paciente">Nome do Paciente: ${user.paciente.nomeCompleto}</span>
            <span name="data_da_consulta" value="data da consulta">Data de Nascimento : ${formatarDataNasc(user.paciente.dataNasc)}</span>
            <span name="email_do_paciente" value="email do paciente">Data/Hora da Consulta: ${formatarData(user.dataHoraConsulta)}</span>
            <a href="">
              <span name="arquivos_do_paciente" value="arquivos do paciente">Arquivos do paciente</span>
            </a>
            <svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="19" height="20" rx="2" fill="#F7685B" fill-opacity="0.8" />
              <path
                d="M5 7H6M6 7H14M6 7V14C6 14.2652 6.10536 14.5196 6.29289 14.7071C6.48043 14.8946 6.73478 15 7 15H12C12.2652 15 12.5196 14.8946 12.7071 14.7071C12.8946 14.5196 13 14.2652 13 14V7M7.5 7V6C7.5 5.73478 7.60536 5.48043 7.79289 5.29289C7.98043 5.10536 8.23478 5 8.5 5H10.5C10.7652 5 11.0196 5.10536 11.2071 5.29289C11.3946 5.48043 11.5 5.73478 11.5 6V7M8.5 9.5V12.5M10.5 9.5V12.5"
                stroke="white" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </div>
        `;
      }
    })
    // Adicionar a lista de consultas apenas se houver alguma consulta sem resposta de anamnese
    if (listConsults !== "") {
      cardPainel.innerHTML += listConsults;
    } else {
      const cardConsultas = document.getElementById("card-consultas");
      cardConsultas.innerHTML = "<p>Você não possui consultas marcadas.</p>";
    }
  })

  .catch(error => {
    console.log(error);
  })


// puxar elementos da api para atualizar consultas   
axios.get(urlConsultas)
  .then(response => {
    const dados = response.data;
    const dadosFiltrados = dados.filter(consulta => consulta.medico.usuario.id == idUsuario);
    let listConsults = "";

    if (dadosFiltrados.length === 0) {
      const cardConsultas = document.getElementById("card-consultas");
      cardConsultas.innerHTML = "<p>Você não possui consultas marcadas.</p>";
      return;
    }

    dadosFiltrados.forEach(user => {
      if (!user.respostaAnamnese) {
        listConsults += `
          <tr>
            <td>${user.id}</td>
            <td>${user.paciente.nomeCompleto}</td>
            <td>${formatarDataNasc(user.paciente.dataNasc)}</td>
            <td>${formatarData(user.dataHoraConsulta)}</td>
            <td class="icon-container">
              <svg data-id=${user.id} data-paciente-id=${user.paciente.id} data-medico-id=${user.medico.id} value=${user.paciente.nomeCompleto} class="button-modal" width="20" height="20" viewBox="0 0 20 20" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <rect width="20.0001" height="20.0001" rx="2.66667" fill="#34AFF9" />
                <path
                  d="M9.47289 6.05427H5.99398C5.73036 6.05427 5.47754 6.15899 5.29113 6.3454C5.10472 6.53181 5 6.78463 5 7.04825V14.0061C5 14.2697 5.10472 14.5225 5.29113 14.7089C5.47754 14.8953 5.73036 15.0001 5.99398 15.0001H12.9518C13.2154 15.0001 13.4683 14.8953 13.6547 14.7089C13.8411 14.5225 13.9458 14.2697 13.9458 14.0061V10.5272M13.2003 5.30879C13.398 5.11107 13.6662 5 13.9458 5C14.2254 5 14.4936 5.11107 14.6913 5.30879C14.889 5.5065 15.0001 5.77466 15.0001 6.05427C15.0001 6.33388 14.889 6.60204 14.6913 6.79975L9.96988 11.5211L7.98193 12.0181L8.47892 10.0302L13.2003 5.30879Z"
                  stroke="white" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </td>
          </tr>
        `;
      }
    });

    // Adicionar a lista de consultas apenas se houver alguma consulta sem resposta de anamnese
    if (listConsults !== "") {
      tablePainel.innerHTML += listConsults;
    } else {
      const card = document.getElementById("card-consultas-2");
      card.innerHTML = "<p>Você não possui consultas marcadas.</p>";
    }
    // abrir modal
    const buttonModal = document.querySelectorAll('.button-modal');
    buttonModal.forEach(buttonModal => {
      buttonModal.addEventListener('click', function () {
        consultaId = buttonModal.getAttribute('data-id');
        pacienteId = buttonModal.getAttribute('data-paciente-id');
        medicoId = buttonModal.getAttribute('data-medico-id');

        modal.showModal();
        nomePaciente.innerHTML = buttonModal.getAttribute('value');
      });
    });
    //fechar modal
    btnClose.addEventListener("click", () => {
      modal.close();
    });

  })
  .catch(error => {
    console.log(error);
  });


// formulario de envio da anamnese
form.addEventListener('submit', (e) => {

  e.preventDefault();

  const now = new Date();

  const formattedDate = `${padZero(now.getDate())}/${padZero(now.getMonth() + 1)}/${now.getFullYear()}`;


  const formattedTime = `${padZero(now.getHours())}:${padZero(now.getMinutes())}`;

  const dataHoraConsulta = `${formattedDate} ${formattedTime}`;

  // Função para garantir que o número tenha dois dígitos (p.ex., 1 se torna 01)
  function padZero(number) {
    return number.toString().padStart(2, '0');
  }

  const idMedico = parseInt(medicoId, 10);
  const idPaciente = parseInt(pacienteId, 10);
  const idConsulta = parseInt(consultaId, 10);

  const textareaValue = document.getElementById('textarea').value;

  // Verificar se o campo de anamnese está vazio
  if (textareaValue.trim() === '') {
    errorMessage.innerHTML = "O campo de anamnese não pode estar vazio.Redirecionando para a Homepage";
      redirectTo('home-medico.html');
      return;
   
  }

  const dados = {
    idMedico: idMedico,
    idPaciente: idPaciente,
    dataHoraConsulta: dataHoraConsulta,
    respostaAnamnese: textareaValue,
  }



  axios.put(`${urlConsultas}/${idConsulta}`, dados)
    .then(response => {
      sucessMessage.innerHTML = "Anamnese enviada com sucesso!";
    })

    .catch(error => {
      console.error('Erro ao cadastrar anamnese:', error);

      if (error.response) {
        console.log("Data:", error.response.data);
        console.log("Status:", error.response.status);
        console.log("Headers:", error.response.headers);

        // Adicione a linha abaixo para imprimir a mensagem de erro específica do servidor
        console.log("Response Data:", error.response.data);

      } else if (error.request) {
        console.log("Request:", error.request);
      } else {
        console.log("Error:", error.message);
      }
      console.log("Config:", error.config);

      alert('Erro ao cadastrar anamnese. Verifique o console para mais detalhes.');
    });

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


// formatar data pro padrão DD/MM/AAAA HH:MM
function formatarData(data) {
  const dataObj = new Date(data);
  const dia = padZero(dataObj.getDate());
  const mes = padZero(dataObj.getMonth() + 1);
  const ano = dataObj.getFullYear();
  const horas = padZero(dataObj.getHours());
  const minutos = padZero(dataObj.getMinutes());

  return `${dia}/${mes}/${ano} ${horas}:${minutos}h`;
}

function padZero(numero) {
  return numero.toString().padStart(2, '0');
}

//formatar data de nascimento
function formatarDataNasc(data) {
  const dataObj = new Date(data);
  const dia = padZero(dataObj.getDate());
  const mes = padZero(dataObj.getMonth() + 1);
  const ano = dataObj.getFullYear();

  return `${dia}/${mes}/${ano}`;
}

function padZero(numero) {
  return numero.toString().padStart(2, '0');
}