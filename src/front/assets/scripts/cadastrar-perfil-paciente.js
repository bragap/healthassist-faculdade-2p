// elementos
const nomeCompleto = document.querySelector('#nome_completo');
const endereco = document.querySelector('#endereco');
const arquivo = document.querySelector('#inputGroupFile').files[0];
const dataNascimento = document.querySelector('#data_nasc');
const form = document.querySelector('#pacienteForm');

// endpoints
const url = 'http://localhost:8080/paciente';

// FUNÇÕES

// formulario de cadastro de paciente
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = {
        id: 1,
        endereco: endereco.value,
        data_nasc: dataNascimento.value,
        data_criacao: new Date(),
        nome_completo: nomeCompleto.value,
        id_usuario: 1
    }
   
    console.log(data)

    axios.post(url, data)
        .then(function (response) {
            console.log(response);
            alert('Paciente cadastrado com sucesso!');
        })
        .catch(function (error) {
            console.log(error);
            alert('Erro ao cadastrar paciente!');
        });
}
)

// exibir nome do arquivo de upload
function displayFileName(input) {
    const fileNameDisplay = document.getElementById('fileNameDisplay');
    if (input.files.length > 0) {
        fileNameDisplay.textContent = input.files[0].name; // Exibe o nome do arquivo selecionado
    } else {
        fileNameDisplay.textContent = 'Nenhum arquivo selecionado';
    }
}
