const buttonModal = document.getElementById("button-modal")
const modal = document.getElementById("modal")
const form = document.getElementById('form-register');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const btnClose = document.getElementById("btn-close-modal");
const formLoginPaciente = document.getElementById("form-login-paciente");


buttonModal.addEventListener("click", function (){
    modal.showModal();
})


form.addEventListener('submit', (e) => {

    e.preventDefault();

    checkInputs();

});

const checkInputs = () => {

    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();

    let valid = true;

    if (usernameValue === '') {

        errorValidation(username, 'Preencha esse campo');
        valid = false;
    } else {

        successValidation(username);
    }
    if (emailValue === '') {

        errorValidation(email, 'Preencha esse campo');
        valid = false;

    } else {

        successValidation(email);
    }

    if (passwordValue.length < 8) {

        errorValidation(password, 'A senha deve ter no mínimo 8 caracteres');
        valid = false;

    } else {

        successValidation(password);
    }


    if (password2Value === '') {

        errorValidation(password2, 'Preencha esse campo');
        valid = false;

    } else if (passwordValue !== password2Value) {

        errorValidation(password2, 'As senhas não conferem');
        valid = false;

    } else {
        successValidation(password2);
    }

    if(valid){
        formsSucess();
        form.reset();
    }
    
}

const errorValidation = (input, message) => {

    const formControl = input.parentElement;
    const small = formControl.querySelector('small');

    small.innerText = message;

    formControl.className = 'form-control error';
}

const successValidation = (input) => {

    const formControl = input.parentElement;

    formControl.className = 'form-control success';

}

const formsSucess = () => {

    const textSucess = document.querySelector(".text-sucess");

    textSucess.innerHTML = "Cadastro realizado com sucesso!";
}

btnClose.addEventListener("click", () => {  

    modal.close();
    
    window.location.reload();
}   );