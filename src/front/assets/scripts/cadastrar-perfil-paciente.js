// elementos
const nomeCompleto = document.querySelector('#nome_completo');
const endereco = document.querySelector('#endereco');
const arquivo = document.querySelector('#inputGroupFile').files[0];
const dataNascimento = document.querySelector('#data_nasc');
const form = document.querySelector('#pacienteForm');

// endpoints
const url = '/usuario/id/paciente';

// FUNÇÕES

// formulario de cadastro de paciente
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nome_completo', nomeCompleto.value);
    formData.append('endereco', endereco.value);
    formData.append('arquivo', arquivo);
    formData.append('data_nasc', dataNascimento.value);

    axios.post(url, formData)
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
