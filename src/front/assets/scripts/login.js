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

// variaveis
let usuario = {};
let dadosLogin = {};
let valid = true;
let validLogin = true;
let exemplo = {};
let nextUserId = 1;

// endpoints
const endpointCadastroUsuario = "http://localhost:8080/usuario";
const endpointLogin = "http://localhost:8080/usuario/login";

// FUNÇÕES

// formulario de login
formLogin.addEventListener('submit', (e) => {

    e.preventDefault();

    checkInputsLogin();

    if (validLogin) {
        dadosLogin = {
            apelido: usuarioLogin.value,
            senha: senhaLogin.value
        }
        axios.post(endpointLogin, dadosLogin)
            .then((response) => {

                const tipoUsuario = response.data.autorizacao;
                const enderecoUsuario = response.data.endereco;

                if (enderecoUsuario === null) {
                    if (tipoUsuario === "PACIENTE") {
                        window.location.href = "/completar-perfil-paciente.html";
                    } else if (tipoUsuario === "MEDICO") {
                        window.location.href = "/completar-perfil-medico.html";
                    } else {
                        window.location.href = "/home-admin.html";
                    }

                } else {
                    if (tipoUsuario === "PACIENTE") {
                        window.location.href = "/home-paciente.html";
                    } else if (tipoUsuario === "MEDICO") {
                        window.location.href = "/home-medico.html";
                    } else {
                        window.location.href = "/home-admin.html";
                    }
                }


            })
            .catch((error) => {
                if (error.response) {
                    // O servidor retornou um código de status diferente de 2xx
                    console.log("Data:", error.response.data);
                    console.log("Status:", error.response.status);
                    console.log("Headers:", error.response.headers);
                } else if (error.request) {
                    // A requisição foi feita, mas não recebeu resposta
                    console.log("Request:", error.request);
                } else {
                    // Ocorreu um erro durante a configuração da requisição
                    console.log("Error:", error.message);
                }
                console.log("Config:", error.config);
            })
    }
})

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


// formulario de cadastro
form.addEventListener('submit', (e) => {

    e.preventDefault();

    checkInputs();
    if (valid) {
        axios.post(endpointCadastroUsuario, usuario)
            .then((response) => {
                console.log(response);
                console.log(usuario);
            }
            ).catch((error) => {
                if (error.response) {
                    // O servidor retornou um código de status diferente de 2xx
                    console.log("Data:", error.response.data);
                    console.log("Status:", error.response.status);
                    console.log("Headers:", error.response.headers);
                } else if (error.request) {
                    // A requisição foi feita, mas não recebeu resposta
                    console.log("Request:", error.request);
                } else {
                    // Ocorreu um erro durante a configuração da requisição
                    console.log("Error:", error.message);
                }
                console.log("Config:", error.config);
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

    if (passwordValue.length < 8) {

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
            id: generateUniqueId(),
            apelido: username.value,
            email: email.value,
            senha: password.value,
            autorizacao: autorizacaoPaciente.checked ? "PACIENTE" : "MEDICO"
        }
        console.log(usuario);

        formsSucess();
        
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

    window.location.reload();
});

// abrir modal
buttonModal.addEventListener("click", function () {
    modal.showModal();
})


// Função para gerar IDs únicos para usuários
function generateUniqueId() {
    const uniqueId = `${nextUserId}`; 
    nextUserId++;
    return uniqueId;
}