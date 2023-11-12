const buttonModal = document.querySelectorAll('.button-modal');
const modal = document.getElementById("modal");
const form = document.getElementById('form-prontuario');
const btnClose = document.getElementById("btn-close-modal");
const formLoginPaciente = document.getElementById("form-login-paciente");

buttonModal.forEach(buttonModal => {
    buttonModal.addEventListener('click', function () {
      modal.showModal();
    });
  });

buttonModal.addEventListener("click", function (){
    modal.showModal();
})


form.addEventListener('submit', (e) => {

    e.preventDefault();

});

const formsSucess = () => {

    const textSucess = document.querySelector(".text-sucess");

    textSucess.innerHTML = "Prontuário atualizado com sucesso!";
}

btnClose.addEventListener("click", () => {  

    modal.close();
    
    window.location.reload();
}   );