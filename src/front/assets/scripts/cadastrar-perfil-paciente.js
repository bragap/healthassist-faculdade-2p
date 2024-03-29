// elementos
const nomeCompleto = document.querySelector('#nome_completo');
const endereco = document.querySelector('#endereco');
const dataNascimento = document.querySelector('#data_nasc');
const form = document.querySelector('#pacienteForm');
const file = document.querySelector('#inputGroupFile').files[0];
const btnSubmit = document.querySelector('.btn-cadastrar');

// endpoints
const url = 'http://localhost:8080/paciente';
const urlArquivo = "http://localhost:8080/api/paciente/arquivo";

// id usuario
const idUsuario = localStorage.getItem('idUsuario');
const tipoUsuario = localStorage.getItem('tipoUsuario');


// FUNÇÕES

// Função para verificar a autorização do usuário
function checkAuthorization() {

    if (tipoUsuario !== "PACIENTE") {
        redirectTo('error.html');
    }
}

checkAuthorization();

// exibir tela de loading
function showLoading() {

    document.getElementById('loading').style.display = 'flex';

    setTimeout(function () {
        document.getElementById('loading').style.display = 'none';

    }, 500);
}


// exibir nome do arquivo de upload
function displayFileName(input) {
    const fileNameDisplay = document.getElementById('fileNameDisplay');
    if (input.files.length > 0) {
        fileNameDisplay.textContent = input.files[0].name; // Exibe o nome do arquivo selecionado
    } else {
        fileNameDisplay.textContent = 'Nenhum arquivo selecionado';
    }
}

// ...


form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const file = document.getElementById('inputGroupFile').files[0];

    const dadosCadastro = {
        endereco: endereco.value,
        dataNasc: dataNascimento.value,
        nomeCompleto: nomeCompleto.value,
        id_usuario: idUsuario
    }

    const formData = new FormData();
    formData.append('file', file);

    showLoading();
    window.location.href = 'aguardando-aprovacao.html';

    try {
        const response = await axios.post(url, dadosCadastro, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        const dados = response.data;
        const idPaciente = dados.id;

        // post file
        await axios.post(`${urlArquivo}/${idPaciente}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        localStorage.setItem('idPaciente', idPaciente);


    } catch (error) {
        redirecionarAoClicar();

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
    }
});


