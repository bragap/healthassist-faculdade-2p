// elements
const painelUser = document.getElementsByClassName('dados-user')[0];

// id usuario
const idUsuario = localStorage.getItem('idUsuario');

// endpoint
const url = `http://localhost:8080/paciente/${idUsuario}`;

// FUNÇÕES

// get dos dados
document.addEventListener('DOMContentLoaded', function() {

 axios.get(url)
.then(response => {
 
    const dados = response.data;

    // dados do paciente
    let str = "";
    str += `
    <h3>Suas informações pessoais</h3>
              <p>Nome completo: <span>${dados.nomeCompleto}</span></p>
              <p>Usuário:  <span>${dados.usuario.apelido}</span></p>
              <p>Data de Nascimento:  <span>${dados.dataNasc}</span></p>
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