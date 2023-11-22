// elementos
const nomeCompleto = document.querySelector('#nome_completo');
const endereco = document.querySelector('#endereco');
const dataNascimento = document.querySelector('#data_nasc');
const form = document.querySelector('#pacienteForm');

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
    
    // exibir tela de loading
    function showLoading() {
    
        document.getElementById('loading').style.display = 'flex';
    
        setTimeout(function () {
            document.getElementById('loading').style.display = 'none';
    
        }, 4000);
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

    try {
        const response = await axios.post(url, dadosCadastro, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        const dados = response.data;

        console.log(dados);
        const idPaciente = dados.id;

        // post file
        await axios.post(`${urlArquivo}/${idPaciente}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        localStorage.setItem('idPaciente', idPaciente);

        showLoading();
        window.location.href = 'home-paciente.html';
      

    } catch (error) {
        console.error('Erro ao cadastrar paciente:', error);
        alert('Erro ao cadastrar paciente. Verifique o console para mais detalhes.');
    }
});
