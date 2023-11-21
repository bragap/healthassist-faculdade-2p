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
        redirectTo('error.html');
    }
}

checkAuthorization();

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

    const dadosCadastro = {
        endereco: endereco.value,
        dataNasc: dataNascimento.value,
        nomeCompleto: nomeCompleto.value,
        id_usuario: idUsuario
    }

    try {
        const response = await axios.post(url, dadosCadastro);
        const dados = response.data;

        console.log(dados);
        
        const idPaciente = dados.id;
        
        localStorage.setItem('idPaciente', idPaciente);

        localStorage.getItem('tipoUsuario', tipoUsuario);

        showLoading();
        setTimeout(() => {
            redirectToProfilePage(tipoUsuario);
        }, 2000);


    } catch(error ) {
        console.error('Erro ao cadastrar médico:', error);
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
    }});        


// Função para redirecionar para a página de perfil com base no tipo de usuário
function redirectToProfilePage(tipoUsuario) {
    const tipo = tipoUsuario.toLowerCase();
    const idUsuario = localStorage.getItem('idUsuario');
    showLoading();
    axios.get(`http://localhost:8080/${tipo}`)
        .then((response) => {
            const dados = response.data;

            const usuario = dados.find((usuario) => usuario.usuario.id == idUsuario);

            if (usuario) {

                const aprovacao = usuario.aprovacao;

                localStorage.setItem('aprovacao', aprovacao);


                if (aprovacao === "ANALISE") {
                    showLoading();
                    setTimeout(() => {
                        window.location.href = `aguardando-aprovacao.html`;
                    }, 2000);


                } else if (aprovacao === "REPROVADO") {
                    showLoading();
                    setTimeout(() => {
                        window.location.href = `reprovado.html`;
                    }, 2000);

                } else if (aprovacao === "APROVADO") {

                    window.location.href = `home-${tipo}.html`
                }

            } else {
                window.location.href = `completar-perfil-${tipo}.html`;
            }
        })

}