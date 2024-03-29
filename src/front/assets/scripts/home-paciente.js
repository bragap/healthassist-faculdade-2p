// elementos
const modal = document.getElementById("modal");
const htmlConteudo = document.querySelector("html");
const bodyConteudo = document.querySelector("body");
const btnSubmit = document.getElementById("btn-submit");
const select = document.getElementById("especialidadeSelect");

const table = document.getElementById("table");
const modalfilter = document.getElementById("modal-filter");
const headerModal = document.getElementById("header-modal");
let dataHoraEscolhida = "";
let idMedico = 0;
let dados = [];
const selectDia = document.querySelector('select[name="dia"]');
const selectHorario = document.querySelector('select[name="horario"]');


// endpoints
const url = 'http://localhost:8080/medico';
const urlMarcarConsulta = "http://localhost:8080/consulta";
const endpointCadastroEspecialidades = "http://localhost:8080/especialidade-medico";
const urlPaciente = "http://localhost:8080/paciente";
const urlArquivosDoutor = "http://localhost:8080/api/medico/arquivo"

// id usuario
const idUsuario = localStorage.getItem('idUsuario');
const tipoUsuario = localStorage.getItem('tipoUsuario');
let idPaciente = '';

// FUNÇÕES

// Função para verificar a autorização do usuário
function checkAuthorization() {

    if (tipoUsuario !== "PACIENTE") {
        window.location.href = "error.html";
    }
}

checkAuthorization();

const imageDoctors = [
    { id: 1, image: 'assets/images/medicos/medico1.png' },
    { id: 2, image: 'assets/images/medicos/medico2.png' },
    { id: 3, image: 'assets/images/medicos/medico3.png' },
    { id: 4, image: 'assets/images/medicos/medico4.png' },
    { id: 5, image: 'assets/images/medicos/medico5.png' }
]

// exibir conteudo Table

function obterDiaDaSemana(data) {
    const diasSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    const diaSemana = new Date(data).getDay();
    return diasSemana[diaSemana];
}

// resgatar id do paciente
document.addEventListener("DOMContentLoaded", async function () {

    try {
        const response = await axios.get(urlPaciente);
        const dados = response.data;

        const paciente = dados.filter(p => p.usuario.id == idUsuario);

        idPaciente = paciente[0].id;
        localStorage.setItem('idPaciente', idPaciente);

    } catch (error) {
        console.error('Ocorreu um erro:', error);
    }


})

document.addEventListener("DOMContentLoaded", function () {

    function obterProximosDiasDaSemana() {
        const diasSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];

        const hoje = new Date();
        const diasDaSemana = [];

        for (let i = 1; i <= 5; i++) {  // 5 próximos dias da semana (segunda a sexta)
            const dia = new Date();
            dia.setDate(hoje.getDate() + (i + (7 - hoje.getDay())) % 7); // Calcula o próximo dia da semana

            const diaFormatado = `${String(dia.getDate()).padStart(2, '0')}/${String(dia.getMonth() + 1).padStart(2, '0')}/${dia.getFullYear()}`;
            const diaSemana = obterDiaDaSemana(dia);

            diasDaSemana.push({ data: diaFormatado, diaSemana: diaSemana });
        }

        const html = `
          <tr>
            <th>Horário</th>
            <th>Data</th>
            <th>Dia da semana</th>
            <th>Selecione</th>
          </tr>
          ${diasDaSemana.map(diaInfo => `
            <tr>
              <td>13:00</td>
              <td>${diaInfo.data}</td>  
              <td>${diaInfo.diaSemana}</td>
              <td><input type="checkbox" name="" id=""></td>
            </tr>
            <tr>
              <td>14:00</td>
              <td>${diaInfo.data}</td>  
              <td>${diaInfo.diaSemana}</td>
              <td><input type="checkbox" name="" id=""></td>
            </tr>
          `).join('')}
        `;

        // Agora, o HTML contém os próximos horários para os próximos 5 dias da semana (segunda a sexta) no formato "DD/MM/AAAA - Dia da Semana"
        table.innerHTML = html;
    }


    obterProximosDiasDaSemana();
})


