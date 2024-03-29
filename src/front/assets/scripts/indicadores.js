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
const urlQtdePacientes = "http://localhost:8080/indicadores/cadastro-pacientes-mensal";
const urlMediaConsultasMedico = "http://localhost:8080/indicadores/media-consultas-medico";
const urlQtdeMedicos = "http://localhost:8080/indicadores/cadastro-medicos-mensal";
const urlAvaliacoes = "http://localhost:8080/indicadores/taxa-avaliacoes-por-cosultas";
const urlConsultasRealizadas = "http://localhost:8080/indicadores/consultas-prestadas-mensal"
const urlTaxaConsulta = "http://localhost:8080/indicadores/taxa-horario-consulta"
const urlMedicos = "http://localhost:8080/medico";


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


// graficos:
document.addEventListener('DOMContentLoaded', function () {
  // meses do ano
  const meses = ["Dezembro","Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro"];


  const ctx1 = document.getElementById('chart1').getContext('2d');
  const ctx2 = document.getElementById('chart2').getContext('2d');
  const ctx3 = document.getElementById('chart3').getContext('2d');
  const ctx4 = document.getElementById('chart4').getContext('2d');
  const ctx5 = document.getElementById('chart5').getContext('2d');
  const ctx6 = document.getElementById('chart6').getContext('2d');

  // Ind 1 - Pacientes cadastrados em cada um dos últimos 12 meses
  axios.get(urlQtdePacientes)
    .then(response => {
      const dados = response.data;

      const labels1 = meses;
      const data1 = dados;

      renderChart(ctx1, 'line', labels1, data1, 'Pacientes Cadastrados');
    })
    .catch(error => console.error(error))

  // Ind 2 - Taxa Média de Consultas Mensais por Médico
  axios.get(urlMedicos)
    .then(response => {
      const dadosMedicos = response.data;
      const allMedicos = dadosMedicos.map((medico) => ({
        id: medico.id,
        nome: medico.nomeCompleto
      }));

     axios.get(urlMediaConsultasMedico)
        .then(response => {
          const dadosConsultas = response.data;

          const chartData = allMedicos.map((medicoInfo) => {
            const medicoId = medicoInfo.id;
            const consultasData = dadosConsultas.find(data => data.id_medico === medicoId);

            return {
              medicoNome: medicoInfo.nome,
              qtdePacientes: consultasData ? consultasData.quantidade_media_consultas : 0
            };
          });

          // Renderiza o gráfico
          renderChart(ctx2, 'bar', chartData.map(data => data.medicoNome), chartData.map(data => data.qtdePacientes), 'Consultas Mensais por Médico');
        })
        .catch(error => console.error(error));
    })
    .catch(error => console.error(error));

  // Ind 3: Número de Médicos Cadastrados na Clínica
  axios.get(urlQtdeMedicos)
    .then(response => {
      const dados = response.data;

      const labels3 = meses;
      const data3 = dados;

      renderChart(ctx3, 'bar', labels3, data3, 'Médicos Cadastrados');
    })
    .catch(error => console.error(error))

  // Ind 4: Taxa Média de Consultas por Cliente
  axios.get(urlAvaliacoes)
    .then(response => {
      const dados = response.data;

      // Mapeia os dados para o formato que o Chart.js precisa
      const chartData = dados.map((porcentagem, index) => ({
        label: meses[index],
        value: porcentagem
      }));

      // Renderiza o gráfico
      renderChart(ctx4, 'line', chartData.map(data => data.label), chartData.map(data => data.value), 'Taxa de Avaliações por Consultas');
    })
    .catch(error => console.error(error));


  // Ind 5: Taxa Média de Consultas Mensais por Médico
 axios.get(urlConsultasRealizadas)
    .then(response => {
      const dados = response.data;

      const chartData = dados.map((qtdePacientes, index) => ({
        label: meses[index],
        value: qtdePacientes
      }));

      renderChart(ctx5, 'bar', chartData.map(data => data.label), chartData.map(data => data.value), 'Consultas Realizadas');
    })
    .catch(error => console.error(error));

 // Ind 6: Taxa Horário Consulta
 axios.get(urlTaxaConsulta)
 .then(response => {
   const dados = response.data;

   const chartData = dados.map(data => ({
     label: `${data.hora}:00`,
     value: data.quantidade_consultas
   }));

   renderChart(ctx6, 'bar', chartData.map(data => data.label), chartData.map(data => data.value), 'Quantidade de Consultas por Hora');
 })
 .catch(error => console.error(error));



  // renderiza os graficos na tela
  function renderChart(ctx, type, labels, data, label) {
    new Chart(ctx, {
      type: type,
      data: {
        labels: labels,
        datasets: [{
          label: label,
          data: data,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          fill: false,
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

});

// exibiçao tela de loading
function showLoading() {

    document.getElementById('loading').style.display = 'flex';

    setTimeout(function () {
        document.getElementById('loading').style.display = 'none';

    }, 2000);
}

// redirecionamento
function redirectTo(destination) {
  showLoading();
  setTimeout(function () {
      window.location.href = destination;
  }, 2000);
}
