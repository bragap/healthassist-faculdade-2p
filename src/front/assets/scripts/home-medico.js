// elements
const modal = document.getElementById("modal");
const form = document.getElementById('form-prontuario');
const btnClose = document.getElementById("btn-close-modal");
const formLoginPaciente = document.getElementById("form-login-paciente");

const cardPainel = document.querySelector("#painel-consultas");
const tablePainel = document.querySelector("#exibe-consultas");
const nomePaciente = document.getElementById("nome-paciente");

//endpoints
const url = 'https://jsonplaceholder.typicode.com/users';


// FUNÇÕES

// puxar elementos da api das proximas consultas
axios.get(url)
.then(response => {

    const dados = response.data;

    dados.forEach(user => {
        let listaConsultas = "";
        listaConsultas += `
        <div class="card-consulta">
            <span name="nome_do_paciente" value="nome do paciente">Nome do Paciente: ${user.name}</span>
            <span name="email_do_paciente" value="email do paciente">E-mail do Paciente: ${user.email}</span>
            <span name="data_da_consulta" value="data da consulta">Data da consulta : ${user.username}</span>
            <a href="">
              <span name="arquivos_do_paciente" value="arquivos do paciente">Arquivos do paciente</span>
            </a>
            <svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="19" height="20" rx="2" fill="#F7685B" fill-opacity="0.8" />
              <path
                d="M5 7H6M6 7H14M6 7V14C6 14.2652 6.10536 14.5196 6.29289 14.7071C6.48043 14.8946 6.73478 15 7 15H12C12.2652 15 12.5196 14.8946 12.7071 14.7071C12.8946 14.5196 13 14.2652 13 14V7M7.5 7V6C7.5 5.73478 7.60536 5.48043 7.79289 5.29289C7.98043 5.10536 8.23478 5 8.5 5H10.5C10.7652 5 11.0196 5.10536 11.2071 5.29289C11.3946 5.48043 11.5 5.73478 11.5 6V7M8.5 9.5V12.5M10.5 9.5V12.5"
                stroke="white" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </div>
        `;
        
        cardPainel.innerHTML += listaConsultas;

     }  )
})
.catch(error => {
    console.log(error);
})

// puxar elementos da api para atualizar consultas   
axios.get(url)
.then(response => {
    const dados = response.data;

    dados.forEach(user => {
      let listaConsultas = "";
      listaConsultas += `
      <tr>
      <td>${user.id}</td>
      <td>${user.username}</td>
      <td>${user.id}</td>
      <td>Segunda-feira</td>
      <td>14:00</td>
      <td class="icon-container">
        <svg value=${user.username} class="button-modal" width="20" height="20" viewBox="0 0 20 20" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <rect width="20.0001" height="20.0001" rx="2.66667" fill="#34AFF9" />
          <path
            d="M9.47289 6.05427H5.99398C5.73036 6.05427 5.47754 6.15899 5.29113 6.3454C5.10472 6.53181 5 6.78463 5 7.04825V14.0061C5 14.2697 5.10472 14.5225 5.29113 14.7089C5.47754 14.8953 5.73036 15.0001 5.99398 15.0001H12.9518C13.2154 15.0001 13.4683 14.8953 13.6547 14.7089C13.8411 14.5225 13.9458 14.2697 13.9458 14.0061V10.5272M13.2003 5.30879C13.398 5.11107 13.6662 5 13.9458 5C14.2254 5 14.4936 5.11107 14.6913 5.30879C14.889 5.5065 15.0001 5.77466 15.0001 6.05427C15.0001 6.33388 14.889 6.60204 14.6913 6.79975L9.96988 11.5211L7.98193 12.0181L8.47892 10.0302L13.2003 5.30879Z"
            stroke="white" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </td>
    </tr>
      `;
      tablePainel.innerHTML += listaConsultas;
    });

    // abrir modal
    const buttonModal = document.querySelectorAll('.button-modal');
    buttonModal.forEach(buttonModal => {
        buttonModal.addEventListener('click', function () {
          modal.showModal();
            nomePaciente.innerHTML = buttonModal.getAttribute('value');
        });
      });

})



// formulario de envio da anamnese
form.addEventListener('submit', (e) => {

    e.preventDefault();

});

const formsSucess = () => {

    const textSucess = document.querySelector(".text-sucess");

    textSucess.innerHTML = "Prontuário atualizado com sucesso!";
}

//fechar modal
btnClose.addEventListener("click", () => {  

    modal.close();
    
    window.location.reload();
}   );