//exibir filtro no modal
document.addEventListener("DOMContentLoaded", function () {

    exibirConteudoFiltro = () => {

        let str = "";
        str += `
        <form id="form-filtro">
        <p>Filtre por dia e horários que achar melhor</p>
        <select name="dia">
          <option value="">Selecione o dia</option>
          <option value="Segunda-feira">Segunda-feira</option>
          <option value="Terça-feira">Terça-feira</option>
          <option value="Quarta-feira">Quarta-feira</option>
          <option value="Quinta-feira">Quinta-feira</option>
          <option value="Sexta-feira">Sexta-feira</option>
        </select>
        <select name="horario">
          <option value="">Escolha o horário</option>
          <option value="13:00">13:00</option>
          <option value="14:00">14:00</option>
        </select>
        </form>

        `
        modalfilter.innerHTML = str;
    }
    exibirConteudoFiltro();

    const selectDia = document.querySelector('select[name="dia"]');
    const selectHorario = document.querySelector('select[name="horario"]');
    function aplicarFiltro() {
        const filtroDia = selectDia.value;
        const filtroHorario = selectHorario.value;

        const checkboxes = document.querySelectorAll('input[type="checkbox"]');

        checkboxes.forEach(checkbox => {
            const diaSemana = checkbox.closest('tr').querySelector('td:nth-child(3)').textContent;
            const horario = checkbox.closest('tr').querySelector('td:nth-child(1)').textContent;

            // Verifica se o checkbox atende aos critérios do filtro
            const atendeFiltro = (filtroDia === '' || diaSemana.includes(filtroDia))
                && (filtroHorario === '' || horario === filtroHorario);

            // Exibe ou oculta o checkbox com base no filtro
            checkbox.closest('tr').style.display = atendeFiltro ? '' : 'none';
        });
    }

    // Adiciona um evento de reset ao formulário de filtro
    const formFiltro = document.getElementById('form-filtro');
    formFiltro.addEventListener('reset', function () {
        // Quando o formulário de filtro é resetado, reexiba todos os checkboxes
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.closest('tr').style.display = '';
        });
    });

    // Verifica se os elementos foram encontrados antes de adicionar os ouvintes de evento
    if (selectDia) {
        selectDia.addEventListener('change', aplicarFiltro);
    }

    if (selectHorario) {
        selectHorario.addEventListener('change', aplicarFiltro);
    }
});


// evita rolagem da página
const bloquearRolagem = () => {
    htmlConteudo.classList.add("rolagem-bloqueada");
    bodyConteudo.classList.add("rolagem-bloqueada");
}
// permite rolagem da pagina
const permitirRolagem = () => {
    htmlConteudo.classList.add("rolagem-permitida");
    bodyConteudo.classList.add("rolagem-permitida");
}

// função para obter a data e hora selecionada pelo usuário
document.addEventListener("DOMContentLoaded", function () {

    // Função para obter a data e hora selecionada pelo usuário
    function obterDataHoraConsulta(diaFormatado, horario) {

        const partesData = diaFormatado.split('/');
        const dia = parseInt(partesData[0], 10);
        const mes = parseInt(partesData[1], 10);
        const ano = parseInt(partesData[2], 10);

        // Formato esperado: "HH:mm"
        const partesHorario = horario.split(':');
        const hora = parseInt(partesHorario[0], 10);
        const minutos = parseInt(partesHorario[1], 10);

        // Construir a data e hora completa
        const dataHora = new Date(ano, mes - 1, dia, hora, minutos);

        // Formatar a data e hora para "DD/MM/AAAA HH:mm"
        const dataHoraFormatada = `${String(dia).padStart(2, '0')}/${String(mes).padStart(2, '0')}/${ano} ${String(hora).padStart(2, '0')}:${String(minutos).padStart(2, '0')}`;

        return dataHoraFormatada;
    }

    // Adicionar evento de escuta aos checkboxes
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            if (this.checked) {
                const diaFormatado = this.closest('tr').querySelector('td:nth-child(2)').textContent;
                const horario = this.closest('tr').querySelector('td:nth-child(1)').textContent;

                dataHoraEscolhida = obterDataHoraConsulta(diaFormatado, horario);
            }
        });
    });

});



// Função para fazer a requisição GET e renderizar os médicos
function getAndRenderDoctors() {

    axios.get(url)
        .then(response => {
            dados = response.data;
            renderDoctors(dados);

            fillEspecialidadesSelect();
        })
        .catch(error => {
            console.error('Ocorreu um erro:', error);
        });
}


// Adicione um evento de input ao campo de pesquisa
const searchInput = document.getElementById("search-doctor-name");
searchInput.addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase();

    const filteredData = dados.filter(user => {
        // Filtre por nome
        const nomeCompleto = user.nomeCompleto.toLowerCase();
        return nomeCompleto.includes(searchTerm);
    });

    renderDoctors(filteredData);
});

// Adicione um evento de change ao select de especialidade
const especialidadesSelect = document.getElementById("especialidadeSelect");
especialidadesSelect.addEventListener("change", function () {
    const selectedEspecialidade = this.value;

    if (selectedEspecialidade === "default") {
        getAndRenderDoctors();
    }
    else {
        const filteredData = filterDoctorsByEspecialidade(dados, selectedEspecialidade);
        renderDoctors(filteredData);
    }
})

