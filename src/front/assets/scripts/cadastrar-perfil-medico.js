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
const disponibilidade_de_horario = [];

//endpoints
const url = "/usuario/id/medico";

// FUNÇÕES

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

// enviar para o backEnd
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('endereco', endereco.value);
    formData.append('data_nasc', dataNascimento.value);
    formData.append('codigo_de_registro', codigoRegistro.value);
    formData.append('nome_completo', nomeCompleto.value);
    formData.append('especialidade', especialidade.value);
    formData.append('disponibilidade_de_horario', disponibilidade_de_horario);
    formData.append('arquivo', arquivo);

    axios.post(url, formData)
        .then(function (response) {
            console.log(response);
            alert('Médico cadastrado com sucesso!');
        })
        .catch(function (error) {
            console.log(error);
            alert('Erro ao cadastrar Médico!');
        });
}
)



//mudar nome do arquivo inserido
function displayFileName(input) {
    const fileNameDisplay = document.getElementById('fileNameDisplay');
    if (input.files.length > 0) {
        fileNameDisplay.textContent = input.files[0].name; // Exibe o nome do arquivo selecionado
    } else {
        fileNameDisplay.textContent = 'Nenhum arquivo selecionado';
    }
}
