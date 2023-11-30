// elements
const painelUser = document.getElementsByClassName('dados-user')[0];

// id usuario
const idUsuario = localStorage.getItem('idUsuario');
const idPaciente = localStorage.getItem('idPaciente');
const tipoUsuario = localStorage.getItem('tipoUsuario');

// endpoint
const url = `http://localhost:8080/paciente`;

// FUNÇÕES

// Função para verificar a autorização do usuário
function checkAuthorization() {

    if (tipoUsuario !== "PACIENTE") {
        redirectTo('error.html');
    }
}

checkAuthorization();

// get dos dados
document.addEventListener('DOMContentLoaded', function() {

 axios.get(url)
.then(response => {
 
    const dados = response.data.filter(paciente => paciente.usuario.id == idUsuario)[0];

    // dados do paciente
    let str = "";
    str += `
    <svg xmlns="http://www.w3.org/2000/svg" fill="#0367A6" class="bi bi-person-fill" viewBox="0 0 16 16">
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
          </svg>
    <h3>Suas informações pessoais</h3>
              <p>Nome completo: <span>${dados.nomeCompleto}</span></p>
              <p>Usuário:  <span>${dados.usuario.apelido}</span></p>
              <p>Data de Nascimento:  <span>${formatarDataNasc(dados.dataNasc)}</span></p>
              <p>Email:  <span>${dados.usuario.email}</span></p>
              <p>Endereço:  <span>${dados.endereco}</span> </p>
    `
    painelUser.innerHTML = str;
})

})

// exibiçao tela de loading
function showLoading() {

    document.getElementById('loading').style.display = 'flex';

    setTimeout(function () {
        document.getElementById('loading').style.display = 'none';

    }, 2000);
}
function redirectTo(destination) {
    showLoading();
    setTimeout(function () {
        window.location.href = destination;
    }, 2000);
}



//formatar data de nascimento
function formatarDataNasc(data) {
    const dataObj = new Date(data);
    const dia = padZero(dataObj.getDate());
    const mes = padZero(dataObj.getMonth() + 1);
    const ano = dataObj.getFullYear();
  
    return `${dia}/${mes}/${ano}`;
  }
  
  function padZero(numero) {
    return numero.toString().padStart(2, '0');
  }