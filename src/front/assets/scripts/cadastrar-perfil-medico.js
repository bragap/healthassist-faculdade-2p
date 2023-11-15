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

// FUNÇÕES

// get das especialidades
axios.get('http://localhost:8080/especialidade-medico')
    .then(response => {
        const dados = response.data;
        let listEspecialidades = "";

        dados.forEach((especialidade) => {
            if (especialidade.especialidade != null && especialidade != undefined) {
                listEspecialidades += `
            <option id="${especialidade.id}" value="${especialidade.id}">${especialidade.especialidade}</option>
            `;
            }
        })
        especialidade.innerHTML = listEspecialidades;
    })


// pegar os dados inseridos na disponibilidade de horario
function enviarDisponibilidade() {

    rows.forEach(row => {
        const inputs = row.querySelectorAll('.inputs-dias'); // Captura os inputs de cada linha
        const checkBox = row.querySelector('.cb1'); // Captura o checkbox

        if (checkBox.checked) { // Verifica se o checkbox está marcado
            const dia = checkBox.getAttribute('name');
            const horaInicio = inputs[0].value; // Captura o valor do primeiro input
            const horaFim = inputs[1].value; // Captura o valor do segundo input

            disponibilidade_de_horario.push({
                dia_da_semana: dia,
                hora_inicio: horaInicio,
                hora_fim: horaFim
            });
        }
    });
}

// formulario de cadastro de medico
form.addEventListener('submit', async (e) => {


    e.preventDefault();

    const especialidadeSelecionada = especialidade ? especialidade.options[especialidade.selectedIndex].value : null;

    console.log(especialidadeSelecionada, 'especialidadeSelecionada')

    const dados = {
        endereco: endereco.value,
        data_nasc: dataNascimento.value,
        codigo_de_registro: codigoRegistro.value,
        id_especialidade_medico: especialidadeSelecionada,
        nome_completo: nomeCompleto.value,
        id_usuario: idUsuario
    }

    try{
        const response = await axios.post(url, dados);
        console.log(response);
        alert('Médico cadastrado com sucesso!');
    }catch (error) {
        console.error('Erro ao cadastrar medico:', error);
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

        alert('Erro ao cadastrar medico. Verifique o console para mais detalhes.');
    };
});


//mudar nome do arquivo inserido
function displayFileName(input) {
    const fileNameDisplay = document.getElementById('fileNameDisplay');
    if (input.files.length > 0) {
        fileNameDisplay.textContent = input.files[0].name; // Exibe o nome do arquivo selecionado
    } else {
        fileNameDisplay.textContent = 'Nenhum arquivo selecionado';
    }
}