// Função para filtrar médicos por especialidade
function filterDoctorsByEspecialidade(doctors, selectedEspecialidade) {
    return doctors.filter(user => {
        return user.especialidades.some(espec => espec.nome === selectedEspecialidade);
    });
}


// Função para renderizar os médicos no HTML
function renderDoctors(data) {
    const cardDoctor = document.getElementById("cards-section");
    cardDoctor.innerHTML = "";

    const dados = data.filter(d => d.aprovacao != "REPROVADO" && d.aprovacao != "ANALISE")

    if (dados.length === 0) {
        cardDoctor.innerHTML = "<p>Nenhum médico encontrado</p>";
    } else {
        dados.forEach((user,index) => {
            const imagePath = index % 5 + 1;
            const imageCorreta = imageDoctors[index % 5].image;

            let listDoctors = `
            <li class="booking-card"
            style="background-image: url('${imageCorreta}')">
            <h2 id="nome-doutor"> ${user.nomeCompleto}</h2>
            <div class="book-container">
                <div class="content">
                           <button type="button" id="btn-open-modal" data-nome="${user.nomeCompleto}" data-especialidade="${user.especialidades.map(espec => espec.nome).join(', ')}" data-id="${user.id}">Agende uma consulta!</button>
                </div>
            </div>
            <div class="informations-container">
                <h2 class="title"> ${user.nomeCompleto}</h2>
                <p class="sub-title">${user.especialidades.map(espec => `<span>${espec.nome}</span>`).join(', ')}</p>
            </div>
        </li>
        `;
            cardDoctor.innerHTML += listDoctors;
        })

    };


    const buttonsOpenModal = document.querySelectorAll("#btn-open-modal");

    for (const button of buttonsOpenModal) {
        button.addEventListener("click", function () {
            const nomeMedico = this.getAttribute("data-nome");

            const especialidadesMedico = this.getAttribute("data-especialidade").split(',').map(espec => ({ nome: espec }));

            idMedico = this.getAttribute("data-id");

            const especialidadesList = especialidadesMedico.map(espec => `<p>${espec.nome}</p>`).join('');


            // Defina o conteúdo do cabeçalho do modal com as informações do médico específico
            headerModal.innerHTML = `
            <button id="btn-close-modal">X</button>
                <h4>Dr. ${nomeMedico}</h4>
               <p>${especialidadesList}</p>
            `;

            modal.showModal();
            bloquearRolagem();


            const btnCloseModal = document.getElementById("btn-close-modal");
            btnCloseModal.addEventListener("click", function () {
                modal.close();
                permitirRolagem();
            });
        });
    }
}

// Função para exibir todos os médicos inicialmente
getAndRenderDoctors();



// resgatar especialidades
function fillEspecialidadesSelect() {

    axios.get(endpointCadastroEspecialidades)

        .then(function (response) {
            const dados = response.data;

            dados.forEach(especialidade => {
                if (especialidade.nome === "Clínico geral" || especialidade.nome === null) {
                    return
                } else {
                    let listEspecialidades = "";
                    listEspecialidades += `
                <option name="clinico_geral" value="${especialidade.nome}">
                    ${especialidade.nome}
                  </option>
                `;
                    select.innerHTML += listEspecialidades;
                }

            })
        })
        .catch(function (error) {
            console.log(error);
            alert('Erro ao cadastrar especialidade!');
        })
}


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


// marcar consulta
const btnMarcarConsulta = document.getElementById("btn-marcar-consulta");

btnMarcarConsulta.addEventListener("click", function () {
    console.log(idUsuario, "id paciente")
    console.log(idMedico, "id medico")
    console.log(idPaciente, "id paciente")
    let respostaAnamnese = "";

    const dados = {
        idMedico: idMedico,
        idPaciente: idPaciente,
        dataHoraConsulta: dataHoraEscolhida,
        anamnese: respostaAnamnese,
    }

    axios.post(urlMarcarConsulta, dados)
        .then(response => {
            alert("Consulta marcada com sucesso!");
            modal.close();
            permitirRolagem();

        })
        .catch(error => {
            console.error('Erro ao cadastrar anamnese:', error);

            if (error.response) {
                console.log("Data:", error.response.data);
                console.log("Status:", error.response.status);
                console.log("Headers:", error.response.headers);
                console.log("Response Data:", error.response.data);

            } else if (error.request) {
                console.log("Request:", error.request);
            } else {
                console.log("Error:", error.message);
            }
            console.log("Config:", error.config);

            alert('Erro ao cadastrar anamnese. Verifique o console para mais detalhes.');
        });


})
