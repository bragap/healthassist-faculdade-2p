// elementos do modal
const buttonModal = document.getElementById("button-modal")
const modal = document.getElementById("modal")
const form = document.getElementById('form-register');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const btnClose = document.getElementById("btn-close-modal");
const formLoginPaciente = document.getElementById("form-login-paciente");
const autorizacaoMedico = document.getElementById("tipo_medico");
const autorizacaoPaciente = document.getElementById("tipo_paciente");

// elementos do login
const usuarioLogin = document.getElementById("dado-login-name");
const senhaLogin = document.getElementById("dado-login-senha");
const formLogin = document.getElementById("forms-login-paciente");
const errorMessage = document.getElementById("error-message");
const textError = document.getElementById("text-error");

// variaveis
let usuario = {};
let dadosLogin = {};
let valid = true;
let validLogin = true;
let exemplo = {};
let nextUserId = 1;
let idUsuario = 0;

// endpoints
const endpointCadastroUsuario = "http://localhost:8080/usuario";
const endpointLogin = "http://localhost:8080/usuario/login";
const endpointCadastroEspecialidades = "http://localhost:8080/especialidade-medico";



// FUNÇÕES

// Formulário de login
formLogin.addEventListener('submit', async (e) => {
    e.preventDefault();

    checkInputsLogin();

    if (validLogin) {

    }
    clearErrorMessage();

    const dadosLogin = {
        email: usuarioLogin.value,
        senha: senhaLogin.value
    };

    try {
        const response = await axios.post(endpointLogin, dadosLogin);
        const dados = response && response.data;

        console.log(dados);

        const tipoUsuario = dados.autorizacao.toLowerCase();

        localStorage.setItem('idUsuario', dados.id);
        localStorage.setItem('tipoUsuario', dados.autorizacao);

        showLoading();
        redirectToProfilePage(tipoUsuario);

    } catch (error) {
        // displayErrorMessage(error.response.data);
        errorValidation(usuarioLogin);
        errorValidation(senhaLogin);
        handleLoginError(error);
    }
});




// Função para exibir mensagem de erro
function displayErrorMessage(message) {
    textError.innerHTML = message;
}

// Função para limpar mensagem de erro
function clearErrorMessage() {
    textError.innerHTML = "";
}

// Função para lidar com erros de login
function handleLoginError(error) {
    console.error('Erro ao fazer login:', error);

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

// Função para redirecionar para a página de perfil com base no tipo de usuário
const redirectToProfilePage = async (tipoUsuario) => {
    const tipo = tipoUsuario.toLowerCase();
    const idUsuario = localStorage.getItem('idUsuario');
    showLoading();

    try {
        const response = await axios.get(`http://localhost:8080/${tipo}`);
        const dados = response && response.data;

        const usuario = dados.find((usuario) => usuario.usuario.id == idUsuario);
        
        if (usuario) {
            const aprovacao = usuario.aprovacao;
            localStorage.setItem('aprovacao', aprovacao);

            if (aprovacao === "ANALISE") {
                showLoading();
                localStorage.clear();
                setTimeout(() => {
                    window.location.href = `aguardando-aprovacao.html`;
                }, 2000);


            } else if (aprovacao === "REPROVADO") {
                showLoading();
                localStorage.clear();
                setTimeout(() => {
                    window.location.href = `reprovado.html`;
                }, 2000);

            } else if (aprovacao === "APROVADO") {

                window.location.href = `home-${tipo}.html`
            }

        } else {
            window.location.href = `completar-perfil-${tipo}.html`;
        }
    } catch (error) {
        console.error('Erro ao fazer login:', error);

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
}

// verificar inputs da área de login
const checkInputsLogin = () => {
    const usernameValue = usuarioLogin.value.trim();
    const passwordValue = senhaLogin.value.trim();

    if (usernameValue === '') {

        errorValidation(usuarioLogin);
        validLogin = false;
    } else {

        successValidation(usuarioLogin);
    }
    if (passwordValue === '') {

        errorValidation(senhaLogin);
        validLogin = false;

    } else {

        successValidation(senhaLogin);
    }
}

const textErrorModal = document.getElementById("text-error-modal");
const displayErrorMessageModal = (message) => {
    textErrorModal.innerHTML = message;
}


// formulario de cadastro
form.addEventListener('submit', (e) => {

    e.preventDefault();

    checkInputs();
    if (valid) {
        axios.post(endpointCadastroUsuario, usuario)
            .then((response) => {
                console.log(response);
                console.log(usuario);
                formsSucess();
            }
            ).catch((error) => {
                displayErrorMessageModal(error.response.data);
                errorValidation(email);
                errorValidation(username);
                errorValidation(password);
                errorValidation(password2);
                handleLoginError(error);

            }
            )
    }
});

// checa inputs do formulario de cadastro
const checkInputs = () => {

    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();


    if (usernameValue === '') {

        errorValidation(username);
        valid = false;
    } else {

        successValidation(username);
    }
    if (emailValue === '') {

        errorValidation(email);
        valid = false;

    } else {

        successValidation(email);
    }

    if (passwordValue === '') {

        errorValidation(password);
        valid = false;

    } else {

        successValidation(password);
    }


    if (password2Value === '') {

        errorValidation(password2);
        valid = false;

    } else if (passwordValue !== password2Value) {

        errorValidation(password2);
        valid = false;

    } else {
        successValidation(password2);
    }

    if (autorizacaoPaciente.checked === false && autorizacaoMedico.checked === false) {
        valid = false;
    }

    if (valid) {

        usuario = {
            apelido: username.value,
            email: email.value,
            senha: password.value,
            autorizacao: autorizacaoPaciente.checked ? "PACIENTE" : "MEDICO"
        }


    }

}

// validação de erro dos inputs
const errorValidation = (input) => {

    const formControl = input.parentElement;

    formControl.className = 'form-control error';
}

// validação de sucesso dos inputs
const successValidation = (input) => {

    const formControl = input.parentElement;

    formControl.className = 'form-control success';

}

// exibir texto de cadastro realizado no modal
const formsSucess = () => {

    const textSucess = document.querySelector(".text-sucess");

    textSucess.innerHTML = "Cadastro realizado com sucesso!";
}

// fechar modal
btnClose.addEventListener("click", () => {

    modal.close();

});

// abrir modal
buttonModal.addEventListener("click", function () {
    modal.showModal();
})


// exibir tela de loading
function showLoading() {

    document.getElementById('loading').style.display = 'flex';

    setTimeout(function () {
        document.getElementById('loading').style.display = 'none';

    }, 2000);
}

// nao deixa o usuario selecionar os 2 checkboxes
const disable = () => {

    const item = document.querySelectorAll(".cb1");

    if (item[0].checked === true) {
        item[1].disabled = true;
    } else if (item[1].checked === true) {
        item[0].disabled = true;
    } else {
        item[0].disabled = false;
        item[1].disabled = false;
    }
}