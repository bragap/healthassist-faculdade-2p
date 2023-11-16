// elements
const painelUser = document.getElementsByClassName('dados-user')[0];

// id usuario
const idUsuario = localStorage.getItem('idUsuario');
const tipoUsuario = localStorage.getItem('tipoUsuario');

// endpoint
const url = `http://localhost:8080/paciente/${idUsuario}`;

// FUNÇÕES

// Função para verificar a autorização do usuário
function checkAuthorization() {

    if (tipoUsuario !== "PACIENTE") {
        alert("Você nao possui acesso a essa pagina!")
        redirectTo('home-medico.html');
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