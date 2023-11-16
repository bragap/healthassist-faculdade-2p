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
            const dados = response.data;

            const tipoUsuario = dados.autorizacao;

            localStorage.setItem('idUsuario', dados.id);
            localStorage.setItem('tipoUsuario', tipoUsuario);

            showLoading();

            setTimeout(() => {
                redirectToProfilePage(tipoUsuario);
            }, 2000);

        } catch (error) {
            displayErrorMessage(error.response.data);
            errorValidation(usuarioLogin);
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
function redirectToProfilePage(tipoUsuario) {
    const tipo = tipoUsuario.toLowerCase();
    const idUsuario = localStorage.getItem('idUsuario');
    showLoading();
    axios.get(`http://localhost:8080/${tipo}`)
        .then((response) => {
            const dados = response.data;
            const usuario = dados.find((usuario) => usuario.usuario.id == idUsuario);

            if (usuario) {
                if (tipoUsuario === "PACIENTE") {
                    window.location.href = `home-paciente.html`;
                } else if (tipoUsuario === "MEDICO"){
                    window.location.href = `home-medico.html`;
                }
            } else {
                if (tipoUsuario === "PACIENTE") {
                    window.location.href = `completar-perfil-paciente.html`;
                } else if (tipoUsuario === 'MEDICO'){
                    window.location.href = `completar-perfil-medico.html`;
                }
            }
        })

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
                
                if (error.response) {
                    const textSucess = document.querySelector(".text-sucess");

                    textSucess.innerHTML = error.response.data;
                    // O servidor retornou um código de status diferente de 2xx
                    console.log("Data:", error.response.data);
                    errorValidation(email);
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

// exibir tela de loading
function showLoading() {

    document.getElementById('loading').style.display = 'flex';

    setTimeout(function () {
        document.getElementById('loading').style.display = 'none';

    }, 2000);
}


// // populando minha rota de especialidades

// const dados = [
//     {
//     "id": 1,
//     "especialidade": "Clínico Geral"
//     },
//     {
//     "id": 2,
//     "especialidade": "Dermatologista"
//     },
//     {
//     "id": 3,
//     "especialidade": "Endocrinologista"
//     },
//     {
//     "id": 4,
//     "especialidade": "Otorrinolarinogologista"
//     },
//     {
//     "id": 5,
//     "especialidade": "Ginecologista"
//     },
//     {
//     "id": 6,
//     "especialidade": "Pediatra"
//     },
//     {
//     "id": 7,
//     "especialidade": "Urologista"
//     },
//     {
//     "id": 8,
//     "especialidade": "Odontologia"
//     },
//     {
//     "id": 9,
//     "especialidade": "Psicologia"
//     },
//     {
//     "id": 10,
//     "especialidade": "Psiquiatria"
//     },
//     {
//     "id": 11,
//     "especialidade": "Cardiologia"
//     },
//     {
//     "id": 12,
//     "especialidade": "Neurologia"
//     },
//     {
//     "id": 13,
//     "especialidade": "Oftalmologia"
//     }
//     ]

//     async function popularBancoDeDados() {
//         try {

//             const resposta = await axios.post(endpointCadastroEspecialidades, {especialidades : dados});
            
//             // localStorage.setItem('dados_p', dados.id);

//             console.log('Resposta da chamada POST:', resposta.data);
//         } catch (erro) {
//             console.error('Erro ao fazer a chamada POST:', erro.message);
//         }
//     }


//     if (!localStorage.getItem('dados_populados')) {

//         await popularBancoDeDados();

//     localStorage.setItem('dados_populados', 'true');
// }