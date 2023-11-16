// elementos
const nomeCompleto = document.querySelector('#nome_completo');
const endereco = document.querySelector('#endereco');
const dataNascimento = document.querySelector('#data_nasc');
const form = document.querySelector('#pacienteForm');

// endpoints
const url = 'http://localhost:8080/paciente';

// id usuario
const idUsuario = localStorage.getItem('idUsuario');
const tipoUsuario = localStorage.getItem('tipoUsuario');


// FUNÇÕES

// Função para verificar a autorização do usuário
function checkAuthorization() {

    if (tipoUsuario !== "PACIENTE") {
        redirectTo('home-medico.html');
    }
  }
  
checkAuthorization();

// ENVIAR ARQUIVO PRO BACKEND

// function getFormData() {

//     const formData = new FormData();

//     // Adicione o JSON do pacienteDto como uma parte separada
//     const pacienteDto = {
//         endereco: endereco.value,
//         dataNasc: dataNascimento.value,
//         nomeCompleto: nomeCompleto.value,
//         id_usuario: window.idUsuario
//     };

//     formData.append('dto', JSON.stringify(pacienteDto));

//     const inputFile = document.querySelector('#inputGroupFile');
//     if (inputFile.files.length > 0) {
//         formData.append('file', inputFile.files[0]);
//     }

//     console.log(formData)
//     return formData;
// }


// formulario de cadastro de paciente
form.addEventListener('submit', (e) => {


    e.preventDefault();

    // const formData = getFormData();

    //  dados.append('dto', JSON.stringify(pacienteDto));

    const dados = {
        endereco: endereco.value,
        dataNasc: dataNascimento.value,
        nomeCompleto: nomeCompleto.value,
        id_usuario: idUsuario
    }



    // Use o axios para enviar o FormData para o backend
    // const response = await axios.post(url, formData, {
    //     headers: {
    //         'Content-Type': 'multipart/form-data', // Certifique-se de definir o tipo de conteúdo como 'multipart/form-data'
    //     },
    // });
    axios.post(url, dados)
        .then(response => {
            console.log(response.status)
            if (response.status >= 200 && response.status < 300) {
                showLoading();
                window.location.href = 'home-paciente.html';
            } else {
                console.log('Cadastro não foi bem-sucedido. Código de status:', response.status);
            }
        })
        .catch(error)
    console.error('Erro ao cadastrar paciente:', error);
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

    alert('Erro ao cadastrar paciente. Verifique o console para mais detalhes.');
}
);

// exibir nome do arquivo de upload
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

