// elements
const painelDoctor = document.getElementsByClassName('dados-user')[0];

// tipo usuario
const tipoUsuario = localStorage.getItem('tipoUsuario');
const idUsuario = localStorage.getItem('idUsuario');

// url
const url = "http://localhost:8080/medico";

// Função para verificar a autorização do usuário
function checkAuthorization() {

    if (tipoUsuario !== "MEDICO") {
        redirectTo('error.html');
    }
}

checkAuthorization();

// get dados do medico
document.addEventListener('DOMContentLoaded', function () {

    axios.get(url)
        .then(response => {

            const dados = response.data.filter(medico => medico.usuario.id == idUsuario)[0];

       
            let str = '';
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
       <p>Código de registro:  <span>${dados.codigoDeRegistro}</span> </p>
       <p>Especialidade:  <span>${dados.especialidades.map((e) => e.nome).join(', ')}</span> </p>
       `
            painelDoctor.innerHTML = str;
        })
        .catch(error => {
            console.log(error);
        });
});

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

