// elementos
const modal = document.getElementById("modal");
const btnCloseModal = document.getElementById("btn-close-modal");
const htmlConteudo = document.querySelector("html");
const bodyConteudo = document.querySelector("body");
const btnSubmit = document.getElementById("btn-submit");
const select = document.getElementById("especialidadeSelect");

// endpoints
const url = 'https://jsonplaceholder.typicode.com/users';
const endpointCadastroEspecialidades = "http://localhost:8080/especialidade-medico";



// FUNÇÕES



//fechar modal
btnCloseModal.addEventListener("click", function () {

    modal.close();
    permitirRolagem();

});

// evita rolagem da página
const bloquearRolagem = () => {
    htmlConteudo.classList.add("rolagem-bloqueada");
    bodyConteudo.classList.add("rolagem-bloqueada");
}
// permite rolagem da pagina
const permitirRolagem = () => {
    htmlConteudo.classList.add("rolagem-permitida");
    bodyConteudo.classList.add("rolagem-permitida");
}



// Pega todos os médicos cadastrados no HealthAssist
axios.get(url)
    .then(response => {
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
        // abrir modal
        const buttons = document.querySelectorAll("#btn-open-modal");

        for (const button of buttons) {
            button.addEventListener("click", function () {

                modal.showModal();
                bloquearRolagem();

            })

        }
    })
    .catch(error => {
        console.error('Ocorreu um erro:', error);
    });




// resgatar especialidades
axios.get(endpointCadastroEspecialidades)

    .then(function (response) {
        console.log(response);
        const dados = response.data;

        dados.forEach(especialidade => {
            if (especialidade.especialidade === "Clínico geral" || especialidade.especialidade === null) {
                return
            } else {
                let listEspecialidades = "";
                listEspecialidades += `
                <option name="clinico_geral" value="clinico geral">
                    ${especialidade.especialidade}
                  </option>
                `;
                select.innerHTML += listEspecialidades;
            }

        })
    })
    .catch(function (error) {
        console.log(error);
        alert('Erro ao cadastrar especialidade!');
    })


