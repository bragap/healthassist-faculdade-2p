// html
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



// Requisição com axios	

const url = 'https://jsonplaceholder.typicode.com/users';

axios.get(url)
     .then( response => {
        const dados = response.data;

        const cardDoctor = document.getElementById("cards-section");

        dados.forEach(user => {
            let listDoctors = ""
            listDoctors += `
            <div id="card-individual">
            <h5>${user.name}</h5>
            <p> ${user.username}</p>
            <button type="button" id="btn-open-modal">Agende uma consulta!</button>
            </div>
            `;
            cardDoctor.innerHTML += listDoctors; 
        })
     })
     .catch(error => {
        console.error('Ocorreu um erro:', error);
      });