const buttons = document.querySelectorAll("button");
const modal = document.getElementById("modal");
const btnCloseModal = document.getElementById("btn-close-modal");
const htmlConteudo = document.querySelector("html");
const bodyConteudo = document.querySelector("body");


for (const button of buttons) {
    button.addEventListener("click", function () {
    
        modal.showModal();
        bloquearRolagem();
    
    })

}

btnCloseModal.addEventListener("click", function () {

    modal.close();
    permitirRolagem();

});

const bloquearRolagem = () => {
    htmlConteudo.classList.add("rolagem-bloqueada");
    bodyConteudo.classList.add("rolagem-bloqueada");
}

const permitirRolagem = () => {
    htmlConteudo.classList.add("rolagem-permitida");
    bodyConteudo.classList.add("rolagem-permitida");
}