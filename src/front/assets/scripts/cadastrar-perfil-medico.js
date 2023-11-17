// elementos
const nomeCompleto = document.querySelector('#nome_completo');
const endereco = document.querySelector('#endereco');
const arquivo = document.querySelector('#inputGroupFile').files[0];
const especialidade = document.querySelector('#especialidadeSelect');
const dataNascimento = document.querySelector('#data_nasc');
const form = document.querySelector('#medico-form');
const codigoRegistro = document.querySelector('#codigo_de_registro');
const disponibilidadeTable = document.getElementById('disponibilidadeTable');
const rows = disponibilidadeTable.querySelectorAll('tr');
let disponibilidade_de_horario = [];

//endpoints
const url = "http://localhost:8080/medico";


//id usuario
const idUsuario = localStorage.getItem('idUsuario');
const tipoUsuario = localStorage.getItem('tipoUsuario');

// FUNÇÕES

// Função para verificar a autorização do usuário
function checkAuthorization() {

    if (tipoUsuario !== "MEDICO") {
        alert("Você nao possui acesso a essa pagina!")
        redirectTo('home-paciente.html');
    }
}

checkAuthorization();



// get das especialidades
axios.get('http://localhost:8080/especialidade-medico')
    .then(response => {
        const dados = response.data;
        let listEspecialidades = "";

        dados.forEach((especialidade) => {
            if (especialidade.nome != null && especialidade != undefined) {
                listEspecialidades += `
            <option id="${especialidade.id}" value="${especialidade.nome}">${especialidade.nome}</option>
            `;
            }
        })
        especialidade.innerHTML = listEspecialidades;
    })


// // pegar os dados inseridos na disponibilidade de horario
// function enviarDisponibilidade() {

//     rows.forEach(row => {
//         const inputs = row.querySelectorAll('.inputs-dias'); // Captura os inputs de cada linha
//         const checkBox = row.querySelector('.cb1'); // Captura o checkbox

//         if (checkBox.checked) { // Verifica se o checkbox está marcado
//             const dia = checkBox.getAttribute('name');
//             const horaInicio = inputs[0].value; // Captura o valor do primeiro input
//             const horaFim = inputs[1].value; // Captura o valor do segundo input

//             disponibilidade_de_horario.push({
//                 dia_da_semana: dia,
//                 hora_inicio: horaInicio,
//                 hora_fim: horaFim
//             });
//         }
//     });
// }

// formulario de cadastro de medico
form.addEventListener('submit', (e) => {
    e.preventDefault();


    const especialidadeSelecionada = especialidade ? especialidade.options[especialidade.selectedIndex].value : null;


    const dados = {
        endereco: endereco.value,
        data_nasc: dataNascimento.value,
        codigo_de_registro: codigoRegistro.value,
        id_especialidade_medico: especialidadeSelecionada,
        nome_completo: nomeCompleto.value,
        id_usuario: idUsuario
    }

    axios.post(url, dados)
        .then(response => {
            console.log(response.status)
            if (response.status >= 200 && response.status < 300) {
                showLoading();
                window.location.href = 'home-medico.html';
            } else {
                console.log('Cadastro não foi bem-sucedido. Código de status:', response.status);
            }
        })
        .catch(error)
    console.log('Erro ao cadastrar médico:', error);
    if (error.response) {
        console.log("Data:", error.response.data);
        console.log("Status:", error.response.status);
        console.log("Headers:", error.response.headers);
    } else if (error.request) {
        console.log("Request:", error.request);
    } else {
        console.log("Error:", error.message);
    }
    console.log("Config:", error.config);

    alert('Erro ao cadastrar médico. Verifique o console para mais detalhes.');
}
);

//mudar nome do arquivo inserido
function displayFileName(input) {
    const fileNameDisplay = document.getElementById('fileNameDisplay');
    if (input.files.length > 0) {
        fileNameDisplay.textContent = input.files[0].name; // Exibe o nome do arquivo selecionado
    } else {
        fileNameDisplay.textContent = 'Nenhum arquivo selecionado';
    }
}

// exibir tela de loading
function showLoading() {

    document.getElementById('loading').style.display = 'flex';

    setTimeout(function () {
        document.getElementById('loading').style.display = 'none';

    }, 4000);
}

