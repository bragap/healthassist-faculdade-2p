// elementos
const modal = document.getElementById("modal");
const htmlConteudo = document.querySelector("html");
const bodyConteudo = document.querySelector("body");
const btnSubmit = document.getElementById("btn-submit");
const select = document.getElementById("especialidadeSelect");

const table = document.getElementById("table");
const modalfilter = document.getElementById("modal-filter");
let dataHoraEscolhida = "";
const headerModal = document.getElementById("header-modal");
let idMedico = 0;


// endpoints
const url = 'http://localhost:8080/medico';
const endpointCadastroEspecialidades = "http://localhost:8080/especialidade-medico";
const urlMarcarConsulta = "http://localhost:8080/consulta";

// id usuario
const idUsuario = localStorage.getItem('idUsuario');

// FUNÇÕES

// exibir conteudo Table
document.addEventListener("DOMContentLoaded", function () {

    function obterProximosDiasDaSemana() {
        const diasSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];

        const hoje = new Date();
        const diasDaSemana = [];

        for (let i = 1; i <= 5; i++) {  // 5 próximos dias da semana (segunda a sexta)
            const dia = new Date();
            dia.setDate(hoje.getDate() + (i + (7 - hoje.getDay())) % 7); // Calcula o próximo dia da semana

            const diaFormatado = `${String(dia.getDate()).padStart(2, '0')}/${String(dia.getMonth() + 1).padStart(2, '0')}/${dia.getFullYear()}`;

            diasDaSemana.push(diaFormatado);
        }

        const html = `
          <tr>
            <th>Horário</th>
            <th>Dia da semana</th>
            <th>Selecione</th>
          </tr>
          ${diasDaSemana.map(diaFormatado => `
            <tr>
              <td>13:00</td>
              <td>${diaFormatado}</td>
              <td><input type="checkbox" name="" id=""></td>
            </tr>
            <tr>
              <td>14:00</td>
              <td>${diaFormatado}</td>
              <td><input type="checkbox" name="" id=""></td>
            </tr>
          `).join('')}
        `;

        // Agora, o HTML contém os próximos horários para os próximos 5 dias da semana (segunda a sexta) no formato "DD/MM/AAAA"

        table.innerHTML = html;
    }

    obterProximosDiasDaSemana();

})

//exibir filtro no modal
document.addEventListener("DOMContentLoaded", function () {

    exibirConteudoFiltro = () => {

        let str = "";
        str += `
        
        <p>Filtre por dia e horários que achar melhor</p>
        <select name="dia">
          <option value="">Selecione o dia</option>
          <option value="SEGUNDA">Segunda-feira</option>
          <option value="TERÇA">Terça-feira</option>
          <option value="QUARTA">Quarta-feira</option>
          <option value="QUINTA">Quinta-feira</option>
          <option value="SEXTA">Sexta-feira</option>
        </select>
        <select name="horario">
          <option value="">Escolha o horário</option>
          <option value="13:00">13:00</option>
          <option value="14:00">14:00</option>
        </select>

        `
        modalfilter.innerHTML = str;
    }
    exibirConteudoFiltro();

})

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



// Pega todos os médicos cadastrados no HealthAssist
axios.get(url)
    .then(response => {
        const dados = response.data;

        const cardDoctor = document.getElementById("cards-section");

        dados.forEach(user => {
            let listDoctors = ""
            listDoctors += `
            <div id="card-individual">
            <h5>Dr. ${user.nomeCompleto}</h5>
            <p> ${user.especialidadeMedico.especialidade}</p>
            <button type="button" id="btn-open-modal" data-nome="${user.nomeCompleto}" data-especialidade="${user.especialidadeMedico.especialidade}" data-id="${user.id}">Agende uma consulta!</button>
            </div>
            `;
            cardDoctor.innerHTML += listDoctors;
        })

        const buttonsOpenModal = document.querySelectorAll("#btn-open-modal");

        for (const button of buttonsOpenModal) {
            button.addEventListener("click", function () {
                const nomeMedico = this.getAttribute("data-nome");
                const especialidadeMedico = this.getAttribute("data-especialidade");
                idMedico = this.getAttribute("data-id");

                // Defina o conteúdo do cabeçalho do modal com as informações do médico específico
                headerModal.innerHTML = `
                    <h4>${nomeMedico}</h4>
                    <p>${especialidadeMedico}</p>
                    <p>${idMedico}</p>
                    <button id="btn-close-modal">X</button>
                `;

                modal.showModal();
                bloquearRolagem();
            });
        }


        // fechar modal
        modal.addEventListener("click", function (event) {
            if (event.target.id === "btn-close-modal") {
                modal.close();
                permitirRolagem();
            }
        });
    })
    .catch(error => {
        console.error('Ocorreu um erro:', error);
    });






// resgatar especialidades
axios.get(endpointCadastroEspecialidades)

    .then(function (response) {
        const dados = response.data;

        dados.forEach(especialidade => {
            if (especialidade.especialidade === "Clínico geral" || especialidade.especialidade === null) {
                return
            } else {
                let listEspecialidades = "";
                listEspecialidades += `
                <option name="clinico_geral" value="clinico geral">
                    ${especialidade.especialidade}
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
    let respostaAnamnese = "";

    const dados = {
        idMedico: idMedico,
        idPaciente: idUsuario,
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
            console.error('Ocorreu um erro:', error);
            alert("Erro ao marcar consulta!");
        });


})
