// elements
const painel1 = document.getElementById('ind-1');
const painel2 = document.getElementById('ind-2');
const painel3 = document.getElementById('ind-3');
const painel4 = document.getElementById('ind-4');
const painel5 = document.getElementById('ind-5');
let listConsultas1 = "";
let listConsultas2 = "";
let listConsultas3 = "";
let listConsultas4 = "";
let listConsultas5 = "";

// endpoints
const urlQtdePacientes = "http://localhost:8080/indicadores/quantidade-pacientes";
const urlMediaConsultasMedico = "http://localhost:8080/indicadores/media-consultas-medico"
const url3=""
const url4=""
const url5=""


// FUNÇÕES

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

// meses do ano
const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro", "Janeiro"];


// Ind 1 - Pacientes cadastrados em cada um dos últimos 12 meses
document.addEventListener('DOMContentLoaded', function () {
  axios.get(urlQtdePacientes)
    .then(response => {
      const dados = response.data;

      dados.forEach((qtdePacientes, index) => {
        listConsultas1 += `
    <div id="card-individual">
      <div id="card-conteudo">
          <div id=card-title> Mês: ${meses[index]} 
           </div>
              <div id="box-esquerda">
                  <p id="nome-usuario">Quantidade de pacientes cadastrados: ${qtdePacientes}</p>
              </div>
        </div>
    </div>
          `
      })
      painel1.innerHTML = listConsultas1;
    })
    .catch(error => console.error(error))
})

// Ind - 2 : Taxa Média de Consultas Mensais por Médico
document.addEventListener('DOMContentLoaded', function () {
  axios.get(urlMediaConsultasMedico)
    .then(response => {
      const dados = response.data;

      dados.forEach((qtdePacientes, index) => {
        listConsultas2 += `
    <div id="card-individual">
      <div id="card-conteudo">
          <div id=card-title> Mês: ${meses[index]} 
           </div>
              <div id="box-esquerda">
                  <p id="nome-usuario">Quantidade de pacientes cadastrados: ${qtdePacientes}</p>
              </div>
        </div>
    </div>
          `
      })
      painel2.innerHTML = listConsultas2;
    })
    .catch(error => console.error(error))
})

// Ind - 3: Número de Médicos Cadastrados na Clínica
document.addEventListener('DOMContentLoaded', function () {
  axios.get(url3)
    .then(response => {
      const dados = response.data;

      dados.forEach((qtdePacientes, index) => {
        listConsultas3 += `
    <div id="card-individual">
      <div id="card-conteudo">
          <div id=card-title> Mês: ${meses[index]} 
           </div>
              <div id="box-esquerda">
                  <p id="nome-usuario">Quantidade de pacientes cadastrados: ${qtdePacientes}</p>
              </div>
        </div>
    </div>
          `
      })
      painel3.innerHTML = listConsultas3;
    })
    .catch(error => console.error(error))
})

// Ind - 4: Taxa Média de Consultas por Cliente
document.addEventListener('DOMContentLoaded', function () {
  axios.get(url4)
    .then(response => {
      const dados = response.data;

      dados.forEach((qtdePacientes, index) => {
        listConsultas4 += `
    <div id="card-individual">
      <div id="card-conteudo">
          <div id=card-title> Mês: ${meses[index]} 
           </div>
              <div id="box-esquerda">
                  <p id="nome-usuario">Quantidade de pacientes cadastrados: ${qtdePacientes}</p>
              </div>
        </div>
    </div>
          `
      })
      painel4.innerHTML = listConsultas4;
    })
    .catch(error => console.error(error))
})

// Ind - 5: Taxa Média de Consultas Mensais por Médico
document.addEventListener('DOMContentLoaded', function () {
  axios.get(url5)
    .then(response => {
      const dados = response.data;

      dados.forEach((qtdePacientes, index) => {
        listConsultas5 += `
    <div id="card-individual">
      <div id="card-conteudo">
          <div id=card-title> Mês: ${meses[index]} 
           </div>
              <div id="box-esquerda">
                  <p id="nome-usuario">Quantidade de pacientes cadastrados: ${qtdePacientes}</p>
              </div>
        </div>
    </div>
          `
      })
      painel5.innerHTML = listConsultas5;
    })
    .catch(error => console.error(error))
})
