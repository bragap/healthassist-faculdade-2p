const buttonModal = document.getElementById("button-modal")
const modal = document.getElementById("modal")
const buttonClose = document.getElementById("button-close")

buttonModal.onclick = function (){
    modal.showModal();
}
buttonClose.onclick = function() {
    modal.close();
}